import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native';
import React from 'react';
import {Colors} from '../../constants/colors';
import {icons} from '../../assets';

const AddProducts = () => {
  return (
    <SafeAreaView style={{flex: 1, paddingHorizontal: 12}}>
      <View style={{alignItems: 'center', justifyContent: 'center'}}>
        <Text>Add Products</Text>
      </View>
      {/* Images,Name */}
      <View style={styles.ContainerImageName}>
        <Text style={styles.TextTitle}>Hình ảnh</Text>
        <TouchableOpacity style={styles.CustomADDImage}>
          <Image source={icons.icon_ADDImage} style={{width: 20, height: 20}} />
          <Text style={{fontSize: 12, color: Colors.TEXT_SECOND, marginTop: 2}}>
            {'4/'}8
          </Text>
        </TouchableOpacity>
        <View style={{marginTop: 12}}>
          <Text style={styles.TextTitle}>{'Tên sảm phẩm'}</Text>
          <TextInput placeholder="VD: Giày Nike, Giày Adidas,..."></TextInput>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default AddProducts;

const styles = StyleSheet.create({
  TextTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.BLACK,
  },
  CustomADDImage: {
    marginTop: 12,
    width: 54,
    height: 54,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderRadius: 4,
    borderColor: Colors.MAIN,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ContainerImageName: {
    marginTop: 12,
    backgroundColor: Colors.WHITE,
    borderRadius: 4,
    paddingHorizontal: 12,
    paddingVertical: 16,
  },
});
