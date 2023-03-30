import {
  StyleSheet, Text, TouchableOpacity,
  View, StatusBar, SafeAreaView, TextInput
} from 'react-native';
import React, { useState, useEffect, useContext } from 'react';
import { Colors } from '../../constants/colors';
import { ROUTES } from '../../constants';
import { UserContext } from '../../api/authAPI/UserContext';
import Icon from 'react-native-vector-icons/Ionicons'

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
        <Text style={styles.text}>{'Rất vui khi bạn trở lại với chúng tôi !'}</Text>
      </View>
      <View style={styles.inputContainer}>
        <View style={styles.inputUserNameContainer}>
          <View style={{ marginLeft: 5 }}>
            <Icon
              name="star"
              size={20}
              color={Colors.TEXT_ERROR}
            />

          </View>
          <Text>+84</Text>
          <TextInput
            placeholder='Nhập số điện thoại'
            style={{ marginLeft: 10 }}
            keyboardType='number-pad'
          />
        </View>
        <View style={styles.inputPasswordContainer}>
          <TextInput
            placeholder='Nhập mật khẩu'
            style={{ marginLeft: 10 }}
            keyboardType='default'
          />
        </View>
      </View>
      <View style={styles.socialContainer}>
        <TouchableOpacity style={styles.social}>
          <Icon
            name='logo-facebook'
            size={25}
            color={Colors.BLUE}
          />
          <Text style={{ color: Colors.BLACK, fontSize: 15 }}>Facebook</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.social}>
          <Icon
            name='logo-google'
            size={25}
            color={Colors.TEXT_ERROR}
          />
          <Text style={{ color: Colors.BLACK, fontSize: 15 }}>Google</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={{ alignItems: 'center', justifyContent: 'center' }}
          onPress={() => { navigation.navigate(ROUTES.REGISTER) }}
        >
          <Text style={{ fontSize: 16, color: Colors.BLUE }}>Đăng ký tài khoản mới</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => { setIsLoggined(true) }}
          style={styles.loginButton}
        >
          <Text style={{ fontSize: 16, color: Colors.WHITE }}>Tiếp</Text>
        </TouchableOpacity>
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
    marginTop: 30
  },
  inputUserNameContainer: {
    width: '100%',
    borderWidth: 1,
    borderColor: Colors.BLACK,
    borderRadius: 20,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  inputPasswordContainer: {
    width: '100%',
    borderWidth: 1,
    borderColor: Colors.BLACK,
    borderRadius: 20,
    marginTop: 20
  },
  socialContainer: {
    marginTop: 30,
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between'
  },
  social: {
    width: '45%',
    borderWidth: 1,
    borderColor: Colors.BLACK,
    paddingVertical: 10,
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: 10,
    paddingHorizontal: 30
  },
  buttonContainer: {
    marginTop: 30
  },
  loginButton: {
    marginTop: 20,
    width: '100%',
    paddingVertical: 10,
    backgroundColor: Colors.BLUE,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
