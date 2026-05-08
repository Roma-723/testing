import axios from "axios";


export const  axiosRequest=axios.create({
    baseURL:import.meta.env.VITE_MAIN_API
})
export const  axiosCards=axios.create({
    baseURL:import.meta.env.VITE_URL_API
})