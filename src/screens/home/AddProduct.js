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

    const sizes = ['s', 'l', 'xl']
    const colors = ['trắng', 'đen', 'tím']
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedSize, setSelectedSize] = useState(sizes[0])
    const [selectedColor, setSelectedColor] = useState(colors[0])
    const [imageLoading, setImageLoading] = useState(false)
    const [images, setImages] = useState([])
    const [productName, setProductName] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState(200000)
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

    console.log('name, description', productName, description)

    const renderItem = ({ item }) => {
        return (
            <Image style={styles.img} source={{ uri: item.uri }} />
        )
    }
    return (
        <SafeAreaView style={styles.container}>
            <Image style={styles.bgImg} source={require('../../assets/images/backgroundImage2.jpg')} />
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
                <Picker
                    selectedValue={selectedSize}
                    onValueChange={(itemValue, itemIndex) => setSelectedCategory(itemValue)}
                    style={styles.picker}
                >
                    <Picker.Item label='size' enabled={false} />
                    {sizes.map((size, index) => (
                        <Picker.Item key={index} label={size} value={size} />
                    ))}
                </Picker>
                <Picker
                    selectedValue={selectedColor}
                    onValueChange={(itemValue, itemIndex) => setSelectedColor(itemValue)}
                    style={styles.picker}
                >
                    <Picker.Item label='màu sắc' enabled={false} />
                    {colors.map((color, index) => (
                        <Picker.Item key={index} label={color} value={color} />
                    ))}
                </Picker>
            </View>
            <Text style={styles.title}>Tên sản phẩm : </Text>
            <TextInput
                value={productName}
                onChangeText={(text) => setProductName(text)}
                placeholder='Áo đẹp chưa kìa'
                style={styles.input}
            />
            <Text style={styles.title}>Mô tả : </Text>
            <TextInput
                value={description}
                onChangeText={(text) => setDescription(text)}
                placeholder='Áo này thật là đẹp bao la như nắng chiều ban mai sớm'
                style={styles.input}
                numberOfLines={2}
            />
            <TouchableOpacity
                onPress={addProduct}
                style={styles.button}
            >
                <Text style={styles.buttonText}>Thêm sản phẩm</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

export default AddProduct

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: 10,
        paddingHorizontal: 16,
        height: '100%',
    },
    button: {
        justifyContent: 'flex-end',
        position: 'absolute',
        bottom: 0,
        alignItems: 'center',
        paddingVertical: 7,
        backgroundColor: Colors.MAIN,
        left: 0,
        right: 0,
        marginHorizontal: 20,
        borderTopLeftRadius: 7,
        borderTopRightRadius: 7,
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
        marginBottom: 10
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
        width: '30%'
    },
    title: {
        marginTop: 10,
        color: Colors.BLACK,
        fontSize: 16,
        fontWeight: '500'
    },
    input: {
        marginTop: 5,
        borderBottomWidth: 0.5,
        borderBottomColor: 'gray'
    },
    bgImg: {
        position: 'absolute',
        zIndex: -1,
        resizeMode: 'cover',
        opacity: 0.3
    },
})