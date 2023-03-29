import {
  StyleSheet, Text, TouchableOpacity,
  View, StatusBar, SafeAreaView, TextInput
} from 'react-native';
import React, { useState, useEffect, useContext } from 'react';
import { Colors } from '../../constants/colors';
import { ROUTES } from '../../constants';
import { UserContext } from '../../api/authAPI/UserContext';

const Login = props => {
  const { navigation } = props;
  const { onLogin, isLoggined, setIsLoggined } = useContext(UserContext)

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        backgroundColor={Colors.WHITE}
        barStyle='dark-content'
      />
      <View style={styles.header}>
        <Text style={styles.title}>{'Đăng nhập'}</Text>
      </View>
      <View style={{ marginTop: 50 }}>
        <Text style={styles.title}>{'Nhập số điện thoại'}</Text>
        <Text style={styles.text}>{'Rất vui khi bạn trở lại với chúng tôi'}</Text>
      </View>
      <View style={styles.inputContainer}>
        <View style={styles.inputUserNameContainer}>
          <TextInput />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
    paddingHorizontal: 20
  },
  header: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20
  },
  title: {
    color: Colors.BLACK,
    fontSize: 18,
    fontWeight: '600'
  },
  text: {
    color: Colors.TEXT_SECOND,
    marginTop: 5
  },
  inputContainer: {
    marginTop: 10
  },
  inputUserNameContainer: {

  },
});
