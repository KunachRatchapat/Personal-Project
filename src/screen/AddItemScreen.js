import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, ScrollView 
} from "react-native";
import CustomHeader from "./component/CustomHeader";
import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "@card_data";

const AddItemScreen = ({ navigation, route }) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const [errors, setErrors] = useState({});

  const categories = [
    { id: 'food', title: 'Food' },
    { id: 'sport', title: 'Sport' },
    { id: 'car', title: 'Car' }
  ];

  const validateFields = () => {
    const newErrors = {};
    if (!name.trim()) newErrors.name = " Enter item name";
    if (!price.trim()) newErrors.price = "Enter price";
    else if (isNaN(price) || parseFloat(price) < 0) newErrors.price = "Please enter valid price";
    if (!category) newErrors.category = "Please select category";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const addCard = async () => {
    if (validateFields()) {
      const newCard = {
        id: Date.now().toString(),
        name,
        price,
        category,
        image: image.trim() ? image : `https://source.unsplash.com/400x300/?${category}`
      };
      try {
        const storedCards = await AsyncStorage.getItem(STORAGE_KEY);
        const existingCards = storedCards ? JSON.parse(storedCards) : [];
        const updatedCards = [newCard, ...existingCards];
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedCards));
        if (route.params?.refreshCards) {
          await route.params.refreshCards();
        }
        navigation.goBack();
      } catch (error) {
        Alert.alert("Error", "Can New Type");
      }
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <CustomHeader navigation={navigation} title="New Product" />
        <KeyboardAvoidingView 
          behavior={Platform.OS === "ios" ? "padding" : "height"} 
          style={styles.keyboardAvoid}
        >
          <ScrollView style={styles.scrollView}>
            <View style={styles.cardContainer}>
              {/* Item Name Input */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>ชื่อสินค้า</Text>
                <TextInput 
                  style={styles.input} 
                  placeholder="Enter item name" 
                  value={name} 
                  onChangeText={setName} 
                  placeholderTextColor="#999" 
                />
                {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}
              </View>

              {/* Price Input */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>ราคา</Text>
                <TextInput 
                  style={styles.input} 
                  placeholder="Enter price" 
                  value={price} 
                  onChangeText={setPrice} 
                  keyboardType="numeric" 
                  placeholderTextColor="#999" 
                />
                {errors.price && <Text style={styles.errorText}>{errors.price}</Text>}
              </View>

              {/* Categories */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>หมวดหมู่</Text>
                <View style={styles.categoriesContainer}>
                  {categories.map((cat) => (
                    <TouchableOpacity 
                      key={cat.id} 
                      style={[styles.categoryButton, category === cat.id && styles.categoryButtonSelected]} 
                      onPress={() => setCategory(cat.id)}
                    >
                      <Text style={[styles.categoryText, category === cat.id && styles.categoryTextSelected]}>
                        {cat.title}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
                {errors.category && <Text style={styles.errorText}>{errors.category}</Text>}
              </View>

              {/* Image Input */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Image URL (ถ้ามีไม่บังคับ!)</Text>
                <TextInput 
                  style={styles.input} 
                  placeholder="Enter image URL (optional)" 
                  value={image} 
                  onChangeText={setImage} 
                  placeholderTextColor="#999" 
                />
              </View>
            </View>
          </ScrollView>

          {/* Action Buttons */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.addButton} onPress={addCard}>
              <Text style={styles.addButtonText}>Add Item</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  keyboardAvoid: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  cardContainer: {
    marginTop: 20,
    marginBottom: 40,
    padding: 20,
    backgroundColor: "#F8F8F8", // Card color
    borderRadius: 10,
    elevation: 3, // Shadow effect
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 10,
    color: "#333",
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderBottomWidth: 1,
    paddingHorizontal: 10,
    fontSize: 16,
    color: "#333",
  },
  errorText: {
    color: "red",
    marginTop: 5,
  },
  categoriesContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  categoryButton: {
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginRight: 10,
  },
  categoryButtonSelected: {
    backgroundColor: "#00FA9A",
  },
  categoryText: {
    fontSize: 14,
    color: "#666",
  },
  categoryTextSelected: {
    color: "#fff",
  },
  buttonContainer: {
    padding: 20,
  },
  addButton: {
    backgroundColor: "#00FA9A",
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  addButtonText: {
    fontSize: 18,
    color: "#fff",
  },
});

export default AddItemScreen;
