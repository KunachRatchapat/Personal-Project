import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AddItem from "./src/AddItem";


const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="AddItem">
        <Stack.Screen name="AddItem" component={AddItem}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
