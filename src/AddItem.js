import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons"; 


const AddItem = ({ navigation }) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");

  const handleSearch = () => {
    if (!name || !price) {
      Alert.alert("กรุณากรอกข้อมูลให้ครบ");
    } else {
      const newItem = {
        id: Date.now().toString(),
        name,
        price,
        image,
      };

      console.log(newItem);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>🛍️ New Product !!</Text>

      <TextInput
        style={styles.input}
        placeholder="Product Name"
        value={name}
        onChangeText={setName}
      />

      <TextInput
        style={styles.input}
        placeholder="Product Price"
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
      />

      <TextInput
        style={styles.input}
        placeholder="Category"
        value={category}
        onChangeText={setCategory}
      />

      <TextInput
        style={styles.input}
        placeholder="Product Image URL"
        value={image}
        onChangeText={setImage}
      />

      <TouchableOpacity style={styles.button} onPress={handleSearch}>
        <Icon name="add-shopping-cart" size={20} color="#fff" />
        <Text style={styles.buttonText}>ADD Product</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#E0FFFF",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
    marginBottom: 10,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "green",
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    marginLeft: 5,
  },
});

export default AddItem;
