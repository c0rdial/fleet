import axios from "axios";
import router from "../router";

// create a new axios instance
const api = axios.create({
  baseURL: import.meta.env.VITE_APP_API_ADDRESS,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// intercept the request
api.interceptors.request.use(
  (config) => {
    // do something before request is sent
    const token = localStorage.getItem("token");

    if (token) {
      // let newToken = token.auth.auth.accessToken; 
      config.headers["Authorization"] = `Bearer ${token}`;
      config.headers["x-access-token"] = token;
    }else{

    }
    return config;
    
  },
  (error) => {
    // do something with request error
    console.log(error, "error");
    return Promise.reject(error);
  }
);

// intercept the response
api.interceptors.response.use(
  (response) => {
    // do something with response data
    return response;
  },
  (error) => {
    // do something with response error using switch statement
    console.log(error, "error");
    switch (error.response.status) {
      case 401:
        router.replace("/auth/login");
        break;
      case 403:
        router.replace("/auth/login");
        break;
      default:
        break;
    }
    
    return Promise.reject(error);
  }
);

export default api;
