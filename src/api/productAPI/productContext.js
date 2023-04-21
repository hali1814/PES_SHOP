import {
    getStore,
    getALlGenres,
    upload,
    addProduct,
    getProductDetail,
    addStock,
    getBill
} from "./productService";

import React, { createContext, useState, useEffect } from "react";
export const ProductContext = createContext()

export const ProductContextProvider = (props) => {
    const { children } = props
    const [isLoading, setIsLoading] = useState(false)
    const [genreLoading, setGenreLoading] = useState(false)
    const [genres, setGenres] = useState([])
    const [detail, setDetail] = useState([])
    const [detailLoading, setDetailLoading] = useState(false)
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

    const onGetProductDetail = async _id => {
        setDetailLoading(true)
        try {
            const res = await getProductDetail(_id)
            if (res.status === 'success') {
                setDetailLoading(false)
                return res.data
            }
        } catch (error) {
            console.log('onGetProductDetail error: ' + error.toString())
            throw error.toString()
        }

    }

    const onAddStock = async (idProduct, size, color, stock, price) => {
        try {
            const res = await addStock(idProduct, size, color, stock, price)
            if (res.status === 'success') {
                console.log(res.data)
                return true
            } return false
        } catch (error) {
            console.log('onAddStock error', error.toString())
            throw error.toString()
        }
    }

    const onGetBill = async (status) => {
        try {
            const res = await getBill(status)
            if (res.status == 'success') {
                return res.data
            } else {
                console.log('lỗi')
            }
        } catch (error) {
            console.log('onGetBill error', error.toString())
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
                setImageUpload,
                onGetProductDetail,
                setDetailLoading,
                detailLoading,
                detail,
                setDetail,
                onAddStock,
                onGetBill
            }}
        >
            {children}
        </ProductContext.Provider>
    )

}