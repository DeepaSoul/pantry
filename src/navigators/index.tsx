import {View, Text} from 'react-native';
import React, {useContext} from 'react';
import AuthContext from '../authContext';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import TabNavigator from './TabNavigator';
import DetailsScreen from '../screens/DetailsScreen';
import LoginScreen from '../screens/Login';
import PaymentScreen from '../screens/PaymentScreen';
import RegisterScreen from '../screens/Register';

const Stack = createNativeStackNavigator();

const NavigationStacks = () => {
  const {exploreApp, user} = useContext(AuthContext);

  return (
    <NavigationContainer>
      {user || exploreApp ? (
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen
            name="Tab"
            component={TabNavigator}
            options={{animation: 'slide_from_bottom'}}
          />
          <Stack.Screen
            name="Details"
            component={DetailsScreen}
            options={{animation: 'slide_from_bottom'}}
          />
          <Stack.Screen
            name="Payment"
            component={PaymentScreen}
            options={{animation: 'slide_from_bottom'}}
          />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{animation: 'slide_from_bottom'}}
          />
          <Stack.Screen
            name="Register"
            component={RegisterScreen}
            options={{animation: 'slide_from_bottom'}}
          />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};

export default NavigationStacks;
