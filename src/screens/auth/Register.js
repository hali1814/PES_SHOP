import {
  StyleSheet, Text, TouchableOpacity,
  View, StatusBar, SafeAreaView, TextInput
} from 'react-native';
import React, { useContext, useState } from 'react';
import HeaderComponent from '../../components/HeaderComponent';
import { Colors } from '../../constants/colors';
import { UserContext } from '../../api/authAPI/UserContext';
import Icon from 'react-native-vector-icons/Ionicons'
import { Notifier, NotifierComponents } from 'react-native-notifier';
import { ROUTES } from '../../constants';

const Register = ({ navigation }) => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [address, setAddress] = useState('')
  const [nameShop, setNameShop] = useState('')
  const { onRegister, registerMsg } = useContext(UserContext)

  const registerFailDialog = () => {
    Notifier.showNotification({
      title: 'Đăng ký thất bại',
      description: registerMsg,
      Component: NotifierComponents.Alert,
      componentProps: {
        alertType: 'error',
      },
    });
  }

  const registerSuccessDialog = () => {
    Notifier.showNotification({
      title: 'Đăng ký thành công',
      Component: NotifierComponents.Alert,
      componentProps: {
        alertType: 'success',
      },
    });
  }

  const register = async () => {
    try {
      const res = await onRegister(username, password, address, nameShop)
      console.log('Login resulttt >>> ', res)
      if (res == true) {
        registerSuccessDialog()
        navigation.navigate(ROUTES.LOGIN)
      } else {
        registerFailDialog()

      }
    } catch (error) {
      console.log('Login failed >>> ', error)
      throw error
    }

  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        backgroundColor={Colors.WHITE}
        barStyle='dark-content'
      />
      <HeaderComponent navigation={navigation} title={'Đăng ký'} />
      <View style={{ marginTop: 50 }}>
        <Text style={styles.title}>{'Đăng ký với số điện thoại'}</Text>
        <Text style={styles.text}>{'Chào mừng bạn đến với PES SHOP !'}</Text>
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
            value={username}
            onChangeText={text => { setUsername(text) }}
          />
        </View>
        <View style={styles.inputContentContainer}>
          <TextInput
            placeholder='Nhập mật khẩu'
            style={{ marginLeft: 10 }}
            keyboardType='default'
            secureTextEntry={true}
            value={password}
            onChangeText={text => { setPassword(text) }}
          />
        </View>
        <View style={styles.inputContentContainer}>
          <TextInput
            placeholder='Nhập địa chỉ'
            style={{ marginLeft: 10 }}
            keyboardType='default'
            value={address}
            onChangeText={text => { setAddress(text) }}
          />
        </View>
        <View style={styles.inputContentContainer}>
          <TextInput
            placeholder='Nhập tên cho shop'
            style={{ marginLeft: 10 }}
            keyboardType='default'
            value={nameShop}
            onChangeText={text => { setNameShop(text) }}
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
          onPress={register}
          style={styles.loginButton}
        >
          <Text style={{ fontSize: 16, color: Colors.WHITE }}>Tiếp</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Register;

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
  inputContentContainer: {
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
