import { StyleSheet, Text, View, TouchableOpacity, Image, FlatList, TextInput, ScrollView } from 'react-native'
import React, { useEffect, useState, useContext } from 'react'
import Ionicon from 'react-native-vector-icons/Ionicons'
import { Colors } from '../../constants/colors'
import { formatPrice } from '../../utils/MoneyFormat'
import { ProductContext } from '../../api/productAPI/productContext'
import { useNavigation } from '@react-navigation/native'
import { Notifier, NotifierComponents } from 'react-native-notifier';
import { ROUTES } from '../../constants'



const AddStock = ({ route }) => {
    const navigation = useNavigation()
    const addStockSuccess = () => {
        Notifier.showNotification({
            title: 'Thêm thành công',
            Component: NotifierComponents.Alert,
            componentProps: {
                alertType: 'success',
            },
        });
    }
    const addStockFail = () => {
        Notifier.showNotification({
            title: 'Thêm thất bại',
            Component: NotifierComponents.Alert,
            componentProps: {
                alertType: 'error',
            },
        });
    }
    const { name, prices, colors, sizes, id, images } = route.params
    console.log(id)
    const { onAddStock, onGetProductDetail } = useContext(ProductContext)
    const [stockSize, setStockSize] = useState('')
    const [stockColor, setStockColor] = useState('')
    const [stockQuantity, setStockQuantity] = useState()
    const [stockPrice, setStockPrice] = useState()
    console.log(stockSize, stockColor, stockQuantity, stockPrice)
    const addStock = async () => {
        try {
            const res = await onAddStock(id, stockSize, stockColor, stockQuantity, stockPrice)
            if (res == true) {
                addStockSuccess()
                navigation.goBack()

            } else {
                addStockFail()
            }
        } catch (error) {
            console.log('add stock failed', error)
            throw error.toString()

        }
    }

    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{ flex: 1, marginBottom: 10 }}>
                    <View style={styles.header}>
                        <TouchableOpacity
                            onPress={() => { navigation.goBack() }}
                        >
                            <Ionicon
                                name='arrow-back-circle-outline'
                                size={30}
                                color={Colors.BLACK}
                            />
                        </TouchableOpacity>
                        <Text style={styles.title}>{name}</Text>
                        <View></View>
                    </View>
                    <View style={styles.body}>
                        <Text style={styles.bodyTitle}>Màu sắc</Text>
                        <View style={styles.stockContainer}>
                            {
                                colors.map((color, i) => (
                                    <View key={i}>
                                        <TouchableOpacity>
                                            <Text style={styles.stock}>{color}</Text>
                                        </TouchableOpacity>
                                    </View>
                                ))
                            }
                        </View>
                        <Text style={styles.bodyTitle}>Size</Text>
                        <View style={styles.stockContainer}>
                            {
                                sizes.map((size, i) => (
                                    <View key={i}>
                                        <TouchableOpacity>
                                            <Text style={styles.stock}>{size}</Text>
                                        </TouchableOpacity>
                                    </View>
                                ))
                            }
                        </View>
                        <Text style={styles.bodyTitle}>Stock</Text>
                        <Text style={styles.bodyTitle}>Price</Text>
                        <View style={styles.price}>
                            <View style={styles.stockContainer}>
                                {
                                    prices.map((price, i) => (
                                        <View key={i}>
                                            <TouchableOpacity>
                                                <Text style={styles.priceText}>{formatPrice(parseInt(price))}</Text>
                                            </TouchableOpacity>
                                        </View>
                                    ))
                                }
                            </View>
                        </View>
                    </View>
                </View>
                <View style={styles.addContainer}>
                    <Text style={styles.bodyTitle}>Thêm màu</Text>
                    <TextInput
                        placeholder='Thêm màu cho sản phẩm'
                        style={styles.input}
                        value={stockColor}
                        onChangeText={(text) => setStockColor(text)}
                    />
                    <Text style={styles.bodyTitle}>Thêm size</Text>
                    <TextInput
                        placeholder='Thêm size cho sản phẩm'
                        style={styles.input}
                        value={stockSize}
                        onChangeText={(text) => setStockSize(text)}
                    />
                    <Text style={styles.bodyTitle}>Thêm số lượng</Text>
                    <TextInput
                        placeholder='Thêm số lượng cho sản phẩm'
                        style={styles.input}
                        keyboardType='number-pad'
                        value={stockQuantity}
                        onChangeText={(text) => setStockQuantity(text)}
                    />
                    <Text style={styles.bodyTitle}>Thêm giá</Text>
                    <TextInput
                        placeholder='Thêm giá cho sản phẩm'
                        style={styles.input}
                        keyboardType='number-pad'
                        value={stockPrice}
                        onChangeText={(text) => setStockPrice(text)}
                    />
                </View>
            </ScrollView>
            <TouchableOpacity
                onPress={addStock}
                style={styles.button}
            >
                <Text style={styles.buttonText}>Update Stock</Text>
            </TouchableOpacity>
        </View>
    )
}

export default AddStock

const styles = StyleSheet.create({
    input: {
        borderWidth: 1,
        marginVertical: 5,
        borderColor: Colors.MAIN,
        borderRadius: 5,
    },
    addContainer: {
        flex: 1
    },
    container: {
        flex: 1,
        paddingTop: 10,
        paddingHorizontal: 16,
    },
    title: {
        fontSize: 16,
        fontWeight: '500',
        color: Colors.BLACK,
        textTransform: 'uppercase'
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    body: {
        marginTop: 10,
        backgroundColor: Colors.WHITE,
        width: '100%',
        shadowOffset: {
            width: 1,
            height: 2
        },
        shadowColor: 'gray',
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 5,
        borderRadius: 5,
        paddingHorizontal: 10,
        paddingVertical: 10
    },
    stockContainer: {
        flexDirection: 'row',
        marginVertical: 10,
    },
    stock: {
        backgroundColor: '#EEEEEE',
        marginRight: 15,
        padding: 5,
        shadowOffset: {
            width: 1,
            height: 2
        },
        shadowColor: 'black',
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 5,
        borderRadius: 5,
    },
    bodyTitle: {
        fontSize: 14,
        color: Colors.BLACK,
        fontWeight: '400'
    },
    button: {
        backgroundColor: Colors.MAIN,
        paddingVertical: 10,
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
    priceText: {
        fontSize: 15,
        color: 'white',
        fontWeight: '500',
        marginRight: 10,
        backgroundColor: Colors.MAIN,
        padding: 5,
        borderRadius: 5,
    },
    price: {

    },
})