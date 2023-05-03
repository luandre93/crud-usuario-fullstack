import { createPinia, setActivePinia, defineStore } from "pinia"
const pinia = createPinia();
setActivePinia(pinia);
export default pinia;

export const useApp = defineStore('App', {
    state: () => {
        return {
            title: ""
        }
    },
})
