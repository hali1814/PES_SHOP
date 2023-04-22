import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList } from 'react-native'

import React, { useState, useEffect, useContext, useCallback } from 'react'
import { Colors } from '../../constants/colors'
import { formatPrice } from '../../utils/MoneyFormat'
import { ProductContext } from '../../api/productAPI/productContext'
import { useNavigation, useFocusEffect } from '@react-navigation/native'


const Delivered = () => {
    const navigation = useNavigation()
    const { onGetBill } = useContext(ProductContext)
    const [bill, setBill] = useState([])
    const getBill = async () => {
        try {
            const res = await onGetBill(3)
            setBill(res)
        } catch (error) {
            console.log('getBill error', error.toString())
            throw error.toString()
        }
    }
    useFocusEffect(
        useCallback(() => {
            getBill();
        }, [onGetBill])
    );

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            getBill();
        });

        return unsubscribe;
    }, [navigation]);

    const renderItem = ({ item }) => {
        return (
            <View style={styles.billContainer}>
                <Image
                    source={{ uri: item.productDetails.images[0] }}
                    style={{ width: 80, height: 80 }}
                    resizeMode='cover'
                />
                <View>
                    <Text style={styles.name}>{item.productDetails.name} x{item.quantity}</Text>
                    <View style={styles.row}>
                        <Text>Tổng thanh toán</Text>
                        <Text style={styles.price}>{formatPrice(item.amount)}</Text>
                    </View>
                    <Text style={styles.reasonText}>{'Đơn hàng đã giao'}</Text>
                </View>
            </View>
        )
    }
    return (
        <View style={styles.container}>
            <FlatList
                data={bill}
                keyExtractor={(item) => item._id}
                renderItem={renderItem}
                showsVerticalScrollIndicator={false}
            />
        </View>
    )
}

export default Delivered

const styles = StyleSheet.create({
    reasonText: {
        marginTop: 5,
        marginLeft: 10,
        color: 'red'
    },
    cancelButton: {
        padding: 10,
        backgroundColor: Colors.TEXT_ERROR,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        width: '20%'
    },
    buttonText: {
        color: Colors.WHITE,
        fontWeight: '500'
    },
    button: {
        padding: 10,
        backgroundColor: Colors.MAIN,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        width: '50%'
    },
    price: {
        color: Colors.MAIN,
        marginLeft: 50
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginLeft: 10,
        width: '63%'
    },
    name: {
        fontSize: 14,
        fontWeight: '500',
        color: Colors.BLACK,
        marginLeft: 10,
        marginBottom: 5,
    },
    billContainer: {
        backgroundColor: Colors.WHITE,
        borderRadius: 5,
        paddingRight: 5,
        paddingBottom: 10,
        flexDirection: 'row',
        shadowOffset: {
            width: 1,
            height: 2
        },
        shadowColor: 'gray',
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 5,
        marginBottom: 15,
    },
    container: {
        flex: 1,
        paddingTop: 10,
        paddingHorizontal: 16,
    },
})