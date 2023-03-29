import {
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import React from 'react';
import {Colors} from '../../constants/colors';
import {images} from '../../assets';

const Home = () => {
  return (
    <View style={{flex: 1}}>
      <ImageBackground source={images.img_Background} style={{height: 278}} />
      <View
        style={{
          paddingHorizontal: 12,
          position: 'absolute',
          width: '100%',
          alignContent: 'flex-end',
        }}>
        <View
          style={{
            height: 156,
            backgroundColor: Colors.WHITE,
            paddingHorizontal: 12,
            borderRadius: 4,
          }}></View>
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({});
