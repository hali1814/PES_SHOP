import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Home, Notifications} from '../screens';
import {ROUTES} from '../constants';
import Icon from 'react-native-vector-icons/Ionicons';
import {Colors} from '../constants/colors';

const Tab = createBottomTabNavigator();

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
      <Tab.Screen name={ROUTES.NOTIFICATIONS} component={Notifications} />
    </Tab.Navigator>
  );
}

export default BottomTabNavigator;
