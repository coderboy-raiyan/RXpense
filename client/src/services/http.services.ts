import axios from "axios";

const instance = axios.create({
    baseURL: `${process.env.REACT_APP_SERVER_URL}/api/v1`,
    withCredentials: true,
});

// instance.interceptors.request.use((config: any) => {
//     const token = localStorage.getItem("token");
//     config.headers.Authorization = token ? `Bearer ${token}` : "";
//     return config;
// });

class HttpServices {
    async get(url: string, config?: any) {
        const response = await instance.get(url, config);
        return response;
    }

    async post(url: string, payload?: any, config?: any) {
        const response = await instance.post(url, payload, config);
        return response;
    }

    async put(url: string, payload: any, config?: any) {
        const response = await instance.put(url, payload, config);
        return response;
    }

    async delete(url: string, config?: any) {
        const response = await instance.delete(url, config);
        return response;
    }
}

const httpServices = new HttpServices();

export default httpServices;
