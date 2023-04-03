import React, { useContext } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import AuthNavigator from './AuthNavigator'
import BottomTabNavigator from './BottomTabNavigator'
import { UserContext } from '../api/authAPI/UserContext'
import AppStackScreen from './BottomTabNavigator'

const Appnavigator = () => {

    const { isLoggined } = useContext(UserContext)

    return (
        <NavigationContainer>
            {
                isLoggined == false
                    ? <AuthNavigator />
                    : <AppStackScreen />
            }
        </NavigationContainer>
    )
}

export default Appnavigator