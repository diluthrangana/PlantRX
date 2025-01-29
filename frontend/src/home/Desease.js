import React, { useState } from "react";

const Disease = () => {
  const [selectedPlant, setSelectedPlant] = useState("");
  const [image, setImage] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [dragging, setDragging] = useState(false);

  // Handle plant selection
  const handlePlantChange = (event) => {
    setSelectedPlant(event.target.value);
    setResult(null);
    setImage(null);
  };

  // Handle file input change
  const handleFileChange = (event) => {
    setImage(event.target.files[0]);
  };

  // Handle drag-and-drop events
  const handleDragOver = (event) => {
    event.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => {
    setDragging(false);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setDragging(false);
    if (event.dataTransfer.files && event.dataTransfer.files.length > 0) {
      setImage(event.dataTransfer.files[0]);
    }
  };

  // Predict disease function
  const predictDisease = async () => {
    if (!selectedPlant) {
      alert("Please select a plant first.");
      return;
    }

    if (!image) {
      alert("Please select an image first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", image);

    setLoading(true);
    setResult(null);

    const endpoint = `http://127.0.0.1:8080/predict/${selectedPlant}`;

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setResult({
        class: data.class,
        confidence: (data.confidence * 100).toFixed(2),
      });
    } catch (error) {
      console.error("Error:", error);
      setResult({ error: "Error predicting disease. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ width: "60%", marginLeft: "10%", marginTop: "5%", fontFamily: "Roboto, sans-serif" }}>
      <h1 style={{ marginBottom: "20px", color: "#333", fontWeight: 700 }}>Plant Disease Prediction</h1>

      <select
        value={selectedPlant}
        onChange={handlePlantChange}
        style={{
          marginBottom: "20px",
          padding: "10px",
          width: "100%",
          borderRadius: "5px",
          border: "1px solid #ccc",
          fontSize: "16px",
        }}
      >
        <option value="">Select a plant</option>
        <option value="tomato">Tomato</option>
        <option value="potato">Potato</option>
      </select>

      {selectedPlant && (
        <>
          <div
            style={{
              border: dragging ? "2px dashed #5c6bc0" : "2px dashed #ccc",
              borderRadius: "10px",
              padding: "20px",
              textAlign: "center",
              backgroundColor: dragging ? "#e8eaf6" : "#f9f9f9",
              marginBottom: "20px",
            }}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            {image ? (
              <p>Selected file: {image.name}</p>
            ) : (
              <p>Drag and drop an image here, or click below to upload</p>
            )}
          </div>

          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            style={{ marginBottom: "20px", padding: "10px", width: "100%" }}
          />
          <button
            onClick={predictDisease}
            disabled={loading}
            style={{
              margin: "5px 0",
              padding: "10px 20px",
              fontSize: "16px",
              color: "#fff",
              backgroundColor: "#5c6bc0",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            {loading ? "Predicting..." : "Predict Disease"}
          </button>
        </>
      )}

      {result && (
        <div style={{ marginTop: "20px", fontSize: "18px", color: "#333", textAlign: "left" }}>
          {result.error ? (
            <p style={{ color: "red" }}>{result.error}</p>
          ) : (
            <>
              <p>
                Predicted Class: <strong>{result.class}</strong>
              </p>
              <p>
                Confidence: <strong>{result.confidence}%</strong>
              </p>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Disease;
