<template>
  <v-card elevation="0" class="h-full">
    <v-layout>
      <v-app-bar fixed class="elevation-0" density="compact" color="black">
        <v-app-bar-nav-icon @click.stop="state.drawer = !state.drawer"></v-app-bar-nav-icon>
        <v-toolbar-title>{{ title }}</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn variant="text" icon="mdi-logout"></v-btn>
      </v-app-bar>
      <v-navigation-drawer v-model="state.drawer" location="left" temporary elevation="0">
        <v-list>
          <v-list-group v-for="item in menuRouters(state.administrativoRouter)" :key="item.name" active-color="primary"
            density="compact">
            <template v-slot:activator="{ props }">
              <v-list-item v-bind="props" :prepend-icon="item.props.icon" :title="item.name"></v-list-item>
            </template>
            <v-list-item v-for="child in item.children" :key="child.$" :to="child.path" density="compact"
              :prepend-icon="child.props.icon" :title="child.name">
            </v-list-item>
          </v-list-group>
        </v-list>
      </v-navigation-drawer>
      <v-main class="full-width h-full">
        <RouterView />
      </v-main>
    </v-layout>
  </v-card>
</template>

<script>
import { reactive } from 'vue'
import { storeToRefs } from 'pinia'
import { useApp } from "@/store/index"
import adminRouter from '@/router/adminRouter'

const storeApp = useApp();

export default {
  setup() {
    const { title } = storeToRefs(storeApp);
    const state = reactive({
      drawer: false,
      active: true,
      administrativoRouter: adminRouter
    });
    return {
      title,
      state
    };
  },
  methods: {
    menuRouters(param) {
      return param;
    }
  },
}
</script>

<style scoped>
.h-full {
  height: 100vh;
  border-radius: 0;
  background-color: rgb(246 248 252);
}

.v-list-group__items .v-list-item {
  padding-inline-start: 15px !important;
}

.v-list-item-title {
  font-size: 10px;
}
</style>