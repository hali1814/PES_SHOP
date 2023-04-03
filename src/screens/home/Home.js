import {
  Image,
  ImageBackground,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import React from 'react';
import {Colors} from '../../constants/colors';
import {icons, images} from '../../assets';
import {formatPrice} from '../../utils/MoneyFormat';

const DATA = [
  {
    id: '1',
    title: 'Item 1',
    images: images.img_Item,
    price: '200.000',
    describe: 'Người thành công luôn có lối đi riêng và không đi cùng ai',
    sale: '20%',
  },
  {
    id: '2',
    title: 'Item 1',
    images: images.img_Item,
    price: '200.000',
    describe: 'Description',
    sale: '20%',
  },
  {
    id: '3',
    title: 'Item 1',
    images: images.img_Item,
    price: '200.000',
    describe: 'Description',
    sale: '20%',
  },
  {
    id: '4',
    title: 'Item 1',
    images: images.img_Item,
    price: '200.000',
    describe: 'Description',
    sale: '20%',
  },
  {
    id: '5',
    title: 'Item 1',
    images: images.img_Item,
    price: '200.000',
    describe: 'Description',
    sale: '20%',
  },
  {
    id: '6',
    title: 'Item 1',
    images: images.img_Item,
    price: '200.000',
    describe: 'Description',
    sale: '20%',
  },
  {
    id: '7',
    title: 'Item 1',
    images: images.img_Item,
    price: '200.000',
    describe: 'Description',
    sale: '20%',
  },
  {
    id: '8',
    title: 'Item 1',
    images: images.img_Item,
    price: '200.000',
    describe: 'Description',
    sale: '20%',
  },
  {
    id: '9',
    title: 'Item 1',
    images: images.img_Item,
    price: '200.000',
    describe: 'Description',
    sale: '20%',
  },
];

const numColumns = 2;

const Home = () => {
  // RenderItems FlatList
  const renderItem = ({item}) => (
    <TouchableOpacity style={styles.ContainerFlatList}>
      <View style={styles.CustomImgItem}>
        <Image source={item.images} style={styles.styleImg} />
      </View>
      <View style={{position: 'absolute'}}>
        <View style={styles.CustomSale}>
          <Image source={icons.icon_TagSale} style={{width: 16, height: 16}} />
          <Text style={styles.TextSale}>{item.sale}</Text>
        </View>
      </View>
      <View style={styles.ViewTextFL}>
        <Text numberOfLines={1} style={styles.title}>
          {item.title}
        </Text>
        <Text numberOfLines={2} style={styles.describe}>
          {item.describe}
        </Text>
        <Text numberOfLines={1} style={styles.price}>
          {item.price}đ
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={{flex: 1}}>
      <StatusBar hidden={true} />
      <ImageBackground source={images.img_Background} style={{height: 278}} />
      <View style={styles.ContainerBackground}>
        <View style={styles.CustomViewShop}>
          <View style={styles.CustomViewNameShop}>
            <Text style={styles.TextNameShop}>{'Vua Hàng Hiệu'}</Text>
            <Image
              source={icons.icon_Crown}
              style={{marginLeft: 4, width: 20, height: 20}}
            />
          </View>
          <Text style={styles.TextMailShop}>{'vuahanghieu@gmail.com'}</Text>
          <View style={styles.CustomCurrency}>
            <View style={{alignItems: 'center'}}>
              <Text style={styles.Number}>{'886'}</Text>
              <Text style={styles.TextCurrencyShop}>{'Đã bán'}</Text>
            </View>
            <View style={{alignItems: 'center'}}>
              <Text style={styles.Number}>{'12,233'}</Text>
              <Text style={styles.TextCurrencyShop}>{'Thích'}</Text>
            </View>
            <View style={{alignItems: 'center'}}>
              <Text style={styles.Number}>{'4.5'}</Text>
              <Text style={styles.TextCurrencyShop}>{'Đánh giá'}</Text>
            </View>
          </View>
        </View>
        <View style={styles.CustomImgUser}>
          <Image source={images.img_User} style={{height: 80, width: 80}} />
        </View>
      </View>
      {/* FlatListView */}
      <View style={{paddingHorizontal: 12, marginTop: 12}}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={DATA}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          numColumns={numColumns}
          contentContainerStyle={styles.container}
        />
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  TextSale: {
    color: Colors.WHITE,
    fontSize: 14,
    marginLeft: 4,
  },
  ViewTextFL: {
    width: '100%',
    paddingHorizontal: 12,
    paddingVertical: 6,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  CustomSale: {
    flexDirection: 'row',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderTopLeftRadius: 4,
    borderBottomRightRadius: 4,
    backgroundColor: Colors.MAIN,
    alignItems: 'center',
  },
  price: {
    color: Colors.MAIN,
    fontSize: 16,
    fontWeight: 'bold',
  },
  describe: {
    color: Colors.TEXT_SECOND,
    fontSize: 14,
  },
  title: {
    color: Colors.BLACK,
    fontSize: 15,
    fontWeight: 'bold',
  },
  styleImg: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderTopRightRadius: 4,
  },
  CustomImgItem: {
    height: 180.5,
    width: '100%',
  },
  ContainerFlatList: {
    width: 165.5,
    backgroundColor: Colors.WHITE,
    flex: 1,
    margin: 4,
    borderRadius: 4,
    flexDirection: 'column',
  },
  ContainerBackground: {
    height: 278,
    paddingHorizontal: 12,
    position: 'absolute',
    width: '100%',
    alignItems: 'center',
  },
  CustomViewShop: {
    bottom: 0,
    position: 'absolute',
    width: '100%',
    backgroundColor: Colors.WHITE,
    paddingHorizontal: 12,
    borderRadius: 4,
    height: 156,
    alignItems: 'center',
  },
  CustomImgUser: {
    position: 'absolute',
    bottom: 120,
    width: 82,
    height: 82,
    backgroundColor: Colors.WHITE,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 360,
  },
  TextNameShop: {
    color: Colors.BLACK,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  TextMailShop: {
    marginTop: 4,
    color: Colors.TEXT_SECOND,
    fontSize: 8,
    fontWeight: '400',
    textAlign: 'center',
  },
  CustomViewNameShop: {
    marginTop: 40,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  Number: {
    color: Colors.BLACK,
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  TextCurrencyShop: {
    color: Colors.TEXT_SECOND,
    fontSize: 12,
    fontWeight: '400',
    textAlign: 'center',
    marginTop: 4,
  },
  CustomCurrency: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'absolute',
    width: '100%',
    bottom: 0,
  },
});
