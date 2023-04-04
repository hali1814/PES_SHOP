import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Login, Register, Loading, OTPScreen } from '../screens';
import { ROUTES } from '../constants';
import { Colors } from '../constants/colors';
import BottomTabNavigator from './BottomTabNavigator';

const Stack = createStackNavigator();
// Naivigator, Screen, Group

function AuthNavigator() {
  console.log('AuthNavigator', Stack);


  return (
    <Stack.Navigator
      screenOptions={({ route }) => ({
        headerTintColor: Colors.WHITE,
        headerBackTitleVisible: false,
        headerStyle: {
          backgroundColor: Colors.MAIN,
        },
        headerShown: false
      })}
      initialRouteName={ROUTES.LOADING}>
      <Stack.Screen name={ROUTES.LOADING} component={Loading} />
      <Stack.Screen name={ROUTES.REGISTER} component={Register} />
      <Stack.Screen name={ROUTES.LOGIN} component={Login} />
      <Stack.Screen name={ROUTES.OTP} component={OTPScreen} />
      {/* <Stack.Screen
        options={{ headerShown: false }}
        name={ROUTES.HOME}
        component={BottomTabNavigator}
      /> */}
      {/* <Stack.Screen name={ROUTES.LOADING} component={Loading} /> */}
    </Stack.Navigator>
  );
}

export default AuthNavigator;
