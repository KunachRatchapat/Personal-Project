import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Swipeable } from "react-native-gesture-handler";
import CustomHeader from "./component/CustomHeader";
import ItemCard from "./component/ItemCard";
import TotalSummary from "./component/TotalSummary";

const STORAGE_KEY = "@shopping_data";

const ShoppingScreen = ({ navigation }) => {
  const [displayList, setDisplayList] = useState([]);
  const [shoppingList, setShoppingList] = useState([]);

  const fetchShoppingData = async () => {
    try {
      const storedData = await AsyncStorage.getItem(STORAGE_KEY);
      if (storedData) {
        setShoppingList(JSON.parse(storedData));
      }
    } catch (error) {
      console.error("Error loading data: ", error);
    }
  };

  useEffect(() => {
    fetchShoppingData();
  }, []);

  useEffect(() => {
    setDisplayList(shoppingList);
  }, [shoppingList]);

  const renderItem = ({ item }) => {
    const rightSwipeActions = () => (
      <View style={styles.swipeActionContainer}>
        <TouchableOpacity
          onPress={() => removeItem(item.id)}  
          style={styles.swipeButton}
        >
          <Icon name="trash-can" size={25} color="white" />
        </TouchableOpacity>
      </View>
    );

    const togglePurchaseStatus = async (id) => {
      const updatedList = shoppingList.map((entry) =>
        entry.id === id ? { ...entry, purchased: !entry.purchased } : entry
      );
      setShoppingList(updatedList);
      setDisplayList(updatedList);
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedList));
    };

    return (
      <Swipeable renderRightActions={rightSwipeActions}>
        <ItemCard
          name={item.name}
          price={item.price}
          image={item.image}
          onEdit={() => navigateToEditScreen(item)}  
          isPurchased={item.purchased}
          togglePurchase={() => togglePurchaseStatus(item.id)}
          category={item.category}
        />
      </Swipeable>
    );
  };

  const removeItem = (id) => {
    Alert.alert("Confirm Delete", "Do you want to remove this item?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "OK",
        onPress: async () => {
          const updatedList = shoppingList.filter(item => item.id !== id);
          setShoppingList(updatedList);
          setDisplayList(updatedList);
          await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedList));
        },
      },
    ]);
  };

  const clearAllItems = () => {
    Alert.alert("Confirm Clear All", "Do you want to remove all items?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "OK",
        onPress: async () => {
          setShoppingList([]);
          setDisplayList([]);
          await AsyncStorage.removeItem(STORAGE_KEY);
        },
      },
    ]);
  };

  const navigateToEditScreen = (item) => {
    navigation.navigate("EditItem", { 
      item: item, 
      refreshShoppingList: refreshShoppingList 
    });
  };

  const computeTotalCost = () => {
    return displayList
      .filter(item => !item.purchased) 
      .reduce((sum, item) => sum + parseFloat(item.price || 0), 0); 
  };

  const computeTotalItems = () => {
    return displayList.filter(item => !item.purchased).length;
  };

  return (
    <View style={styles.container}>
      <CustomHeader navigation={navigation} title="My Shopping" />

      <FlatList
        data={displayList}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={
          <View style={styles.headerControls}>
            <Text style={styles.itemCount}>Total Items: {computeTotalItems()}</Text>
          </View>
        }
      />

      {/* Clear All Button at Bottom Left */}
      <View style={styles.clearAllContainer}>
        <TouchableOpacity 
          onPress={clearAllItems} 
          style={styles.clearAllButton}
        >
          <Icon name="trash-can" size={30} color="#fff" />
          <Text style={styles.clearAllText}>Clear All</Text>
        </TouchableOpacity>
      </View>

      {/* Total Summary at Bottom Right */}
      <View style={styles.footer}>
        <TotalSummary totalAmount={computeTotalCost()} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',  // เปลี่ยนพื้นหลังให้ดูสะอาดตา
    paddingHorizontal: 15,
  },
  swipeActionContainer: {
    backgroundColor: '#d9534f',  // สีแดงอ่อนๆ ไม่ฉูดฉาดเกินไป
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    height: '100%',
  },
  swipeButton: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  headerControls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 20,
  },
  itemCount: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  clearAllContainer: {
    position: 'absolute',
    bottom: 30,
    left: 20,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#d9534f',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  clearAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  clearAllText: {
    color: '#fff',
    marginLeft: 5,
    fontSize: 16,
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    right: 20,
    backgroundColor: '#5bc0de',  // สีฟ้าอ่อนๆ สำหรับ footer
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 5,
  },
});

export default ShoppingScreen;
