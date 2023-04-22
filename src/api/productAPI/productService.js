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

export const addStock = async (idProduct, size, color, stock, price) => {
    const data = { idProduct: idProduct, size: size, color: color, stock: stock, price: price }
    const res = await customAxios().post('/api/pes_store/product/stock/add', data)
    return res
}

export const getBill = async (status) => {
    const res = await customAxios().get(`/api/pes_store/bills/${status}`)
    return res
}

export const toPayToShip = async (idBill, idCustomer) => {
    const data = { idBill: idBill, idCustomer: idCustomer }
    const res = await customAxios().post('/api/pes_store/bill/status/topPayToShip', data)
    return res
}

export const toShipToReceive = async (idBill, idCustomer) => {
    const data = { idBill: idBill, idCustomer: idCustomer }
    const res = await customAxios().post('/api/pes_store/bill/status/toShipToReceive', data)
    return res
}

export const toReceiveToCompleted = async (idBill, idCustomer) => {
    const data = { idBill: idBill, idCustomer: idCustomer }
    const res = await customAxios().post('/api/pes_store/bill/status/toReceiveToCompleted', data)
    return res
}

export const cancelBill = async (idBill, idCustomer, reason) => {
    const data = { idBill: idBill, idCustomer: idCustomer, reason: reason }
    const res = await customAxios().post('/api/pes_store/bill/status/cancel', data)
    return res
}