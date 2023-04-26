import { StyleSheet, Text, View, TextInput, TouchableOpacity, SafeAreaView, ScrollView, Image, FlatList, ActivityIndicator } from 'react-native'
import React, { useState, useEffect, useContext, useRef } from 'react'
import { Colors } from '../../constants/colors'
import Ionicon from 'react-native-vector-icons/Ionicons'
import { Picker } from '@react-native-picker/picker'
import { ProductContext } from '../../api/productAPI/productContext'
import ImagePicker from 'react-native-image-crop-picker'
import { Notifier, NotifierComponents } from 'react-native-notifier';
import { useNavigation } from '@react-navigation/native'
import { ROUTES } from '../../constants'

const AddProduct = () => {
    const { onGetAllGenres, onUpload, genreLoading, genres, onAddProduct, imageUpload, onGetStore } = useContext(ProductContext)

    const getAllGenres = async () => {
        try {
            const res = await onGetAllGenres()
            console.log(res)
            setTypes(res)
        } catch (error) {
            console.log('getAllGenres error: ' + error)
            throw error.toString()
        }
    }

    const navigation = useNavigation()

    useEffect(() => {
        getAllGenres(),
            onUpload()
    }, [])

    const [types, setTypes] = useState([])
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedSize, setSelectedSize] = useState('')
    const [selectedColor, setSelectedColor] = useState('')
    const [imageLoading, setImageLoading] = useState(false)
    const [images, setImages] = useState([])
    const [productName, setProductName] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState()
    const [status, setStatus] = useState(0)
    const [stock, setStock] = useState({})
    useEffect(() => {
        setStock({
            color: selectedColor,
            size: selectedSize,
            price: price,
            status: status,
        });
        console.log('stock selected', stock)
    }, [selectedColor, selectedSize, price, status]);


    const [isLoading, setIsLoading] = useState(false);

    const upLoadSuccessDialog = () => {
        Notifier.showNotification({
            title: 'Up ảnh thành công',
            Component: NotifierComponents.Alert,
            componentProps: {
                alertType: 'success',
            },
        });
    }

    const selectImages = async () => {
        setImageLoading(true);
        try {
            const selectedImages = await ImagePicker.openPicker({
                multiple: true,
                mediaType: 'photo',
            });
            setImageLoading(false);
            console.log('hinh ban dau ', selectedImages)
            const newImages = selectedImages.map(image => ({
                uri: image.path,
                name: image.path.substring(image.path.lastIndexOf("/") + 1),
                type: image.mime,
            }));
            setImages(newImages);
        } catch (error) {
            console.error('open image failed', error);
            setImageLoading(false);
            throw error;
        }
    }

    useEffect(() => {
        console.log('hinh day ne : ', images);
    }, [images]);
    useEffect(() => {
        console.log('hinh sau khi lay ve tu server : ', imageUpload);
    }, [imageUpload])
    useEffect(() => {
    }, [genres])

    const uploadImages = async () => {
        try {
            const formData = new FormData();
            images.forEach((image, index) => {
                formData.append(`images`, image);
            });
            const response = await onUpload(formData)
            upLoadSuccessDialog()
            console.log('resss', response);
            console.log('image upload ====>', imageUpload)
        } catch (error) {
            console.log(error.toString());
        }
    };

    const addProduct = async () => {
        try {
            const res = await onAddProduct(selectedCategory, productName, imageUpload, stock, 10, description)
            console.log('add product result : ', res)
            if (res == true) {
                navigation.push(ROUTES.HOME)
                onGetStore()
            }
        } catch (error) {
            console.log(error.toString());
            throw error;
        }
    }

    const renderItem = ({ item }) => {
        return (
            <Image style={styles.img} source={{ uri: item.uri }} />
        )
    }
    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            <Image style={styles.bgImg} source={require('../../assets/images/backgroundImage2.jpg')} />
            <View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <TouchableOpacity
                        onPress={selectImages}
                        style={styles.addImageButton}
                    >
                        <Ionicon name='image-outline' size={30} color={Colors.WHITE} />
                        <Text style={{ fontSize: 15, color: Colors.WHITE, fontWeight: '500' }}>Chọn ảnh</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={uploadImages}
                        style={styles.addImageButton}
                    >
                        <Ionicon name='image-outline' size={30} color={Colors.WHITE} />
                        <Text style={{ fontSize: 15, color: Colors.WHITE, fontWeight: '500' }}>Up ảnh</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ height: 200 }}>
                    <FlatList
                        data={images}
                        renderItem={renderItem}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                    />
                </View>
                <Text style={styles.title}>Chọn loại, size và màu sản phẩm</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    {
                        genreLoading
                            ? (<ActivityIndicator size='large' color={Colors.MAIN} />)
                            : (
                                <Picker
                                    selectedValue={selectedCategory}
                                    onValueChange={(itemValue, itemIndex) => setSelectedCategory(itemValue)}
                                    style={styles.picker}
                                >
                                    <Picker.Item label='loại sản phẩm' enabled={false} />
                                    {genres.map((genre, index) => (
                                        <Picker.Item key={index} label={genre.label} value={genre.id} />
                                    ))}
                                </Picker>
                            )
                    }
                </View>
                <Text style={styles.title}>Màu sản phẩm : </Text>
                <TextInput
                    value={selectedColor}
                    onChangeText={(text) => setSelectedColor(text)}
                    placeholder='đen, trắng, xanh'
                    style={styles.input}
                />
                <Text style={styles.title}>Size sản phẩm : </Text>
                <TextInput
                    value={selectedSize}
                    onChangeText={(text) => setSelectedSize(text)}
                    placeholder='S,M,L,XL'
                    style={styles.input}
                />
                <Text style={styles.title}>Tên sản phẩm : </Text>
                <TextInput
                    value={productName}
                    onChangeText={(text) => setProductName(text)}
                    placeholder='Nhập tên cho sản phẩm'
                    style={styles.input}
                />
                <Text style={styles.title}>Mô tả : </Text>
                <TextInput
                    value={description}
                    onChangeText={(text) => setDescription(text)}
                    placeholder='Nhập mô tả cho sản phẩm'
                    style={styles.input}
                    numberOfLines={2}
                />
                <Text style={styles.title}>Nhập giá : </Text>
                <TextInput
                    value={price}
                    onChangeText={(text) => setPrice(text)}
                    placeholder='100.000đ'
                    style={styles.input}
                    numberOfLines={2}
                />
            </View>
            <TouchableOpacity
                onPress={addProduct}
                style={styles.button}
            >
                <Text style={styles.buttonText}>Thêm sản phẩm</Text>
            </TouchableOpacity>
        </ScrollView>
    )
}

