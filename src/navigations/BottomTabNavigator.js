import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home, Loading, Notifications, AddProduct } from '../screens';
import { ROUTES } from '../constants';
import Icon from 'react-native-vector-icons/Ionicons';
import { Colors } from '../constants/colors';
import { createStackNavigator } from '@react-navigation/stack';
import AppLoading from '../screens/Loading/AppLoading';

const Tab = createBottomTabNavigator();

const appStack = createStackNavigator()

const AppStackScreen = () => {
  return (
    <appStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors.WHITE,
        },
        headerTintColor: Colors.BACKGROUND_ITEM,
        headerShown: false,
      }}>
      <appStack.Screen name="AppLoading" component={AppLoading} />
      <appStack.Screen name="MyTab" component={BottomTabNavigator} />
    </appStack.Navigator>
  );
};

function BottomTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: Colors.MAIN,
        tabBarIcon: ({ color, focused }) => {
          let iconName;
          if (route.name === ROUTES.HOME_TAB) {
            iconName = focused ? 'ios-home' : 'ios-home-outline';
          } else if (route.name === ROUTES.NOTIFICATIONS) {
            iconName = focused
              ? 'ios-notifications'
              : 'ios-notifications-outline';
          }
          else if (route.name === ROUTES.ADD_PRODUCT) {
            iconName = focused
              ? 'add-circle'
              : 'add-circle-outline';
          }
          return <Icon name={iconName} size={25} color={color} />;
        },
        tabBarStyle: { height: 50 }
      })}>
      <Tab.Screen
        options={{ tabBarLabel: 'Trang chủ' }}
        name={ROUTES.HOME_TAB}
        component={Home}
      />
      <Tab.Screen
        options={{ tabBarLabel: 'Thêm' }}
        name={ROUTES.ADD_PRODUCT}
        component={AddProduct}
      />
      <Tab.Screen
        options={{ tabBarLabel: 'Thông báo' }}
        name={ROUTES.NOTIFICATIONS}
        component={Notifications}
      />
    </Tab.Navigator>
  );
}

export default AppStackScreen;
