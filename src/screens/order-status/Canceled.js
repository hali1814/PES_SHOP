import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'

import React from 'react'

const Canceled = () => {
    return (
        <View style={styles.container}>
            <Image
                source={require('../../assets/images/backgroundImage2.jpg')}
                resizeMode='cover'
                style={{ width: '100%', height: '100%' }}
            />
        </View>
    )
}

export default Canceled

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
})