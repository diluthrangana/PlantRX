import React, { useState, useEffect } from 'react';
import { View, Text, Button, Image, StyleSheet, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';

const App = () => {
  const [imageUri, setImageUri] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [label, setLabel] = useState('');

  useEffect(() => {
    (async () => {
      // Request permission to access the camera roll
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission to access camera roll is required!');
      }
    })();
  }, []);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  const getPrediction = async (params) => {
    return new Promise((resolve, reject) => {
      const bodyFormData = new FormData();
      bodyFormData.append('file', params);

      const url = 'http://127.0.0.1:8000/predict'; // Ensure this URL is correctly set in your .env file
      axios
        .post(url, bodyFormData)
        .then(response => {
          resolve(response.data);
        })
        .catch(error => {
          setLabel('Failed to predict.');
          reject('Error: ', error);
        });
    });
  };

  const predictDisease = async () => {
    if (!imageUri) {
      Alert.alert('Please select an image first.');
      return;
    }

    const fileData = {
      uri: imageUri,
      name: 'image.jpg',
      type: 'image/jpeg',
    };

    try {
      const data = await getPrediction(fileData);
      setPrediction({
        class: data.class,
        confidence: (data.confidence * 100).toFixed(2),
      });
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error predicting disease. Please try again.');
    }
  };

  // New function to test the GET /test endpoint
  const testGetMethod = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/ping');
      Alert.alert('Success', response.data.message);
    } catch (error) {
      console.error('Error testing GET method:', error);
      Alert.alert('Error testing GET method. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tomato Disease Prediction</Text>
      <Button title="Select Image" onPress={pickImage} />
      {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}
      <Button title="Predict Disease" onPress={predictDisease} />
      <Button title="Test GET Method" onPress={testGetMethod} />
      {label && <Text style={styles.error}>{label}</Text>}
      {prediction && (
        <View style={styles.result}>
          <Text>Predicted Class: {prediction.class}</Text>
          <Text>Confidence: {prediction.confidence}%</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    marginBottom: 20,
    fontSize: 24,
    fontFamily: 'System', // Using system font
  },
  image: {
    width: 200,
    height: 200,
    marginVertical: 20,
  },
  result: {
    marginTop: 20,
    fontSize: 18,
  },
  error: {
    color: 'red',
    marginTop: 10,
  },
});

export default App;
