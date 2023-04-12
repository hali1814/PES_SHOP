import * as React from 'react';
import { SafeAreaView, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AuthNavigator from './src/navigations/AuthNavigator';
import { UserContextProvider } from './src/api/authAPI/UserContext';
import { ProductContextProvider } from './src/api/productAPI/productContext';
import Appnavigator from './src/navigations/AppNavigation';
import { NotifierWrapper } from 'react-native-notifier';

export default function App() {
  return (
    <NotifierWrapper>
      <UserContextProvider>
        <ProductContextProvider>
          <Appnavigator />
        </ProductContextProvider>
      </UserContextProvider>
    </NotifierWrapper>

  );
}
