<template>
    <v-dialog width="40rem" v-model="show">
        <v-card class="border">
            <v-card-title class="text-blue-grey-darken-1 py-4">
                Alterar Usuário
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text>
                <v-col class="mx-auto">
                    <v-text-field class="input border rounded" label="Usuário de Domínio" v-model="user.username"
                        variant="solo" hide-details="false" required>
                    </v-text-field>
                </v-col>
                <v-col class="mx-auto">
                    <v-text-field class="input border rounded" label="Email" v-model="user.email" hide-details="false"
                        variant="solo" required>
                    </v-text-field>
                </v-col>
                <v-col class="mx-auto">
                    <v-select class="input border rounded" label="Conecta via AD" :items="['Sim', 'Não']"
                        v-model="user.user_ad" hide-details="false" variant="solo" required>
                    </v-select>
                </v-col>
                <v-col class="mx-auto">
                    <v-select class="input border rounded" label="Permitido" :items="['Sim', 'Não']"
                        v-model="user.permitted" hide-details="false" variant="solo" required>
                    </v-select>
                </v-col>
            </v-card-text>
            <v-card-actions class="px-9 py-3">
                <v-spacer></v-spacer>
                <v-btn class="float-right px-2" color="primary elevation-0 darken-1" dense rounded
                    @click.prevent="update()">Confirmar
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
import { mapActions, mapState } from "pinia";
import { useUserStore } from "@/store/UserStore";

export default {
    name: "UpdUser",
    components: {
        "alert": Alert
    },
    mounted() {

    },
    data() {
        return {
            info: { show: false, text: "" }
        };
    },
    methods: {
        ...mapActions(useUserStore, ["getUsers", "updUser"]),
        async update() {
            if (this.validation()) {
                const user = {
                    id: Number(this.user.id),
                    username: this.user.username,
                    user_ad: (this.user.user_ad == "Sim" ? true : false),
                    email: this.user.email,
                    permitted: (this.user.permitted == "Sim" ? true : false)
                }
                await this.updUser(user);
                await this.getUsers();
                this.show = false;
            } else {
                this.info = {
                    show: true,
                    text: "Falta informações para completar."
                }
            }
        },
        validation() {
            return this.user.username !== '' &&
                this.user.email !== '' &&
                this.user.permitted !== '' &&
                this.user.user_ad !== ''
        },
        exit() {
            this.show = false;
        },
    },
    props: ['modelShow'],
    emits: ['update:modelShow'],
    computed: {
        ...mapState(useUserStore, ["user"]),
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