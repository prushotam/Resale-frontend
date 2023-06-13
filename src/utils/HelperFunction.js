export const getToken = () => {
    return sessionStorage.getItem('token');
    }
    export const removeToken = () => {
    sessionStorage.removeItem('token');
    }
    export const setToken = (val) => {
    sessionStorage.setItem('token', val);
    }