<template>
  <div class="container">
    <div class="box">
      <div class="inline-grid full-width">
        <div class="inline-grid">
          <label>Categoria</label>
          <div class="inline-flex base-top-ten">
            <button
              v-on:click="onCategoriaChange('Despesa')"
              v-bind:class="{ active: categoria === 'Despesa' }"
            >
              <i class="fa fa-folder-minus"></i>Despesa
            </button>
            <button
              v-on:click="onCategoriaChange('Receita')"
              v-bind:class="{ active: categoria === 'Receita' }"
            >
              <i class="fa fa-folder-plus"></i>Receita
            </button>
          </div>
        </div>
        <div class="base-top-thirty">
          <label>Descrição</label>
          <textarea v-model="movimento"></textarea>
        </div>
        <div class="base-top-thirty inline-grid">
          <label>Valor</label>
          <money v-model="valor" v-bind="money"></money>
        </div>
      </div>
    </div>
    <button
      :disabled="shouldDisableSave()"
      v-bind:class="[{ btnDisable: shouldDisableSave() }, 'btnSave']"
      v-on:click="saveNewLancamento()"
    >
      <i class="fa fa-check-circle"></i>Salvar
    </button>
    <v-snackbar v-model="snackbar">
      Lançamento realizado com sucesso!

      <template v-slot:action="{ attrs }">
        <v-btn color="blue" text v-bind="attrs" @click="snackbar = false">
          X
        </v-btn>
      </template>
    </v-snackbar>
    <button class="btnSave"><i class="fa fa-undo"></i>Desfazer</button>
  </div>
</template>

<script>
import { Money } from "v-money";
const axios = require("axios");

export default {
  name: "NovoLancamento",
  data() {
    return {
      categoria: null,
      valor: 0,
      movimento: "",
      money: {
        decimal: ",",
        thousands: ".",
        prefix: "R$ ",
        suffix: "",
        precision: 2,
        masked: false,
      },
      snackbar: false,
    };
  },
  mounted() {
    sessionStorage.removeItem("reload");
  },
  components: { Money },
  methods: {
    onCategoriaChange(categoria) {
      this.categoria = categoria;
    },
    shouldDisableSave() {
      return (
        this.categoria === null || this.valor === 0 || this.movimento === ""
      );
    },
    saveNewLancamento() {
      axios
        .post("http://localhost:8081/salvar", {
          id: null,
          categoria: this.categoria,
          data: this.buildFormattedDate(),
          valor: this.valor,
          movimento: this.movimento,
        })
        .then((response) => {
          if (response.data !== null) {
            this.snackbar = true;
            setTimeout(() => this.$router.push("/movimentacoes"), 3000);
          }
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

<style scoped>
.container {
  padding: 20px;
}

.box {
  padding: 10px;
  border: 2px solid gray;
  border-radius: 2px;
}

.base-top-thirty {
  margin-top: 30px;
}

.base-top-ten {
  margin-top: 10px;
}

label {
  font-family: Arial, Helvetica, sans-serif;
}

i {
  font-size: 18px;
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

.active {
  background-color: #2c3e50;
  color: white;
  border: 1px solid grey;
}

.btnDisable {
  background-color: silver !important;
  color: white;
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

textarea {
  border: 1px solid #2c3e50;
  border-radius: 2px;
  width: 100%;
  padding: 10px;
  resize: none;
  margin-top: 10px;
}

input {
  border-bottom: 1px solid #2c3e50;
  margin-top: 10px;
  width: 20%;
}

input:focus {
  outline: none;
}

.inline-grid {
  display: inline-grid;
}

.inline-flex {
  display: inline-flex;
}

.full-width {
  width: 100%;
}
</style>
