<template>
  <v-card>
    <v-card-title class="custom-search-field">
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Pesquisar"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table
      class="custom-table"
      :headers="headers"
      :items="movimentos"
      :search="search"
      hide-default-footer
      @click:row="handleClick"
    ></v-data-table>
  </v-card>
</template>

<script>
const axios = require("axios");

export default {
  name: "Movimentos",
  data() {
    return {
      search: "",
      headers: [
        { text: "Movimento", value: "movimento", align: "center" },
        { text: "Categoria", value: "categoria" },
        { text: "Valor (R$)", value: "valor" },
        { text: "Data", value: "data", align: "center" },
      ],
      movimentos: [],
    };
  },
  mounted() {
    axios
      .get("http://localhost:8081/buscar")
      .then((response) => (this.movimentos = response.data));
  },
  methods: {
    handleClick(value) {
      console.log("value: ", value);
    },
  },
};
</script>

<style scoped>
.custom-table {
  font-family: Arial, Helvetica, sans-serif !important;
  cursor: pointer !important;
}
.custom-table > td {
  text-align: end !important;
}
.custom-search-field {
  width: 30% !important;
  font-family: Arial, Helvetica, sans-serif !important;
}
</style>
