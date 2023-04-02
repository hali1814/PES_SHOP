import customAxios from "../helper/Axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const Login = async (userName, password) => {
    const data = { userName: userName, password: password }
    const result = await customAxios().post('/api/pes_store/login', data)
    return result
}