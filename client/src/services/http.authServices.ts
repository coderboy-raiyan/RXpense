import { ILoginFromTypes } from "pages/login/login";
import { IRegistrationFromTypes } from "pages/register/register";
import httpServices from "./http.services";

class HttpAuth {
    async login(payload: ILoginFromTypes) {
        const { data } = await httpServices.post("/auth/login", payload);
        return data;
    }

    async signUp(payload: IRegistrationFromTypes) {
        const { data } = await httpServices.post("/auth/register", payload);
        return data;
    }
}

const httpAuthService = new HttpAuth();

export default httpAuthService;
