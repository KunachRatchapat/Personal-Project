import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const EditItemScreen = ({ route, navigation }) => {
  // ตรวจสอบว่ามี route.params และ route.params.item หรือไม่
  const item = route?.params?.item || {
    name: '',
    price: '',
    image: '',
    category: ''
  };

  const [name, setName] = useState(item.name);
  const [price, setPrice] = useState(item.price?.toString() || '');
  const [image, setImage] = useState(item.image);
  const [category, setCategory] = useState(item.category);

  // ตรวจสอบว่ามี item หรือไม่ตอน component mount
  useEffect(() => {
    if (!route?.params?.item) {
      Alert.alert(
        "Error",
        "No item data provided",
        [
          { text: "OK", onPress: () => navigation.goBack() }
        ]
      );
    }
  }, []);

  const isValidUrl = (url) => {
    const regex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
    return regex.test(url);
  };

  const handleSave = async () => {
    if (!name || !price || !image || !category) {
      Alert.alert("Error", "Please fill in all the fields");
      return;
    }

    if (isNaN(price) || parseFloat(price) < 0) {
      Alert.alert("Error", "Price cannot be negative");
      return;
    }

    if (!isValidUrl(image)) {
      Alert.alert("Error", "Please enter a valid image URL");
      return;
    }

    const updatedItem = {
      ...item,
      name,
      price: parseFloat(price),
      image,
      category,
    };

    try {
      const storageCards = await AsyncStorage.getItem("@card_data");
      const cards = storageCards ? JSON.parse(storageCards) : [];

      const index = cards.findIndex((card) => card.id === item.id);
      if (index !== -1) {
        cards[index] = updatedItem;
        await AsyncStorage.setItem("@card_data", JSON.stringify(cards));
      }

      // ตรวจสอบว่ามี refreshCards function หรือไม่
      if (route.params?.refreshCards) {
        route.params.refreshCards();
      }
      
      navigation.goBack();
    } catch (error) {
      console.error("Failed to save updated card:", error);
      Alert.alert("Error", "Failed to save changes. Please try again.");
    }
  };

  const handleCancel = () => {
    navigation.goBack();
  };

  const handleReset = () => {
    setName("");
    setPrice("");
    setImage("");
    setCategory("");
  };

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Item name"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={styles.input}
          placeholder="Item price"
          value={price}
          onChangeText={setPrice}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="Item image URL"
          value={image}
          onChangeText={setImage}
        />
        <TextInput
          style={styles.input}
          placeholder="Category"
          value={category}
          onChangeText={setCategory}
        />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleSave}>
          <Text style={styles.buttonText}>Save Changes</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.resetButton} onPress={handleReset}>
          <Text style={styles.buttonText}>Reset</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F7F7",
  },
  form: {
    flex: 1,
    marginTop: 20,
    paddingHorizontal: 20,
  },
  input: {
    backgroundColor: "#FFF",
    borderRadius: 10,
    marginBottom: 15,
    padding: 13,
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginBottom: 50,
  },
  button: {
    backgroundColor: "#4CAF50",
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
    width: "30%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  cancelButton: {
    backgroundColor: "#F44336",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    width: "30%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  resetButton: {
    backgroundColor: "#FF9800",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    width: "30%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "500",
    color: "white",
  },
});

export default EditItemScreen;