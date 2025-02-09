import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";  

const ProductCard = ({ title, cost, imageUrl, onEditPress, isSelected, toggleSelection, categoryType }) => {
  return (
    <View style={[styles.cardContainer, isSelected && styles.selectedCard]}>
      <TouchableOpacity onPress={toggleSelection}>
        <Icon 
          name={isSelected ? "checkbox-marked-outline" : "checkbox-blank-outline"} 
          size={24} 
          color={isSelected ? "#CD3333" : "#ccc"} 
        />
      </TouchableOpacity>

      <Image source={{ uri: imageUrl }} style={styles.productImage} />

      <View style={styles.infoContainer}>
        <Text style={[styles.productTitle, isSelected && styles.selectedText]}>
          {title}
        </Text>
        <Text style={[styles.categoryLabel, isSelected && styles.selectedText]}>
          {categoryType}
        </Text>
        <Text style={[styles.productCost, isSelected && styles.selectedText]}>
          {`฿${cost}`}
        </Text>
        <TouchableOpacity onPress={onEditPress} style={styles.editActionButton}>
          <Text style={styles.editActionText}>Edit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: "row",
    backgroundColor: "#F2F2F2",
    marginHorizontal: 30,
    borderRadius: 8,
    margin: 10,
    padding: 10,
    alignItems: "center",
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  selectedCard: {
    backgroundColor: "#D3D3D3", 
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 5,
    marginLeft: 10,  
  },
  infoContainer: {
    flex: 1,
    padding: 8,
  },
  productTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  categoryLabel: {
    fontSize: 14,
    color: "#888",
    marginVertical: 4,  
  },
  productCost: {
    fontSize: 16,
    marginVertical: 5,
  },
  selectedText: {
    textDecorationLine: "line-through", 
    color: "#A9A9A9", 
  },
  editActionButton: {
    position: "absolute",
    right: 10,
    bottom: 35,
  },
  editActionText: {
    fontSize: 14,
    fontWeight: "500",
  },
});


