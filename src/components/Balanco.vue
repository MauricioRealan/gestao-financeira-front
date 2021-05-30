<template>
  <label>Balanço Financeiro</label>
</template>

<script>

export default {
  name: "Balanco",
  data() {
    return {
      search: "",
      headers: [
        { text: "Movimento", value: "movimento", align: 'center' },
        { text: "Categoria", value: "categoria" },
        { text: "Valor (R$)", value: "valor" },
        { text: "Data", value: "data", align: 'center' },
        { text: "Ações", value: "carbs", sortable: false, filterable: false },
      ],
      movimentos: [],
    };
  },
};
</script>

<style scoped>
.custom-table {
  font-family: Arial, Helvetica, sans-serif !important;
}
.custom-table > td {
  text-align: end !important;
}
.custom-search-field {
  width: 30% !important;
  font-family: Arial, Helvetica, sans-serif !important;
}
</style>
