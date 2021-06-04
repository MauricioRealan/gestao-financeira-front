<template>
  <div class="container">
    <div class="box">
      <v-card v-if="!isEditing">
        <v-card-title class="custom-search-field">
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Pesquisar"
            single-line
            outlined
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
      <div v-else>
        <v-row>
          <v-col>
            <label>Categoria: {{ movimento.categoria }}</label>
          </v-col>
          <v-col>
            <label>Valor: </label>
            <money v-model="movimento.valor" v-bind="money"></money>
          </v-col>
        </v-row>
        <div style="margin-top: 15px">
          <label>Descrição: </label>
          <textarea v-model="movimento.movimento"></textarea>
          <button class="btnSave" v-on:click="saveLancamento()">
            <i class="fa fa-check-circle"></i>Salvar
          </button>
          <v-snackbar v-model="snackbar">
            {{ message }}

            <template v-slot:action="{ attrs }">
              <v-btn color="blue" text v-bind="attrs" @click="snackbar = false">
                X
              </v-btn>
            </template>
          </v-snackbar>
          <button class="btnSave" v-on:click="deleteLancamento()">
            <i class="fas fa-trash"></i>Excluir
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const axios = require("axios");
import { Money } from "v-money";

export default {
  name: "Movimentos",
  data() {
    return {
      search: "",
      headers: [
        {
          text: "Descrição da movimentação",
          value: "movimento",
          class: "headers",
        },
        { text: "Categoria", value: "categoria", class: "headers" },
        { text: "Valor (R$)", value: "valor", class: "headers" },
        { text: "Data", value: "data", class: "headers" },
      ],
      money: {
        decimal: ",",
        thousands: ".",
        prefix: "R$ ",
        suffix: "",
        precision: 2,
        masked: false,
      },
      movimentos: [],
      movimento: null,
      isEditing: false,
      snackbar: false,
      message: "",
    };
  },
  mounted() {
    axios.get("http://localhost:8081/buscar").then((response) => {
      this.movimentos = response.data;
      this.formatValores();
    });
  },
  components: { Money },
  methods: {
    handleClick(value) {
      console.log("value: ", value);
      this.movimento = value;
      this.isEditing = true;
    },
    formatValores() {
      this.movimentos.forEach((movimento) => {
        movimento.valor = movimento.valor.toString().replace(".", ",");
      });
    },
    saveLancamento() {
      this.movimento.data = this.buildFormattedDate();
      axios
        .post("http://localhost:8081/salvar", this.movimento)
        .then((response) => {
          if (response.data !== null) {
            this.message = "Lançamento editado com sucesso!";
            this.snackbar = true;
            setTimeout(() => (this.isEditing = false), 3000);
          }
        });
    },
    deleteLancamento() {
      axios
        .post("http://localhost:8081/excluir/" + this.movimento.id)
        .then((response) => {
          this.movimentos = response.data;
          this.message = "Lançamento excluido com sucesso!";
          this.snackbar = true;
          setTimeout(() => (this.isEditing = false), 3000);
        });
    },
    buildFormattedDate() {
      let date = new Date().toISOString();
      date = date.split("T")[0].split("-");
      const formattedDate = date[2] + "/" + date[1] + "/" + date[0];
      return formattedDate;
    },
  },
};
</script>

<style>
.headers {
  background-color: #2c3e50;
  color: white !important;
  font-weight: bold;
  font-size: 16px !important;
  text-align: initial;
}
i {
  color: white !important;
  font-size: 18px;
}
.container {
  padding: 20px !important;
  padding-top: 30px !important;
}
.box {
  padding: 10px !important;
  border: 2px solid gray !important;
  border-radius: 2px !important;
}
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
textarea {
  border: 1px solid #2c3e50;
  border-radius: 2px;
  width: 100%;
  padding: 10px;
  resize: none;
  margin-top: 10px;
}
input {
  border-bottom: 1px solid #2c3e50 !important;
  margin-top: 10px !important;
  width: 100% !important;
}
input:focus {
  outline: none !important;
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
</style>
