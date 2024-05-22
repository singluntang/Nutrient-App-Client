/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import Login from './components/Login';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CreateUser from './components/CreateUser'
import Dashboard from './components/Dashboard'
import CreateIngredient from './components/CreateIngredient'
import ListIngredients from './components/ListIngredients'
import CreateMenu from './components/CreateMenu'
import ListMenus from './components/ListMenus'


const Stack = createNativeStackNavigator();

function App() {

  return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="CreateUser" component={CreateUser} />
          <Stack.Screen name="Dashboard" component={Dashboard} />
          <Stack.Screen name="CreateIngredient" component={CreateIngredient} />
          <Stack.Screen name="ListIngredients" component={ListIngredients} />
          <Stack.Screen name="CreateMenu" component={CreateMenu} />
          <Stack.Screen name="ListMenus" component={ListMenus} />
        </Stack.Navigator>
      </NavigationContainer>
  );
}


export default App;
