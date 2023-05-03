<template>
    <v-dialog width="40rem" v-model="show">
        <v-card class="border">
            <v-card-title class="text-blue-grey-darken-1 py-4">
                Adicionar Usuário
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text>
                <v-col class="mx-auto">
                    <v-text-field class="input border rounded" label="Usuário de Domínio" v-model="username" variant="solo"
                        hide-details="false" required>
                    </v-text-field>
                </v-col>
                <v-col class="mx-auto">
                    <v-text-field class="input border rounded" label="Email" v-model="email" hide-details="false"
                        variant="solo" required>
                    </v-text-field>
                </v-col>
                <v-col class="mx-auto">
                    <v-select class="input border rounded" label="Conecta via AD" :items="['Sim', 'Não']" v-model="user_ad"
                        hide-details="false" variant="solo" required>
                    </v-select>
                </v-col>
                <v-col class="mx-auto">
                    <v-select class="input border rounded" label="Permitido" :items="['Sim', 'Não']" v-model="permitted"
                        hide-details="false" variant="solo" required>
                    </v-select>
                </v-col>
            </v-card-text>
            <v-card-actions class="px-9 py-3">
                <v-spacer></v-spacer>
                <v-btn class="float-right px-2" color="primary elevation-0 darken-1" dense rounded
                    @click.prevent="toAdd()">Confirmar
                </v-btn>
                <v-btn class="float-right px-2" color="primary darken-1" dense rounded outlined
                    @click="exit()">Cancelar</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
    <alert :msg="info.text" v-model="info.show"></alert>
</template>
  
<script>
import Alert from "./Alert.vue"
import { mapActions } from "pinia";
import { useUserStore } from "@/store/UserStore";

export default {
    name: "AddUser",
    components: {
        "alert": Alert
    },
    data() {
        return {
            username: "",
            email: "",
            user_ad: "",
            permitted: "",
            info: { show: false, text: "" }
        };
    },
    methods: {
        ...mapActions(useUserStore, ["getUsers", "postUser"]),
        async toAdd() {
            if (this.validation()) {
                await this.postUser({
                    username: this.username,
                    email: this.email,
                    user_ad: this.user_ad === 'Sim',
                    permitted: this.permitted === 'Sim'
                });
                await this.getUsers();
                this.resetForm();
                this.show = false
            } else {
                this.info = {
                    show: true,
                    text: "Falta informações para completar."
                }
            }
        },
        validation() {
            return this.username !== '' &&
                this.email !== '' &&
                this.permitted !== '' &&
                this.user_ad !== ''
        },
        resetForm() {
            this.username = ''
            this.email = ''
            this.user_ad = ''
            this.permitted = ''
        },
        exit() {
            this.resetForm();
            this.show = false;
        },
    },
    props: ['modelShow'],
    emits: ['update:modelShow'],
    computed: {
        show: {
            get() {
                return this.modelShow;
            },
            set(value) {
                this.$emit('update:modelShow', value);
            }
        }
    }
};
</script>
  
<style scoped>
div:deep(.v-dialog) {
    border-radius: 15px !important;
}

.input :deep(.v-field--variant-solo) {
    box-shadow: none !important;
}

.v-card {
    border-radius: 15px !important;
}
</style>