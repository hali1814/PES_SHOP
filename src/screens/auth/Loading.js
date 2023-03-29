import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {icons} from '../../assets';
import {Colors} from '../../constants/colors';

const Loading = () => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.WHITE,
      }}>
      <Image source={icons.icon_LOGO} style={{width: 120, height: 120}} />
      <Text style={{color: Colors.MAIN}}>{'Play To Earn'}</Text>
    </View>
  );
};

export default Loading;

const styles = StyleSheet.create({});
