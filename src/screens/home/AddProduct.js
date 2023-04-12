import { StyleSheet, Text, View, TextInput, TouchableOpacity, SafeAreaView, ScrollView, Image, FlatList } from 'react-native'
import React, { useState, useEffect, useContext } from 'react'
import { Colors } from '../../constants/colors'
import Ionicon from 'react-native-vector-icons/Ionicons'
import { Picker } from '@react-native-picker/picker'
import { ProductContext } from '../../api/productAPI/productContext'
import ImagePicker from 'react-native-image-crop-picker'

const AddProduct = () => {
    const { onGetAllGenres } = useContext(ProductContext)
    useEffect(() => {
        // onGetAllGenres()
    }, [])
    const categories = ['Áo', 'Quần', 'jacket']
    const sizes = ['s', 'l', 'xl']
    const colors = ['trắng', 'đen', 'tím']
    const [selectedCategory, setSelectedCategory] = useState(categories[0]);
    const [selectedSize, setSelectedSize] = useState(sizes[0])
    const [selectedColor, setSelectedColor] = useState(colors[0])
    const [images, setImages] = useState([])

    const selectImage = async () => {
        try {
            const res = await ImagePicker.openPicker({
                mediaType: 'photo',
                multiple: true,
            })
            setImages([...images,
            res.map((image) => ({ uri: image.path, type: image.mime, name: 'image' }))
            ])
            console.log('link hinh ne : ', res)
            console.log('tong so luong hinh ne : ', images)
        } catch (error) {
            console.error('open image failed', error)
            throw error
        }
    }


    const renderItem = ({ item }) => {
        (
            <Image style={styles.img} source={{ uri: item.uri }} />
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            <Image style={styles.bgImg} source={require('../../assets/images/backgroundImage2.jpg')} />
            <TouchableOpacity
                onPress={selectImage}
                style={styles.addImageButton}
            >
                <Ionicon name='image-outline' size={30} color={Colors.WHITE} />
                <Text style={{ fontSize: 15, color: Colors.WHITE, fontWeight: '500' }}>Chọn ảnh</Text>
            </TouchableOpacity>
            <View style={{ height: 200 }}>
                {/* <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                    <Image style={styles.img} source={require('../../assets/images/Item.png')} />
                    <Image style={styles.img} source={require('../../assets/images/Item.png')} />
                    <Image style={styles.img} source={require('../../assets/images/Item.png')} />
                    <Image style={styles.img} source={require('../../assets/images/Item.png')} />
                </ScrollView> */}
                <FlatList
                    data={images}
                    renderItem={renderItem}
                    horizontal={true}
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
            <TouchableOpacity style={styles.button}>
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