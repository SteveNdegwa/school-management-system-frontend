const ENDPOINTS = {
    LOGIN: () => '/identities/login/',
    LOGOUT: () => '/identities/logout/',
    VERIFY_OTP: () => '/identities/verify-otp/',
    FORGOT_PASSWORD: () => '/users/forgot-password/',
    FETCH_PROFILE: () => '/users/get-user/',
    FILTER_USERS: () => '/users/filter-users/',
};

export default ENDPOINTS;