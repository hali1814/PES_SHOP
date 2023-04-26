import { StyleSheet, Text, View, TouchableOpacity, Image, FlatList, Dimensions, ScrollView, ActivityIndicator } from 'react-native'
import React, { useState, useEffect, useContext } from 'react'
import Ionicon from 'react-native-vector-icons/Ionicons'
import { Colors } from '../../constants/colors'
import { formatPrice } from '../../utils/MoneyFormat'
import { ProductContext } from '../../api/productAPI/productContext'
import Swiper from 'react-native-swiper'
import { ROUTES } from '../../constants'






const Detail = ({ navigation, route }) => {

    const data = [
        {
            id: 1,
            image: require('../../assets/images/Item.png')
        },
        {
            id: 2,
            image: require('../../assets/images/Item.png')
        },
        {
            id: 3,
            image: require('../../assets/images/Item.png')
        },
    ]

    const renderItem = ({ item, index }) => {
        console.log('images', item)
        return (
            <Image
                key={index}
                source={item ? { uri: item } : require('../../assets/images/Item.png')}
                // style={{ height: 350, width: '100%' }}
                resizeMode='cover'
            />
        )
    }

    const { onGetProductDetail, detail, detailLoading } = useContext(ProductContext)
    const [productDetail, setProductDetail] = useState([])
    const [images, setImages] = useState([])
    const [name, setName] = useState('')
    const [prices, setPrices] = useState([])
    const [colors, setColors] = useState([])
    const [sizes, setSizes] = useState([])
    const [location, setLocation] = useState('')
    const [brand, setBrand] = useState('')
    const { _id } = route.params
    prices.sort((a, b) => a - b);
    const getDetail = async () => {
        try {
            const res = await onGetProductDetail(_id)
            setProductDetail(res)
            setImages(res.images)
            setName(res.name)
            const stockPrice = res.stock.map(item => item.price)
            setPrices(stockPrice)
            const stockColor = res.stock.map(item => item.color)
            setColors(stockColor)
            const stockSizes = res.stock.map(item => item.size)
            setSizes(stockSizes)
            setLocation(res.shop.address)
            setBrand(res.shop.nameShop)
        } catch (error) {
            console.log('error', error)
            throw error.toString()
        }
    }

    useEffect(() => {
        getDetail()
    }, [])

    // useEffect(() => {
    //     console.log('images loaded', images)
    // }, [images])

    return (
        <View style={{ flex: 1 }}>
            {
                detailLoading
                    ? (<ActivityIndicator size='large' color={Colors.MAIN} />)
                    : (
                        <View style={styles.container}>
                            <View>
                                <TouchableOpacity
                                    style={styles.gobackButton}
                                    onPress={() => { navigation.goBack() }}
                                >
                                    <Ionicon
                                        name='arrow-back-circle-outline'
                                        size={30}
                                        color={Colors.BLACK}
                                    />
                                </TouchableOpacity>
                                <FlatList
                                    data={images}
                                    renderItem={renderItem}
                                    horizontal={true}
                                    // showsHorizontalScrollIndicator={false}
                                    style={{ height: 350, width: '100%' }}
                                />
                            </View>
                            <View style={styles.nameBox}>
                                <Text style={styles.title}>{name}</Text>
                                <View style={styles.priceContainer}>
                                    <Text style={styles.checkText}>Giày authentic</Text>
                                    <View style={{ flexDirection: 'row' }}>
                                        {
                                            prices.map((price, index) => (
                                                <Text
                                                    style={{ marginLeft: 10, color: 'red', fontWeight: '500' }}
                                                    key={index}>
                                                    {formatPrice(price)}
                                                </Text>
                                            ))
                                        }
                                    </View>
                                </View>
                            </View>
                            <View style={styles.stockBox}>
                                <View style={styles.headerContainer}>
                                    <Text style={styles.title}>Mô tả chi tiết</Text>
                                    <TouchableOpacity
                                        onPress={() => {
                                            navigation.navigate(ROUTES.ADD_STOCK,
                                                { name: name, prices: prices, colors: colors, sizes: sizes, id: _id })
                                        }}
                                        style={styles.headerContainer}
                                    >
                                        <Text style={{ color: Colors.MAIN, marginRight: 5 }}>Chi tiết</Text>
                                        <Ionicon
                                            name='arrow-forward-outline'
                                            size={20}
                                            color={Colors.MAIN}
                                        />
                                    </TouchableOpacity>
                                </View>
                                <View style={[styles.headerContainer, { marginTop: 10 }]}>
                                    <View style={styles.headerContainer}>
                                        <Ionicon
                                            name='color-filter-outline'
                                            color={Colors.MAIN}
                                            size={20}
                                        />
                                        <Text style={{ color: Colors.BLACK, marginLeft: 5 }}>Màu sắc</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row' }}>
                                        {
                                            colors.map((color, index) => (
                                                <Text style={{ marginLeft: 10 }} key={index}>{color}</Text>
                                            ))
                                        }
                                    </View>
                                </View>
                                <View style={[styles.headerContainer, { marginTop: 10 }]}>
                                    <View style={styles.headerContainer}>
                                        <Ionicon
                                            name='grid-outline'
                                            color={Colors.MAIN}
                                            size={20}
                                        />
                                        <Text style={{ color: Colors.BLACK, marginLeft: 5 }}>Kích thước</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row' }}>
                                        {
                                            sizes.map((size, index) => (
                                                <Text style={{ marginLeft: 10 }} key={index}>{size}</Text>
                                            ))
                                        }
                                    </View>
                                </View>
                                <View style={[styles.headerContainer, { marginTop: 10 }]}>
                                    <View style={styles.headerContainer}>
                                        <Ionicon
                                            name='location-outline'
                                            color={Colors.MAIN}
                                            size={20}
                                        />
                                        <Text style={{ color: Colors.BLACK, marginLeft: 5 }}>Khu vực</Text>
                                    </View>
                                    <Text>{location}</Text>
                                </View>
                                <View style={[styles.headerContainer, { marginTop: 10 }]}>
                                    <View style={styles.headerContainer}>
                                        <Ionicon
                                            name='checkmark-done-circle-outline'
                                            color={Colors.MAIN}
                                            size={20}
                                        />
                                        <Text style={{ color: Colors.BLACK, marginLeft: 5 }}>Thương hiệu</Text>
                                    </View>
                                    <Text>{brand}</Text>
                                </View>
                            </View>
                        </View>
                    )
            }
            <TouchableOpacity
                onPress={() => {
                    navigation.navigate(ROUTES.ADD_STOCK,
                        { name: name, prices: prices, colors: colors, sizes: sizes, id: _id })
                }}
                style={styles.updateButton}
            >
                <Text style={styles.buttonText}>Cập nhật sản phẩm</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Detail

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    gobackButton: {
        position: 'absolute',
        top: 10,
        left: 16,
        zIndex: 1
    },
    boxImage: {
        height: 350
    },
    nameBox: {
        marginHorizontal: 10,
        backgroundColor: Colors.WHITE,
        marginTop: -10,
        borderRadius: 5,
        shadowOffset: {
            width: 1,
            height: 2
        },
        shadowColor: 'gray',
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 5,
        paddingHorizontal: 10,
        paddingVertical: 12
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        color: Colors.BLACK,
        textTransform: 'capitalize'
    },
    priceContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10
    },
    checkText: {
        backgroundColor: '#EEEEEE',
        padding: 5,
        borderRadius: 3
    },
    stockBox: {
        backgroundColor: Colors.WHITE,
        marginTop: 10,
        marginHorizontal: 10,
        borderRadius: 5,
        shadowOffset: {
            width: 1,
            height: 2
        },
        shadowColor: 'gray',
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 5,
        paddingHorizontal: 10,
        paddingVertical: 12
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    updateButton: {
        marginTop: 20,
        backgroundColor: Colors.MAIN,
        paddingVertical: 10,
        marginHorizontal: 16,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        borderRadius: 5,
        shadowOffset: {
            width: 1,
            height: 2
        },
        shadowColor: 'gray',
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 5,
        paddingHorizontal: 10,
        paddingVertical: 12
    },
    buttonText: {
        fontSize: 16,
        fontWeight: '400',
        color: Colors.WHITE,
    },
})