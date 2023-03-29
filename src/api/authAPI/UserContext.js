import {
    Login
} from './UserService'

import React, { useState, createContext } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

export const UserContext = createContext()

export const UserContextProvider = (props) => {
    const { children } = props
    const [isLoggined, setIsLoggined] = useState(false)

    const onLogin = async (username, password) => {
        try {
            const res = await Login(username, password)
            if (res.status == 'success') {
                const token = res.data.token
                await AsyncStorage.setItem('token', token)
                setIsLoggined(true)
                return true
            } else if (res.status == 'inactive') {
                return console.log('Message ===>', res.data.message)
            } else {
                setIsLoggined(false)
                return false
            }
        } catch (error) {
            console.log('onLogin Error ===>', error)
            throw error
        }

    }

    return (
        <UserContext.Provider
            value={{ onLogin, isLoggined, setIsLoggined }}
        >
            {children}
        </UserContext.Provider>
    )
}