import {Text, View } from 'react-native'
import React from 'react'
import Home from './src/Home.jsx'
import DisplayReference from './src/DisplayReference.jsx'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'

const Stack = createNativeStackNavigator();
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
        <Stack.Screen
          name="DisplayReference" component={DisplayReference} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
export default App