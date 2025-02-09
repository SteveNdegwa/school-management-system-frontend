import axios from "axios";
import { store } from "../store";

const api = axios.create({
    baseURL: "http://localhost:8000",
})

api.interceptors.request.use(
    (config) => {
        const state = store.getState();
        config.data = {...config.data, token: state.token};
        return config;
    }, 
    async (error) =>{
        return Promise.reject(error);
  });

api.interceptors.response.use(
    (response) => {
        if (response.data.code == "888.888.888"){
            window.location.href = "/login";
        }
        return response;
    },
    async (error) =>{
        return Promise.reject(error);
    }
);

export default api;