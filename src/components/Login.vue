<template>
  <div class="container">
    <div class="box">
      <label><b>Login</b></label>
      <v-row>
        <v-col class="grid base-top-twenty">
          <label><i class="fa fa-user"></i>Usuário</label>
          <input
            type="text"
            placeholder="informe o seu usuário"
            v-model="user"
          />
          <label class="base-top-ten"><i class="fa fa-lock"></i>Senha</label>
          <input
            type="password"
            placeholder="informe a sua senha"
            v-model="password"
          />
        </v-col>
        <label v-if="!hasRole" style="color: red">login inválido!</label>
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
      hasRole: true,
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
          this.roles = response.data[0].roles;
          if (this.roles !== undefined) {
            this.checkRoles();
          } else {
            this.hasRole = false;
          }
        });
    },
    checkRoles() {
      this.roles.forEach((role) => {
        if (role === "gestao-financeira") {
          sessionStorage.setItem("user", this.user);
          this.hasRole = true;
          this.$router.push("/movimentacoes");
        } else {
          this.hasRole = false;
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

.base-top-ten {
  margin-top: 10px;
}

.base-top-twenty {
  margin-top: 20px;
}

.grid {
  display: grid;
}
</style>
