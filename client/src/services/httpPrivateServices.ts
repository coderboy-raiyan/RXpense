import axios from "axios";

export const PrivateInstance = axios.create({
    baseURL: `${process.env.REACT_APP_SERVER_URL}/api/v1`,
    withCredentials: true,
});

class HttpPrivate {
    async get(url: string, config?: any) {
        const response = await PrivateInstance.get(url, config);
        return response;
    }

    async post(url: string, payload?: any, config?: any) {
        const response = await PrivateInstance.post(url, payload, config);
        return response;
    }

    async put(url: string, payload: any, config?: any) {
        const response = await PrivateInstance.put(url, payload, config);
        return response;
    }

    async delete(url: string, config?: any) {
        const response = await PrivateInstance.delete(url, config);
        return response;
    }
}

const httpPrivateService = new HttpPrivate();

export default httpPrivateService;
