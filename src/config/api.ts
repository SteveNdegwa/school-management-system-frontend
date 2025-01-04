import axios from "axios";
import { useNavigate } from "react-router-dom";
import { store } from "../store";

const api = axios.create({
    // withCredentials: true,
    baseURL: "http://localhost:8000"
})

api.interceptors.request.use(
    (config) => {
        const state = store.getState();
        let request_data = config.data
        request_data = {...request_data, token: state.token}
        config.data = request_data

        return config;
    }, 
    async (error) =>{
        return Promise.reject(error);
  });

api.interceptors.response.use(
    (response) => {
        if (response.data.code == "888.888.888"){
            const navigate = useNavigate();
            navigate("/login");
        }
        return response
    },
    async (error) =>{
        return Promise.reject(error);
    }
)

export default api;