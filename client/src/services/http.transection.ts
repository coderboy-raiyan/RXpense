import { IAddTransectionDataTypes } from "pages/dashboard/dashboard";
import httpServices from "./http.services";

class HttpTransection {
    async getTransections(id: string) {
        const { data } = await httpServices.get(`/transections/${id}`);
        return data;
    }

    async addTransection(payload: IAddTransectionDataTypes, config: any) {
        const { data } = await httpServices.post("/transections/addTransection", payload, config);
        return data;
    }
}

const httpTransectionService = new HttpTransection();

export default httpTransectionService;
