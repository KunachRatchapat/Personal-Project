import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AddItemScreen from './src/screen/AddItemScreen';
import ShoppingScreen from './src/screen/ShoppingScreen';


const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Shopping">
        <Stack.Screen name="AddItem" component={AddItemScreen}/>
        <Stack.Screen name="Shopping" component={ShoppingScreen}/>      
      </Stack.Navigator>
    </NavigationContainer>


  );
};

export default App;