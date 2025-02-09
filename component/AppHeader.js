import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const AppHeader = ({ navigation, screenTitle }) => {
  const currentScreen = navigation.getState().routes[navigation.getState().index].name;

  const handleBackPress = () => {
    if (currentScreen === "ProductList") {
      navigation.navigate("Home");
    } else if (currentScreen === "AddProduct") {
      navigation.navigate("ProductList");
    } else if (currentScreen === "EditProduct") {
      navigation.navigate("ProductList");
    }
  };

  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity style={styles.iconWrapper} onPress={handleBackPress}>
        <Icon name="arrow-left" size={24} color="black" />
      </TouchableOpacity>

      <Text style={styles.headerText}>{screenTitle}</Text>

      <TouchableOpacity style={styles.iconWrapper}>
        <Icon name="theme-light-dark" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#FF9800",
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  headerText: {
    fontSize: 22,
    fontWeight: "600",
    color: "#333",
    marginTop: 45,
  },
  iconWrapper: {
    marginTop: 45,
  },
});

export default AppHeader;
