import {
    getStore
} from "./productService";

import React, { createContext, useState } from "react";
export const ProductContext = createContext()

export const ProductContextProvider = (props) => {
    const { children } = props
    const [isLoading, setIsLoading] = useState(false)

    const onGetStore = async () => {
        try {
            const res = await getStore()
            if (res.status == 'success') {
                console.log('result', res)
                return res.data
            } return false
        } catch (error) {
            console.log('onGetStore error: ' + error)
            throw error
        }
    }

    return (
        <ProductContext.Provider
            value={{
                onGetStore,
            }}
        >
            {children}
        </ProductContext.Provider>
    )

}