import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/Ionicons'
import { Colors } from '../constants/colors'
import { TouchableOpacity } from 'react-native-gesture-handler'

const HeaderComponent = ({ navigation, title }) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity
                onPress={() => { navigation.goBack() }}
            >
                <Icon
                    name='arrow-back-outline'
                    size={25}
                    color={Colors.BLACK}
                />
            </TouchableOpacity>
            <Text style={styles.title}>{title}</Text>
            <Text></Text>
        </View>
    )
}

export default HeaderComponent

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    title: {
        color: Colors.BLACK,
        fontSize: 20
    }
})