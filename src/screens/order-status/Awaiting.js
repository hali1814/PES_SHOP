import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'

const Awaiting = () => {
    return (
        <View style={styles.container}>
            <Image
                source={require('../../assets/images/backgroundImage.jpg')}
                resizeMode='cover'
                style={{ width: '100%', height: '100%' }}
            />
        </View>
    )
}

export default Awaiting

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
})