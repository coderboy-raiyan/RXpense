import { IAddTransectionDataTypes } from "pages/dashboard/dashboard";
import httpPrivateService from "./httpPrivateServices";

class HttpTransection {
    async getTransections(id: string, config: any) {
        const { data } = await httpPrivateService.get(`/transections/${id}`, config);
        return data;
    }

    async addTransection(payload: IAddTransectionDataTypes, config: any) {
        const { data } = await httpPrivateService.post(
            "/transections/addTransection",
            payload,
            config
        );
        return data;
    }
}

const httpTransectionService = new HttpTransection();

export default httpTransectionService;
