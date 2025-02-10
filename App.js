import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AddItem from "./src/AddItem";
import EditItemScreen from "./src/EditItemScreen";
import ShoppingScreen from "./src/ShoppingScreen";


const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Shopping">
        <Stack.Screen name="AddItem" component={AddItem}/>
        <Stack.Screen name = "EditItem" component={EditItemScreen}/>
        <Stack.Screen name="Shopping" component={ShoppingScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
