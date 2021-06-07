<template>
  <div id="app">
    <div id="nav">
      <router-link to="/movimentacoes"
        ><i class="fa fa-money-check-alt"></i>Movimentações</router-link
      >
      <router-link to="/novo-lancamento"
        ><i class="fa fa-plus-square"></i>Novo Lançamento</router-link
      >
      <router-link to="/balanco"
        ><i class="fa fa-balance-scale-left"></i>Balanço Financeiro</router-link
      >
      <label style="float: right">
        <i class="fa fa-user"></i>{{ user }}
        <i class="fa fa-sign-out-alt" v-on:click="logout()"></i>
      </label>
    </div>
    <router-view />
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: "",
    };
  },
  components: {},
  methods: {
    logout() {
      sessionStorage.removeItem("user");
      this.user = "";
      this.$router.push("/");
    },
  },
  mounted() {
    this.user = sessionStorage.getItem("user");
  },
};
</script>

<style></style>

<style lang="scss">
#app {
  font-family: Arial, Helvetica, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: white;
}

#nav {
  padding: 20px 0px;
  background-color: #2c3e50;
  color: white;
  border-bottom: 3px solid gray;

  a {
    font-weight: bold;
    color: white;
    text-decoration: none;
    padding-left: 30px;
    padding-right: 30px;

    &.router-link-exact-active {
      color: #2c3e50 !important;
      background-color: white;
      padding: 40px;
    }
  }
}

i {
  margin-right: 10px !important;
}

.fa-user,
.fa-money-check-alt,
.fa-plus-square,
.fa-balance-scale-left {
  font-size: 30px;
}

.fa-sign-out-alt {
  margin-left: 20px;
  cursor: pointer;
  font-size: 24px;
}
</style>
