import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {AddProducts, Home, Loading, Notifications} from '../screens';
import {ROUTES} from '../constants';
import Icon from 'react-native-vector-icons/Ionicons';
import {Colors} from '../constants/colors';
import {createStackNavigator} from '@react-navigation/stack';
import AppLoading from '../screens/Loading/AppLoading';

const Tab = createBottomTabNavigator();

const appStack = createStackNavigator();

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
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: Colors.MAIN,
        tabBarIcon: ({color, focused}) => {
          let iconName;
          if (route.name === ROUTES.HOME_TAB) {
            iconName = focused ? 'ios-home' : 'ios-home-outline';
          } else if (route.name === ROUTES.NOTIFICATIONS) {
            iconName = focused
              ? 'ios-notifications'
              : 'ios-notifications-outline';
          }
          return <Icon name={iconName} size={22} color={color} />;
        },
      })}>
      <Tab.Screen
        options={{tabBarLabel: 'Home'}}
        name={ROUTES.HOME_TAB}
        component={Home}
      />
      <Tab.Screen name={ROUTES.NOTIFICATIONS} component={AddProducts} />
    </Tab.Navigator>
  );
}

export default AppStackScreen;
