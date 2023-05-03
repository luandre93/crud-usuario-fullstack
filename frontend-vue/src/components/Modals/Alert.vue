<template>
    <div data-app>
        <v-dialog class="rounded-0" v-model="show" width="20em">
            <v-card>
                <v-card-title class="my-2 mx-2">
                    <v-icon icon="mdi-alert" style="" />
                    <label class="text--margin">Atenção</label>
                </v-card-title>
                <v-card-text class="text">
                    <label>{{ msg }}</label>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn dark color="primary" dense block rounded text @click="show = false">
                        OK
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>
<script>
export default {
    name: "Alert",
    props: ['modelValue', 'msg'],
    emits: ['update:modelValue', 'update:msg'],
    computed: {
        show: {
            get() {
                return this.modelValue
            },
            set(value) {
                this.$emit('update:modelValue', value)
            }
        },
        msg: {
            get() {
                return this.msg;
            },
            set(value) {
                this.$emit('update:msg', value)
            },
        }
    },
};
</script>

<style scoped>
.text--margin {
    margin-left: 10px !important;
}

.text {
    text-align: center;
    padding: 0.5em !important;
}


div:deep(.v-dialog) {
    border-radius: 15px !important;
}

.v-card {
    border-radius: 15px !important;
}
</style>