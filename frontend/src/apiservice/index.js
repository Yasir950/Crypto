import axios from 'axios';
import { toast } from 'react-toastify';

const API = axios.create({
  baseURL:
    window.location.hostname === "localhost"
      ? "http://localhost:8080"
      : "http://localhost:8080",
});

export const userLogin = async (userData) => {
    try {
        let res = await API.post('/login', userData);
        let json = res.data;
        return json;
        
    } catch (error) {
       if (error.response && error.response.data && error.response.data.message) {
      toast.error(error.response.data.message); // e.g. "User not found"
    } else {
      // Fallback for network or unknown errors
      toast.error("Login failed, please try again.");
    }

    }
}
export const getData = async ( url) => {
    try {
        let res = await API.get(`/api/${url}`);
        let json = res.data;
        return json;
        
    } catch (error) {
       if (error.response && error.response.data && error.response.data.message) {
      toast.error(error.response.data.message); // e.g. "User not found"
    } else {
      // Fallback for network or unknown errors
      // toast.error("Login failed, please try again.");
    }

    }
}
export const saveData = async (userData, url) => {
    try {
        let res = await API.post(`/api/${url}`, userData);
        let json = res.data;
        return json;
        
    } catch (error) {
       if (error.response && error.response.data && error.response.data.message) {
      toast.error(error.response.data.message); // e.g. "User not found"
    } else {
      // Fallback for network or unknown errors
      // toast.error("Login failed, please try again.");
    }

    }
}
export const updateUser = async (userData, id) => {
    try {
        let res = await API.put(`/api/users/${id}`, userData);
        let json = res.data;
        return json;
        
    } catch (error) {
       if (error.response && error.response.data && error.response.data.message) {
      toast.error(error.response.data.message); // e.g. "User not found"
    } else {
      // Fallback for network or unknown errors
      // toast.error("Login failed, please try again.");
    }

    }
}

export const saveForm = async (userData) => {
    try {
        let res = await API.post('/api/submit-verification', userData);
        let json = res.data;
        return json;
        
    } catch (error) {
       if (error.response && error.response.data && error.response.data.message) {
      toast.error(error.response.data.message); // e.g. "User not found"
    } else {
      // Fallback for network or unknown errors
      // toast.error("Login failed, please try again.");
    }

    }
}
export const depositAmount = async (userData) => {
    try {
        let res = await API.post('/api/deposit', userData);
        let json = res.data;
        return json;
        
    } catch (error) {
       if (error.response && error.response.data && error.response.data.message) {
      toast.error(error.response.data.message); // e.g. "User not found"
    } else {
      // Fallback for network or unknown errors
      // toast.error("Login failed, please try again.");
    }

    }
}
export const getDataById = async (url,id) => {
    try {
        let res = await API.get(`/api/${url}/${id}`);
        let json = res.data;
        return json;
        
    } catch (error) {
       if (error.response && error.response.data && error.response.data.message) {
      toast.error(error.response.data.message); // e.g. "User not found"
    } else {
      // Fallback for network or unknown errors
      // toast.error("Login failed, please try again.");
    }

    }
}