import React, { useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home, Detail, AddProduct, Awaiting, Canceled, AddStock } from '../screens';
import { ROUTES } from '../constants';
import Icon from 'react-native-vector-icons/Ionicons';
import { Colors } from '../constants/colors';
import { createStackNavigator } from '@react-navigation/stack';
import AppLoading from '../screens/Loading/AppLoading';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import AwaitingPickup from '../screens/order-status/AwaitingPickup';
import Shipping from '../screens/order-status/Shipping';
import Delivered from '../screens/order-status/Delivered';

const Tab = createBottomTabNavigator();

const topTab = createMaterialTopTabNavigator()

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
      <appStack.Screen name={ROUTES.LOADING} component={AppLoading} />
      <appStack.Screen name={ROUTES.HOME} component={BottomTabNavigator} />
      <appStack.Screen name={ROUTES.DETAILS} component={Detail} />
      <appStack.Screen name={ROUTES.ADD_STOCK} component={AddStock} />
    </appStack.Navigator>
  );
};

const OrderTab = () => {
  return (
    <topTab.Navigator
      screenOptions={{
        tabBarLabelStyle: { fontSize: 12 },
        tabBarStyle: { backgroundColor: Colors.WHITE },
        tabBarPressColor: Colors.MAIN,
        tabBarActiveTintColor: Colors.MAIN
      }}
    >
      <topTab.Screen
        name={ROUTES.AWAITING}
        component={Awaiting}
        options={{ title: 'Chờ xác nhận' }}
      />
      <topTab.Screen
        name={ROUTES.AWAITINGPICKUUP}
        component={AwaitingPickup}
        options={{ title: 'Chờ lấy hàng' }}
      />
      <topTab.Screen
        name={ROUTES.SHIPPING}
        component={Shipping}
        options={{ title: 'Đang giao' }}
      />
      <topTab.Screen
        name={ROUTES.DELIVERED}
        component={Delivered}
        options={{ title: 'Đã giao' }}
      />
      <topTab.Screen
        name={ROUTES.CANCELED}
        component={Canceled}
        options={{ title: 'Đã hủy' }}
      />
    </topTab.Navigator>
  )
}

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
          } else if (route.name === ROUTES.ORDER_TAB) {
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
        options={{
          tabBarLabel: 'Thông báo',
          headerShown: true,
          title: 'Xác nhận đơn hàng',
          headerTitleAlign: 'center',
          headerTitleStyle: { color: Colors.WHITE },
          headerStyle: { backgroundColor: Colors.MAIN }
        }}
        name={ROUTES.ORDER_TAB}
        component={OrderTab}
      />
    </Tab.Navigator>
  );
}

export default AppStackScreen;
