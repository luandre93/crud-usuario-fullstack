import axios from 'axios';
import { useSettingStore } from "@/store/SettingStore";

const store = useSettingStore();

export const API = axios.create({
    baseURL: `http://${store.URL}`,
    crossdomain: true,
})

const version = "api/v1"

export default {
    // Sessão Usuario.
    async postUser(user) {
        await API.post(`/${version}/user`, user)
    },
    async delUser(id) {
        await API.delete(`/${version}/user`, { params: { id: id } })
    },

    async updUser(user) {
        await API.put(`/${version}/user`, user).catch(t => console.log(t))
    },

    async getAllUsersAndGroup() {
        const result = await API.get(`/${version}/getAllUsersAndGroup`)
        return result.data;
    },
}