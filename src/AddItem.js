import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert, StyleSheet } from "react-native";
<<<<<<< HEAD
import Icon from "react-native-vector-icons/Fontisto";  
=======
import Item from "./Component/Item";
>>>>>>> a93ebc2b4917e90aa27f17207e040aa7edfc83ca

const AddItem = ({ navigation }) => {
  const [name, setKuy] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [category,setCategory] = useState("");

  const handleSearch = () => {
    if (!name || !price || image) {
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
      <Text style={styles.header}>Add New Product</Text>
      
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

      <Button title="ADD Product" color="green" onPress={handleSearch} />
    </View>
  );
};

const styles = StyleSheet.create({  
  container: {  
    flex: 1,
    padding: 20,
    backgroundColor: "#D3D3D3",
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
});

export default AddItem;
