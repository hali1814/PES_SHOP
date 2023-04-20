import customAxios from "../helper/Axios"

export const getStore = async () => {
    const res = await customAxios().get('/api/pes_store/get')
    return res
}

export const getALlGenres = async () => {
    const res = await customAxios().get('/api/pes_store/genres/all')
    return res
}

export const upload = async data => {
    const result = await customAxios('multipart/form-data').post(
        '/api/upLoadMany',
        data,
    );
    return result;
};

export const addProduct = async (type, name, images, stock, sale, description) => {
    const data = { type: type, name: name, images: images, stock: stock, sale: sale, description: description }
    const result = await customAxios().post('/api/pes_store/product/add', data)
    return result;
}

export const getProductDetail = async _id => {
    const res = await customAxios().get(`/api/pes_store/product/${_id}`)
    return res
}