import customAxios from "../helper/Axios"

export const getStore = async () => {
    const res = await customAxios().get('/api/pes_store/get')
    return res
}