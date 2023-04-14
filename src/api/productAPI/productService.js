import customAxios from "../helper/Axios"

export const getStore = async () => {
    const res = await customAxios().get('/api/pes_store/get')
    return res
}

export const getALlGenres = async () => {
    const res = await customAxios().get('/api/genres/all')
    return res
}

export const upload = async data => {
    console.log('dataaa', data)
    const result = await customAxios('multipart/form-data').post(
        '/api/upLoadMany',
        data,
    );
    return result;
};