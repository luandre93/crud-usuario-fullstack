<template>
  <v-container class="max-width-1100">
    <v-col>
      <v-text-field class="input border rounded" variant="solo" placeholder="Procurar" v-model="search"
        hide-details="false"></v-text-field>
    </v-col>
    <v-col>
      <v-card class="card-personalizado border" elevation="0">
        <v-card-title class="py-1">
          <v-row class="align-center">
            <v-col>
              <h4 class="text-blue-grey-darken-1">Lista de Usuários</h4>
            </v-col>
            <v-col>
              <v-btn icon color="success" class="float-right" variant="solo" @click.stop="setShow('add')">
                <v-icon icon="mdi-plus"></v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <v-table dense class="styled-table" v-if="filterUsers.length">
            <thead>
              <tr>
                <th class="text-center">ID</th>
                <th class="text-center">Usuário AD</th>
                <th class="text-center">E-mail</th>
                <th class="text-center">Conecta via AD</th>
                <th class="text-center">Permitido</th>
                <th class="text-center">Grupo</th>
                <th class="text-center">Modificado</th>
                <th class="text-center">Criado</th>
                <th class="text-center px-0">Editar</th>
                <th class="text-center px-0 pr-2">Excluir</th>
              </tr>
            </thead>
            <tbody>
              <tr class="text-center" v-for="item in filterUsers" :key="item.id">
                <td> {{ item.User.id }}</td>
                <td><b> {{ item.User.username }}</b></td>
                <td>{{ item.User.email }} </td>
                <td>{{ item.User.user_ad ? "Sim" : "Não" }} </td>
                <td>{{ item.User.permitted ? "Sim" : "Não" }} </td>
                <td>{{ item.Group.group == "Usuario" ? "Usuário" : "Administrador" }} </td>
                <td>{{ formatDate(item.User.updatedAt) }} </td>
                <td>{{ formatDate(item.User.createdAt) }} </td>
                <td class="text-center px-0">
                  <v-btn icon color="blue" variant="solo" @click="editUser(item)">
                    <v-icon icon="mdi-account-edit"></v-icon>
                  </v-btn>
                </td>
                <td class="text-center px-0 pr-2">
                  <v-btn icon color="red" variant="solo" @click="deleteUser({ id: item.User.id })">
                    <v-icon icon="mdi-account-cancel"></v-icon>
                  </v-btn>
                </td>
              </tr>
            </tbody>
          </v-table>
          <div v-else class="text-center" v-text="result"></div>
        </v-card-text>
      </v-card>
    </v-col>
    <add-user v-model:model-show="show.add" />
    <upd-user v-model:model-show="show.upd" />
  </v-container>
</template>

<script>
import { mapActions, mapState } from "pinia";
import { useApp } from "@/store";
import { useUserStore } from "@/store/UserStore";
import AddUser from "@/components/Modals/AddUser.vue";
import UpdUser from "@/components/Modals/UpdUser.vue";
const storeApp = useApp();
const storeUser = useUserStore();

export default {
  name: "Usuarios",
  components: {
    "add-user": AddUser,
    "upd-user": UpdUser
  },
  data() {
    return {
      result: "Não existe usuários cadastrados, tente adicionar no botão.",
      search: "",
      show: { add: false, upd: false },
    }
  },
  mounted() {
    storeApp.title = "Gerenciamento de Usuarios";
    this.getUsers();
  },
  methods: {
    ...mapActions(useUserStore, ["getUsers", "delUser", "updUser"]),
    setShow(p) {
      this.show[{ "add": "add", "upd": "upd" }[p]] = true;
    },
    formatDate(string) {
      return string.split(' ')[0].split('-').reverse().join('/')
    },
    async deleteUser({ id }) {
      console.log(id)
      await this.delUser(id)
      await this.getUsers();
    },
    editUser(item) {
      storeUser.user = {
        id: item.User.id,
        username: item.User.username,
        email: item.User.email,
        user_ad: item.User.user_ad,
        permitted: item.User.permitted
      };
      this.setShow('upd');
    },

  },
  computed: {
    ...mapState(useUserStore, ["users"]),
    filterUsersPerDate() {
      return this.users.map((t) => t).sort((a, b) => b.User.updatedAt.localeCompare(a.User.updatedAt));
    },
    filterUsers() {
      if (!this.search) {
        return this.filterUsersPerDate;
      } else {
        const findUpper = this.search.toUpperCase();
        this.result = "Usuario não encontrado.";
        return this.filterUsersPerDate.filter((u) =>
          u.User.username.toUpperCase().includes(findUpper) ||
          u.User.email.toUpperCase().includes(findUpper) ||
          u.Group.group.toUpperCase().includes(findUpper)
        )
      }
    },
  }
}
</script> 

<style scoped>
.card-personalizado {
  border-radius: 10px !important;
}

.input :deep(.v-field--variant-solo) {
  box-shadow: none !important;
}

.max-width-1100 {
  max-width: 1100px !important;
}

.styled-table thead th {
  background-color: #fff !important;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}

.styled-table tbody tr {
  border-bottom: 1px solid #ece;
}

.styled-table tbody td {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  max-width: 200px;
  padding-left: 5px !important;
  padding-right: 5px !important;
}

.styled-table tbody tr:nth-of-type(even) {
  background-color: rgb(249, 249, 249);
}

html {
  overflow-y: auto !important;
}
</style>