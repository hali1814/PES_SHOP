import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import React from 'react';
import HeaderComponent from '../../components/HeaderComponent';
import { Colors } from '../../constants/colors';

const Register = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <HeaderComponent title={'Đăng ký'} navigation={navigation} />
    </SafeAreaView>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 20,
    backgroundColor: Colors.WHITE,
    paddingHorizontal: 20
  },
});
