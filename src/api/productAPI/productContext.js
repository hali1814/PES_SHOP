import {
    getStore,
    getALlGenres
} from "./productService";

import React, { createContext, useState } from "react";
export const ProductContext = createContext()

export const ProductContextProvider = (props) => {
    const { children } = props
    const [isLoading, setIsLoading] = useState(false)

    const onGetStore = async () => {
        setIsLoading(true)
        try {
            const res = await getStore()
            if (res.status == 'success') {
                setIsLoading(false)
                return res.data
            } return false
        } catch (error) {
            console.log('onGetStore error: ' + error)
            throw error
        }
    }

    const onGetAllGenres = async () => {
        try {
            const res = await getALlGenres()
            if (res.status == 'success') {
                console.log('onGetAllGenres success ==> ', res.data)
                return res.data
            } return false
        } catch (error) {
            console.log('onGetAllGenres error: ' + error)
            throw error
        }
    }

    return (
        <ProductContext.Provider
            value={{
                onGetStore,
                isLoading,
                setIsLoading,
                onGetAllGenres
            }}
        >
            {children}
        </ProductContext.Provider>
    )

}