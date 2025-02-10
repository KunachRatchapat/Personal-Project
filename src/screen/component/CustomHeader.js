import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const CustomHeader = ({ navigation, title }) => {
  const [currentScreen, setCurrentScreen] = useState("");

  useEffect(() => {
    const unsubscribe = navigation.addListener('state', () => {
      const currentRoute = navigation.getState().routes[navigation.getState().index].name;
      setCurrentScreen(currentRoute);
    });

    return unsubscribe;
  }, [navigation]);

  const handleBackPress = () => {
    if (currentScreen === "AddItem") {
      navigation.navigate("AddItem");  // ให้ย้อนกลับไปหน้า AddItem
    }
  };

  return (
    <View style={styles.Header}>
      <TouchableOpacity style={styles.IconContainer} onPress={handleBackPress}>
        <Icon name="arrow-left" size={24} color="black" />
      </TouchableOpacity>
      <Text style={styles.HeaderText}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  Header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#00FA9A",
    paddingVertical: 20,
    paddingHorizontal: 20,
    position: 'relative',  
  },
  HeaderText: {
    flex: 1,
    textAlign: "center",
    fontSize: 20,
    fontWeight: "500",
    marginTop: 45,
    color: 'black'
  },
  IconContainer: {
    marginTop: 45,
  },
});

export default CustomHeader;
