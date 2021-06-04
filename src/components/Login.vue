<template>
  <div class="container">
    <div class="box">
      <label><b>Login</b></label>
      <v-row>
        <v-col style="display: grid; margin-top: 20px">
          <label><i class="fa fa-user"></i>Usuário</label>
          <input
            type="text"
            placeholder="informe o seu usuário"
            v-model="user"
          />
          <label style="margin-top: 10px"
            ><i class="fa fa-lock"></i>Senha</label
          >
          <input
            type="password"
            placeholder="informe a sua senha"
            v-model="password"
          />
        </v-col>
      </v-row>
      <button class="btnSave" v-on:click="getUserLogin()">
        <i class="fa fa-sign-in-alt"></i>Entrar
      </button>
    </div>
  </div>
</template>

<script>
const axios = require("axios");

export default {
  name: "Login",
  data() {
    return {
      user: "",
      password: "",
      roles: [],
    };
  },
  props: {
    source: String,
  },
  mounted() {
    if (sessionStorage.getItem("user") !== null) {
      this.$router.push("/movimentacoes");
    }
  },
  methods: {
    getUserLogin() {
      axios
        .get(
          "http://localhost:3000/users?user=" +
            this.user +
            "&password=" +
            this.password
        )
        .then((response) => {
          console.log("user: ", response.data[0]);
          this.roles = response.data[0].roles;
          this.checkRoles();
        });
    },
    checkRoles() {
      this.roles.forEach((role) => {
        if (role === "gestao-financeira") {
          sessionStorage.setItem("user", this.user);
          this.$router.push("/movimentacoes");
        }
      });
    },
  },
};
</script>

<style>
.container {
  padding-top: 50px !important;
  padding-left: 20% !important;
  padding-right: 20% !important;
}
.box {
  padding: 30px;
  border: 2px solid gray;
  border-radius: 2px;
}

input {
  padding: 10px;
  border-radius: 2px;
  border: 2px solid #2c3e50;
  width: 60%;
  margin-top: 10px;
}

button {
  background-color: gray;
  color: white;
  padding: 15px;
  border-radius: 2px;
  margin-right: 10px;
}

button:hover {
  background-color: white;
  color: #2c3e50;
  border: 1px solid #2c3e50;
}
.btnSave {
  margin-top: 20px;
  background-color: #2c3e50;
}

.btnSave:hover {
  background-color: #2c3e50;
  color: white;
  border: 1px solid gray;
}
.fa-sign-in-alt {
  font-size: 18px;
}
</style>
