<template>
  <div class="container">
    <div class="box">
      <div style="display: inline-grid; width: 100%">
        <div style="display: inline-grid">
          <label>Categoria</label>
          <div style="display: inline-flex; margin-top: 10px">
            <button><i class="fa fa-folder-minus"></i>Despesa</button>
            <button><i class="fa fa-folder-plus"></i>Receita</button>
          </div>
        </div>
        <div class="base-top">
          <label>Descrição</label>
          <textarea></textarea>
        </div>
        <div class="base-top" style="display: inline-grid">
          <label>Valor</label>
          <money v-model="price" v-bind="money"></money>
        </div>
      </div>
    </div>
    <button class="btn-save"><i class="fa fa-check-circle"></i>Salvar</button>
    <v-tooltip right>
      <template v-slot:activator="{ on, attrs }">
        <button class="btn-save" v-bind="attrs" v-on="on">
          <i class="fa fa-undo"></i>Desfazer
        </button>
      </template>
      <span>Top tooltip</span>
    </v-tooltip>
  </div>
</template>

<script>
import { Money } from "v-money";

export default {
  name: "NovoLancamento",
  data() {
    return {
      price: 0,
      money: {
        decimal: ",",
        thousands: ".",
        prefix: "R$ ",
        suffix: "",
        precision: 2,
        masked: false,
      },
    };
  },
  components: { Money },
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

.base-top {
  margin-top: 30px;
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
  background-color: white; /* Green */
  color: #2c3e50;
  border: 1px solid #2c3e50;
}

.btn-save {
  margin-top: 20px;
  background-color: #2c3e50;
}

.btn-save:hover {
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
</style>
