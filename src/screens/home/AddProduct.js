import { StyleSheet, Text, View, TextInput, TouchableOpacity, SafeAreaView, ScrollView, Image, FlatList, ActivityIndicator } from 'react-native'
import React, { useState, useEffect, useContext, useRef } from 'react'
import { Colors } from '../../constants/colors'
import Ionicon from 'react-native-vector-icons/Ionicons'
import { Picker } from '@react-native-picker/picker'
import { ProductContext } from '../../api/productAPI/productContext'
import ImagePicker from 'react-native-image-crop-picker'

const AddProduct = () => {
    const { onGetAllGenres, onUpload } = useContext(ProductContext)
    useEffect(() => {
        // onGetAllGenres()
    }, [])
    const categories = ['Áo', 'Quần', 'jacket']
    const sizes = ['s', 'l', 'xl']
    const colors = ['trắng', 'đen', 'tím']
    const [selectedCategory, setSelectedCategory] = useState(categories[0]);
    const [selectedSize, setSelectedSize] = useState(sizes[0])
    const [selectedColor, setSelectedColor] = useState(colors[0])
    const [imageLoading, setImageLoading] = useState(false)
    const [images, setImages] = useState([])
    const imagesRef = useRef()

    const [isLoading, setIsLoading] = useState(false);

    const selectImages = async () => {
        setImageLoading(true);
        try {
            const selectedImages = await ImagePicker.openPicker({
                multiple: true,
                mediaType: 'photo',
            });
            setImageLoading(false);
            console.log('hinh ban dau ', selectedImages)
            // const filename = selectedImages[0]?.path.substring(selectedImages[0]?.path.lastIndexOf("/") + 1);
            const newImages = selectedImages.map(image => ({
                uri: image.path,
                name: image.path.substring(image.path.lastIndexOf("/") + 1),
                type: image.mime,
            }));
            setImages(newImages);
            // console.log('cat chuoi ', filename)
        } catch (error) {
            console.error('open image failed', error);
            setImageLoading(false);
            throw error;
        }
    }

    useEffect(() => {
        console.log('hinh day ne : ', images);
    }, [images]);

    const uploadImages = async () => {
        try {
            const formData = new FormData();
            images.forEach((image, index) => {
                formData.append(`images`, image);
                console.log('images 0 ', images[0])
                formData.append(`images`,
                    images[0]
                );
            });
            const response = await onUpload(formData)
            console.log('resss', response);
        } catch (error) {
            console.log(error.toString());
        }
    };


    const renderItem = ({ item }) => {
        return (
            <Image style={styles.img} source={{ uri: item.uri }} />
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            <Image style={styles.bgImg} source={require('../../assets/images/backgroundImage2.jpg')} />
            <TouchableOpacity
                onPress={selectImages}
                style={styles.addImageButton}
            >
                <Ionicon name='image-outline' size={30} color={Colors.WHITE} />
                <Text style={{ fontSize: 15, color: Colors.WHITE, fontWeight: '500' }}>Chọn ảnh</Text>
            </TouchableOpacity>
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
                <Picker
                    selectedValue={selectedCategory}
                    onValueChange={(itemValue, itemIndex) => setSelectedCategory(itemValue)}
                    style={styles.picker}
                >
                    <Picker.Item label='loại sản phẩm' enabled={false} />
                    {categories.map((category, index) => (
                        <Picker.Item key={index} label={category} value={category} />
                    ))}
                </Picker>
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
                placeholder='Áo đẹp chưa kìa'
                style={styles.input}
            />
            <Text style={styles.title}>Mô tả : </Text>
            <TextInput
                placeholder='Áo này thật là đẹp bao la như nắng chiều ban mai sớm'
                style={styles.input}
                numberOfLines={2}
            />
            <TouchableOpacity
                onPress={uploadImages}
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