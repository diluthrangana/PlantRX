import React, { useState } from 'react';
import {
  SafeAreaView,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  Dimensions,
  View,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

export const { height, width } = Dimensions.get('window');

const options = {
  mediaType: 'photo',
  quality: 1,
  includeBase64: true,
};

const App = () => {
  const [result, setResult] = useState('');
  const [label, setLabel] = useState('');
  const [image, setImage] = useState('');

  const getPrediction = async (params) => {
    let bodyFormData = new FormData();
    bodyFormData.append('file', params);
    try {
      const response = await axios.post('http://127.0.0.1:8000/predict', bodyFormData);
      return response;
    } catch (error) {
      console.log('Prediction error:', error);
      setLabel('Prediction failed.');
    }
  };

  const handleImagePickerResponse = async (response) => {
    if (response?.assets?.length > 0) {
      const file = response.assets[0];
      const path = file.uri;
      setImage(path);
      setLabel('Predicting...');
      const params = { uri: path, name: file.fileName, type: file.type };
      const res = await getPrediction(params);
      if (res?.data?.class) {
        setLabel(res.data.class);
        setResult(res.data.confidence);
      } else {
        setLabel('Failed to predict');
      }
    }
  };

  const openCamera = () => {
    launchCamera(options, handleImagePickerResponse);
  };

  const openLibrary = () => {
    launchImageLibrary(options, handleImagePickerResponse);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      {image ? (
        <Image source={{ uri: image }} style={styles.image} />
      ) : (
        <Text style={styles.instructions}>
          Select a potato plant leaf image to predict the disease.
        </Text>
      )}
      {label && (
        <View style={styles.resultContainer}>
          <Text style={styles.label}>Label: {label}</Text>
          <Text style={styles.confidence}>Confidence: {parseFloat(result).toFixed(2)}%</Text>
        </View>
      )}
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={openCamera} style={styles.button}>
          <Text style={styles.buttonText}>Open Camera</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={openLibrary} style={styles.button}>
          <Text style={styles.buttonText}>Open Gallery</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  instructions: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
  },
  image: {
    width: width * 0.1,
    height: width * 0.1,
    marginBottom: 20,
    borderRadius: 10,
  },
  resultContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  label: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  confidence: {
    fontSize: 18,
    marginTop: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  button: {
    marginHorizontal: 10,
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 10,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
  },
});

export default App;
