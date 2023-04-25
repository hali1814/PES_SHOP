import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList, Modal, TextInput, Button } from 'react-native'
import React, { useState, useEffect, useContext, useCallback } from 'react'
import { ProductContext } from '../../api/productAPI/productContext'
import { Colors } from '../../constants/colors'
import { formatPrice } from '../../utils/MoneyFormat'
import { Notifier, NotifierComponents } from 'react-native-notifier';
import { useNavigation, useFocusEffect } from '@react-navigation/native'
import { ROUTES } from '../../constants'
import { isValidReason } from '../../utils/checkReason'


const Awaiting = () => {

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
    const { onGetBill, onToPayToShip, onCancelBill } = useContext(ProductContext)
    const [bill, setBill] = useState([])
    const getBill = async () => {
        try {
            const res = await onGetBill(0)
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

    const [modalVisible, setModalVisible] = useState(false);
    const [cancelReason, setCancelReason] = useState('');
    const [errorReason, setErrorReason] = useState('')
    const isValidationOK = () => cancelReason.length > 0 && isValidReason(cancelReason) == true
    const [id, setId] = useState('')
    const [customer, setCustomer] = useState('')



    const renderItem = ({ item }) => {

        const showModal = () => {
            setModalVisible(true);
        };
        const onCancelPress = (idBill, idCustomer) => {
            setId(idBill)
            setCustomer(idCustomer)
            console.log('id,idCustomer', id, customer)
            showModal();
        };

        const toPayToShip = async () => {
            try {
                const idBill = item._id
                const idCustomer = item.customer
                const res = await onToPayToShip(idBill, idCustomer)
                if (res == true) {
                    changeStatusSuccessDialog()
                    navigation.navigate(ROUTES.AWAITINGPICKUUP)
                } else {
                    changeStatusFailDialog()
                }
            } catch (error) {
                console.log('onToPayToShip error', error.toString())
                throw error.toString()
            }
        }

        const cancelBill = async () => {
            console.log('cancelBill', id, customer, cancelReason)
            try {
                const res = await onCancelBill(id, customer, cancelReason)
                if (res == true) {
                    changeStatusSuccessDialog()
                    setModalVisible(false)
                    navigation.navigate(ROUTES.CANCELED)
                } else {
                    changeStatusFailDialog()
                }
            } catch (error) {
                console.log('onCancelBill error', error.toString())
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
                    <View
                        style={{ alignItems: 'flex-end', marginTop: 10, flexDirection: 'row', justifyContent: 'space-between', marginLeft: 10 }}
                    >
                        <TouchableOpacity
                            onPress={toPayToShip}
                            style={styles.button}
                        >
                            <Text style={styles.buttonText}>Xác nhận</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => { onCancelPress(item._id, item.customer) }}
                            style={styles.cancelButton}
                        >
                            <Text style={styles.buttonText}>Huỷ</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <Modal
                    animationType="fade"
                    visible={modalVisible}
                    transparent={true}

                >
                    <View style={styles.modal}>
                        <View style={styles.modalContent}>
                            <Text style={styles.modalTitle}>Xác nhận hủy</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Lý do hủy"
                                value={cancelReason}
                                onChangeText={
                                    (text) => {
                                        setErrorReason(
                                            isValidReason(text) == true
                                                ? ''
                                                : 'Lý do phải đủ 10 ký tự',
                                        );
                                        setCancelReason(text);
                                    }
                                }
                            />
                            <Text style={{ color: 'red', fontSize: 14 }}>
                                {errorReason}
                            </Text>
                            <View style={styles.buttonContainer}>
                                <Button
                                    onPress={cancelBill}
                                    disabled={isValidationOK() == false}
                                    title="Xác nhận"
                                    color={isValidationOK() == false ? 'gray' : 'blue'}
                                />
                                <Button title="Huỷ" onPress={() => { setModalVisible(false) }} color="#ff0000" />
                            </View>
                        </View>
                    </View>
                </Modal>
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

export default Awaiting

const styles = StyleSheet.create({
    modal: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalContent: {
        backgroundColor: '#fff',
        borderRadius: 5,
        padding: 20,
        width: '80%',
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    input: {
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        paddingVertical: 5,
        marginBottom: 10,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
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