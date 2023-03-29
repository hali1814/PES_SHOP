import { Image, StyleSheet, Text, View, Animated, Easing } from 'react-native';
import React, { useEffect, useRef } from 'react';
import { icons } from '../../assets';
import { Colors } from '../../constants/colors';
import { ROUTES } from '../../constants';

const AppLoading = ({ navigation }) => {
    const fadeAnim = useRef(new Animated.Value(0)).current;
    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 1500,
            useNativeDriver: true,
            easing: Easing.bounce
        }).start();
    }, [fadeAnim]);

    useEffect(() => {
        setTimeout(() => { navigation.navigate(ROUTES.HOME) }, 2000)
    }, [])


    return (
        <View
            style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: Colors.WHITE,
            }}>
            <Animated.View style={[{
                opacity: fadeAnim,
                transform: [{
                    translateY: fadeAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [1000, 0],
                    }),
                }],
            }]}>
                <Image source={icons.icon_LOGO} style={{ width: 150, height: 150 }} />
            </Animated.View>
            <Text style={{ color: Colors.MAIN, fontSize: 20, fontWeight: '600' }}>{'Play To Earn'}</Text>
        </View>
    );
};

export default AppLoading;

const styles = StyleSheet.create({});
