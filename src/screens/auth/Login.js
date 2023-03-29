import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {Colors} from '../../constants/colors';
import {ROUTES} from '../../constants';

const Login = props => {
  const {navigation} = props;

  return (
    <View style={{alignItems: 'center', flex: 1, justifyContent: 'center'}}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate(ROUTES.HOME);
        }}
        style={{
          height: 44,
          width: 120,
          backgroundColor: Colors.MAIN,
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 4,
        }}>
        <Text>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate(ROUTES.REGISTER);
        }}
        style={{
          marginTop: 12,
          height: 44,
          width: 120,
          backgroundColor: Colors.MAIN,
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 4,
        }}>
        <Text>{'Register'}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({});
