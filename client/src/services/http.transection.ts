import { IAddTransectionDataTypes } from "pages/dashboard/dashboard";
import httpPrivateService from "./httpPrivateServices";

class HttpTransection {
    async getTransections(frequency: string, type: string, config: any) {
        const { data } = await httpPrivateService.get(
            `/transections?frequency=${frequency}&&type=${type}`,
            config
        );
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

    async editTransection(payload: IAddTransectionDataTypes, id: string, config: any) {
        const { data } = await httpPrivateService.put(
            `/transections/editTransection/${id}`,
            payload,
            config
        );
        return data;
    }

    async deleteTransection(id: string, config: any) {
        const { data } = await httpPrivateService.delete(
            `/transections/deleteTransection/${id}`,
            config
        );
        return data;
    }
}

const httpTransectionService = new HttpTransection();

export default httpTransectionService;