export default AddProduct

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: '100%',
    },
    button: {
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingVertical: 7,
        backgroundColor: Colors.MAIN,
        marginHorizontal: 20,
        borderRadius: 7,
        marginVertical: 10,
    },
    buttonText: {
        color: Colors.WHITE,
        fontWeight: '500'
    },
    addImageButton: {
        padding: 5,
        backgroundColor: Colors.MAIN,
        borderRadius: 5,
        flexDirection: 'row',
        alignItems: 'center',
        width: '40%',
        justifyContent: 'space-around',
        marginBottom: 10,
        marginHorizontal: 16,
        marginTop: 10,
    },
    imageContainer: {
        marginTop: 10,
        backgroundColor: Colors.BLACK,
        height: 200,
    },
    img: {
        height: 200,
        width: 200
    },
    picker: {
        backgroundColor: '#FFFFFF',
        marginTop: 10,
        color: Colors.BLACK,
        width: '30%',
        marginHorizontal: 16,
    },
    title: {
        marginTop: 10,
        color: Colors.BLACK,
        fontSize: 16,
        fontWeight: '500',
        marginHorizontal: 16,
    },
    input: {
        marginTop: 5,
        borderBottomWidth: 0.5,
        borderBottomColor: 'gray',
        marginHorizontal: 16,
    },
    bgImg: {
        position: 'absolute',
        zIndex: -1,
        resizeMode: 'cover',
        opacity: 0.3
    },
})