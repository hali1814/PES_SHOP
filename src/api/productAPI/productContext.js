import {
    getStore,
    getALlGenres,
    upload,
    addProduct
} from "./productService";

import React, { createContext, useState, useEffect } from "react";
export const ProductContext = createContext()

export const ProductContextProvider = (props) => {
    const { children } = props
    const [isLoading, setIsLoading] = useState(false)
    const [genreLoading, setGenreLoading] = useState(false)
    const [genres, setGenres] = useState([])
    const [imageUpload, setImageUpload] = useState([])

    useEffect(() => {
        console.log('imageUpload has changed', imageUpload)
    }, [imageUpload])
    useEffect(() => {
    }, [genres])

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
        setGenreLoading(true)
        try {
            const res = await getALlGenres()
            if (res.status == 'success') {
                setGenreLoading(false)
                setGenres(res.data.map(genre => ({ id: genre._id, label: genre.label })))
                console.log('context genres', genres)
                return genres
            } return false
        } catch (error) {
            console.log('onGetAllGenres error: ' + error)
            throw error
        }
    }

    const onUpload = async image => {

        try {
            const res = await upload(image)
            console.log('res onUpload', res)
            if (res.status == 'success') {
                console.log('onUpload success ==> ', res.data)
                setImageUpload(res.data)
                return imageUpload
            }
        } catch (error) {
            console.log('onUpload error: ' + error.toString())
            throw error
        }
        return null
    }

    const onAddProduct = async (type, name, images, stock, sale, description) => {
        try {
            const res = await addProduct(type, name, images, stock, sale, description)
            if (res.status == 'success') {
                return true
            } return false
        } catch (error) {
            console.log('onAddProduct error: ' + error.toString())
            throw error.toString()
        }
    }

    return (
        <ProductContext.Provider
            value={{
                onGetStore,
                isLoading,
                setIsLoading,
                onGetAllGenres,
                onUpload,
                genreLoading,
                setGenreLoading,
                genres,
                onAddProduct,
                imageUpload,
                setImageUpload
            }}
        >
            {children}
        </ProductContext.Provider>
    )

}