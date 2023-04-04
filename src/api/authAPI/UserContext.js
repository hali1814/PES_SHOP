import {
    Login, register
} from './UserService'

import React, { useState, createContext } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

export const UserContext = createContext()

export const UserContextProvider = (props) => {
    const { children } = props
    const [isLoggined, setIsLoggined] = useState(false)
    const [registerMsg, setRegisterMsg] = useState('')
    const [loginMsg, setLoginMsg] = useState('')

    const onLogin = async (username, password) => {
        try {
            const res = await Login(username, password)
            if (res.status == 'success') {
                const token = res.data.token
                await AsyncStorage.setItem('token', token)
                setLoginMsg(res.data.title)
                setIsLoggined(true)
                return true
            } if (res.status == 'inactive') {
                setLoginMsg(res.data.message)
                console.log('msgggg', loginMsg)
                return loginMsg

            } if (res.status == 'failure') {
                setLoginMsg(res.data.message)
                return loginMsg
            }
            else {
                setIsLoggined(false)
                return false
            }
        } catch (error) {
            console.log('onLogin Error ===>', error)
            throw error
        }

    }

    const onRegister = async (userName, password, avatar, address, nameShop, email, description) => {
        try {
            const res = await register(userName, password, avatar, address, nameShop, email, description)
            if (res.status == 'success') {
                setRegisterMsg(res.data.message)
                return true
            } if (res.status == 'failure') {
                setRegisterMsg(res.data.message)
                return false
            }
            return false
        } catch (error) {
            console.log('onRegister Error ===>', error)
            throw error
        }
    }

    return (
        <UserContext.Provider
            value={{
                onLogin,
                isLoggined,
                setIsLoggined,
                onRegister,
                registerMsg,
                setRegisterMsg,
                loginMsg,
                setLoginMsg
            }}
        >
            {children}
        </UserContext.Provider>
    )
}