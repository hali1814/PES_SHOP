import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList } from 'react-native'

import React, { useState, useEffect, useContext, useCallback } from 'react'
import { Colors } from '../../constants/colors'
import { formatPrice } from '../../utils/MoneyFormat'
import { ProductContext } from '../../api/productAPI/productContext'
import { useNavigation, useFocusEffect } from '@react-navigation/native'
import { Notifier, NotifierComponents } from 'react-native-notifier';
import { ROUTES } from '../../constants'



const Shipping = () => {
    const changeStatusSuccessDialog = () => {
        Notifier.showNotification({
            title: 'Chuyển trang thái thành công',
            Component: NotifierComponents.Alert,
            componentProps: {
                alertType: 'success',
            },
        });
    }
    const changeStatusFailDialog = () => {
        Notifier.showNotification({
            title: 'Chuyển trang thái thất bại',
            description: loginMsg,
            Component: NotifierComponents.Alert,
            componentProps: {
                alertType: 'error',
            },
        });
    }
    const navigation = useNavigation()
    const { onGetBill, onToReceiveToCompleted } = useContext(ProductContext)
    const [bill, setBill] = useState([])
    const getBill = async () => {
        try {
            const res = await onGetBill(2)
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
        const toReceiveToCompleted = async () => {
            try {
                const idBill = item._id
                const idCustomer = item.customer
                const res = await onToReceiveToCompleted(idBill, idCustomer)
                if (res == true) {
                    changeStatusSuccessDialog()
                    navigation.navigate(ROUTES.DELIVERED)
                } else {
                    changeStatusFailDialog()
                }
            } catch (error) {
                console.log('onToReceiveToCompleted error', error.toString())
                throw error.toString()
            }
        }
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
                    <Text style={styles.reasonText}>{'Đơn hàng đang được giao'}</Text>
                    <View style={{ alignItems: 'flex-end', marginTop: 10 }}>
                        <TouchableOpacity
                            onPress={toReceiveToCompleted}
                            style={styles.button}
                        >
                            <Text style={styles.buttonText}>Hoàn tất</Text>
                        </TouchableOpacity>
                    </View>
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

export default Shipping

const styles = StyleSheet.create({
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
        width: '50%',
    },
    reasonText: {
        marginTop: 5,
        marginLeft: 10,
        color: Colors.MAIN
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