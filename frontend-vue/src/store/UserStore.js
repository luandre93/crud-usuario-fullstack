import { defineStore } from 'pinia';
import API from "@/services/index";

export const useUserStore = defineStore('UserStore', {
    state: () => ({
        users: [],
        user: {},
    }),
    actions: {
        async getUsers() {
            try {
                this.users = await API.getAllUsersAndGroup();
            } catch (e) {
                console.log(e)
            }
        },
        async postUser(user) {
            try {
                await API.postUser(user);
            } catch (e) {
                console.log(e)
            }
        },
        async delUser(id) {
            try {
                await API.delUser(id);
            } catch (e) {
                console.log(e)
            }
        },
        async updUser(user) {
            try {
                await API.updUser(user);
            } catch (e) {
                console.log(e)
            }
        },
    }
});

