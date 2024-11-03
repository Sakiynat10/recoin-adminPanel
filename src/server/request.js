import axios from "axios";
import { ENDPOINT, TOKEN } from "../constants";
import Cookies from "js-cookie";


const request = axios.create({
    baseURL:ENDPOINT,
    timeout:10000,
})

request.interceptors.response.use(response => response, (error) => {
   alert(error?.response?.data);
   return Promise.reject(error)
})

export default request;