from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import numpy as np
from io import BytesIO
from PIL import Image
import tensorflow as tf
import os

app = FastAPI()



app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Model path
MODEL_PATH = os.path.abspath("../DL/tomato_disease_model")
MODEL = None

# Try to load the model
try:
    if os.path.exists(MODEL_PATH):
        MODEL = tf.keras.models.load_model(MODEL_PATH)
        print("Model loaded successfully from:", MODEL_PATH)
    else:
        raise OSError(f"Model not found at {MODEL_PATH}")
except OSError as e:
    print(f"Error loading model: {e}")
    MODEL = None

# Define class names for predictions
CLASS_NAMES = [
    'Tomato_Bacterial_spot', 'Tomato_Early_blight', 'Tomato_Late_blight', 'Tomato_Leaf_Mold', 
    'Tomato_Septoria_leaf_spot', 'Tomato_Spider_mites_Two_spotted_spider_mite', 
    'Tomato__Target_Spot', 'Tomato__Tomato_YellowLeaf__Curl_Virus', 
    'Tomato__Tomato_mosaic_virus', 'Tomato_healthy'
]

@app.get("/ping")
async def ping():
    return {"message": "Hello, I am alive"}

@app.get("/test")
async def test():
    """A simple GET method to test server functionality."""
    return {"status": "Success", "message": "GET request was successful"}

def read_file_as_image(data) -> np.ndarray:
    """Converts uploaded file data to a numpy array and preprocesses it."""
    image = Image.open(BytesIO(data))
    image = image.resize((128, 128))  # Resize to the input size expected by the model (128x128)
    image = np.array(image) / 255.0  # Normalize image if the model expects it
    if image.shape[-1] == 4:  # If image has an alpha channel, remove it
        image = image[..., :3]
    return image

@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    # Check if the model was loaded correctly
    if MODEL is None:
        raise HTTPException(status_code=500, detail="Model not loaded. Please check if the model exists.")
    
    # Log the file details to verify it's being received correctly
    print(f"Received file: {file.filename}, Content-Type: {file.content_type}")
    
    # Read the uploaded image file and preprocess it
    try:
        image = read_file_as_image(await file.read())
        img_batch = np.expand_dims(image, 0)  # Add batch dimension
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Error processing image: {e}")
    
    # Make predictions
    try:
        predictions = MODEL.predict(img_batch)
        predicted_class = CLASS_NAMES[np.argmax(predictions[0])]
        confidence = np.max(predictions[0])
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error making prediction: {e}")
    
    return {
        'class': predicted_class,
        'confidence': float(confidence)
    }

if __name__ == "__main__":
    uvicorn.run(app, host='localhost', port=8000)
