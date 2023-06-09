import * as React from 'react';
import { SafeAreaView, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AuthNavigator from './src/navigations/AuthNavigator';
import { UserContextProvider } from './src/api/authAPI/UserContext';
import Appnavigator from './src/navigations/AppNavigation';
import { NotifierWrapper } from 'react-native-notifier';

export default function App() {
  return (
    <NotifierWrapper>
      <UserContextProvider>
        <Appnavigator />
      </UserContextProvider>
    </NotifierWrapper>

  );
}
