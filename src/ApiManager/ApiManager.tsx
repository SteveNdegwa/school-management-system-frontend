import ApiMethods from "./ApiMethods";
import ENDPOINTS from "./EndPoints";
import { store } from "../store";

class ApiManager {
    static storeState = store.getState();

    static login = (data: object) => {
        const url = ENDPOINTS.LOGIN();
        return ApiMethods.post(url, data);
    };

    static logout = (data: object) => {
        const url = ENDPOINTS.LOGOUT();
        return ApiMethods.post(url, data);
    };

    static verifyOTP = (data: object) => {
        const url = ENDPOINTS.VERIFY_OTP();
        return ApiMethods.post(url, data);
    };

    static forgotPassword = (data: object) => {
        const url = ENDPOINTS.FORGOT_PASSWORD();
        return ApiMethods.post(url, data);
    };

    static fetchProfile = (data: object) => {
        const url = ENDPOINTS.FETCH_PROFILE();
        return ApiMethods.post(url, data);
    };

    static filterUsers = (data: object = {}) => {
        const url = ENDPOINTS.FILTER_USERS();
        return ApiMethods.post(url, data);
    };
}

export default ApiManager;