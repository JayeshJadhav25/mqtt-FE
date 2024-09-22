// src/axiosInterceptor.js
import axios from 'axios';

// Create an instance of Axios
const axiosInstance = axios.create({
    baseURL: `${process.env.REACT_APP_API_AUTH_URL}`, // Replace with your API base URL
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request Interceptor
axiosInstance.interceptors.request.use(
    (config) => {
        // Attach token or any custom header logic before sending request
        const token = localStorage.getItem('accessToken');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        // Handle error in request
        return Promise.reject(error);
    }
);

// Response Interceptor
axiosInstance.interceptors.response.use(
    (response) => {
        // You can modify the response data here
        return response;
    },
    (error) => {
        // Handle response errors (e.g., 401 Unauthorized)
        if (error.response && error.response.status === 401) {
            // Optionally handle token refresh or logout logic
            console.log('Unauthorized, redirecting to login...');
            // window.location.href = '/login';  // or any other logic you prefer
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
