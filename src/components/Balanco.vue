<template>
  <div class="container">
    <div class="box">
      <v-row>
        <v-col class="box">
          <v-row>
            <v-col class="text-center">
              <i class="fa fa-user-plus"></i>
              <i class="fa fa-money-bill-wave"></i>
              <label style="font-size: 40px"><b>Receitas</b></label>
            </v-col>
            <v-col class="text-end">
              <div
                v-for="receita of receitas"
                :key="receita"
                style="margin-bottom: 5px"
              >
                <label>+ {{ receita | currency }}</label>
              </div>
              <label class="label-green"
                ><i class="fa fa-calculator"></i
                >{{ totalReceitas | currency }}</label
              >
            </v-col>
          </v-row>
        </v-col>
        <v-col class="box text-end">
          <v-row>
            <v-col class="text-center">
              <i class="fa fa-user-minus"></i>
              <i class="fa fa-money-bill-wave"></i>
              <label style="font-size: 40px"><b>Despesas</b></label>
            </v-col>
            <v-col class="text-end">
              <div
                v-for="despesa of despesas"
                :key="despesa"
                style="margin-bottom: 5px"
              >
                <label>+ {{ despesa | currency }}</label>
              </div>
              <label class="label-red"
                ><i class="fa fa-calculator"></i
                >{{ totalDespesas | currency }}</label
              >
            </v-col>
          </v-row>
        </v-col>
        <v-col class="box text-end">
          <v-row>
            <v-col class="text-center" style="padding-top: 5%">
              <i v-if="hasPositiveSaldo()" class="fa fa-smile-beam"></i>
              <i v-else class="fa fa-frown"></i>
              <label style="font-size: 40px"><b>Saldo</b></label>
            </v-col>
            <v-col>
              <div style="display: grid">
                <label> {{ totalReceitas | currency }}</label>
                <label>- {{ totalDespesas | currency }}</label>
                <label v-if="hasPositiveSaldo()" class="label-green">
                  <i class="fa fa-calculator"></i>{{ saldo | currency }}
                </label>
                <label v-else class="label-red">
                  <i class="fa fa-calculator"></i>{{ saldo | currency }}
                </label>
              </div>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
const axios = require("axios");

export default {
  name: "Balanco",
  data() {
    return {
      despesas: [],
      receitas: [],
      totalDespesas: null,
      totalReceitas: null,
      saldo: null,
    };
  },
  mounted() {
    this.getBalancoFinanceiro();
  },
  methods: {
    getBalancoFinanceiro() {
      axios.get("http://localhost:8081/balanco-financeiro").then((response) => {
        this.despesas = response.data.despesas;
        this.receitas = response.data.receitas;
        this.totalReceitas = response.data.totalReceitas;
        this.totalDespesas = response.data.totalDespesas;
        this.saldo = response.data.saldo;
      });
    },
    hasPositiveSaldo() {
      return this.saldo > 0;
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

.text-center {
  text-align: center;
}

.text-end {
  text-align: end;
}

.label-green {
  color: green;
  border-top: 2px solid gray;
  padding-top: 5px;
  margin-top: 5px;
}

.label-red {
  color: red;
  border-top: 2px solid gray;
  padding-top: 5px;
  margin-top: 5px;
}

.fa {
  font-size: 18px;
  color: gray;
}

.fa-user-plus {
  color: green;
  font-size: 30px;
}
.fa-user-minus {
  color: red;
  font-size: 30px;
}
.fa-money-bill-wave {
  font-size: 40px;
  color: darkolivegreen;
}

.fa-smile-beam {
  font-size: 60px;
  color: green;
}
.fa-frown {
  font-size: 60px;
  color: red;
}
</style>
