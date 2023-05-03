import { defineStore } from 'pinia'
export const useSettingStore = defineStore('SettingStore', {
    state: () => ({
        URL: 'localhost:3000',
    })
})
