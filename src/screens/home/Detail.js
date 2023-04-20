import { StyleSheet, Text, View, TouchableOpacity, Image, FlatList, Dimensions, ScrollView, ActivityIndicator } from 'react-native'
import React, { useState, useEffect, useContext } from 'react'
import Ionicon from 'react-native-vector-icons/Ionicons'
import { Colors } from '../../constants/colors'
import { formatPrice } from '../../utils/MoneyFormat'
import { ProductContext } from '../../api/productAPI/productContext'




const renderItem = ({ item }) => {
    console.log('itemm', item)
    return (
        <View style={styles.boxImage}>
            <Image
                source={{ uri: item }}
                style={{ height: 350 }}
                resizeMode='cover'
            />
        </View>
    )
}

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

    useEffect(() => {
        getDetail()
    }, [])

    const { onGetProductDetail, detail, detailLoading } = useContext(ProductContext)
    const [productDetail, setProductDetail] = useState([])
    const { _id } = route.params
    console.log('idddd', _id)

    const getDetail = async () => {
        try {
            const res = await onGetProductDetail(_id)
            if (res == true) {
                setProductDetail(res)
            }

        } catch (error) {
            console.log('error', error)
            throw error.toString()
        }

    }



    return (
        <View style={{ flex: 1 }}>
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
                    {
                        detailLoading
                            ? (<ActivityIndicator size='large' color={Colors.MAIN} />)
                            : (
                                <FlatList
                                    data={productDetail.images}
                                    renderItem={renderItem}
                                    keyExtractor={(item) => item}
                                    horizontal={true}
                                    showsHorizontalScrollIndicator={false}
                                />
                            )
                    }
                </View>
                {
                    detailLoading
                        ? (<ActivityIndicator size='large' color={Colors.MAIN} />)
                        : (
                            <View style={styles.nameBox}>
                                <Text style={styles.title}>{detail.name}</Text>
                                <View style={styles.priceContainer}>
                                    <Text style={styles.checkText}>Giày authentic</Text>
                                    <Text style={styles.title}>{formatPrice(productDetail.stock[0].price)}</Text>
                                </View>
                            </View>
                        )
                }
                {
                    detailLoading
                        ? (<ActivityIndicator size='large' color={Colors.MAIN} />)
                        : (
                            <View style={styles.stockBox}>
                                <View style={styles.headerContainer}>
                                    <Text style={styles.title}>Mô tả chi tiết</Text>
                                    <TouchableOpacity style={styles.headerContainer}>
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
                                    <Text>{productDetail.stock[0].color}</Text>
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
                                    <Text>{productDetail.stock[0].size}</Text>
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
                                    <Text>{productDetail.shop.address}</Text>
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
                                    <Text>{productDetail.shop.nameShop}</Text>
                                </View>
                            </View>
                        )
                }
            </View>
            <TouchableOpacity style={styles.updateButton}>
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
        color: Colors.BLACK
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