<template>
  <div>
    <vue-excel-xlsx
      :data="items"
      :columns="columns"
      :file-name="'order-details'"
      :file-type="'xlsx'"
      :sheet-name="'sheetname'"
    >
      <v-icon right @click="selectedOpen = false">
        mdi-download
      </v-icon>Download order
    </vue-excel-xlsx>
  </div>
</template>

<script>
export default {
  name: "appTableDownload",
  props: ["items"],
  data: () => ({
    columns: [
      {
        label: "id",
        field: "id",
      },
      {
        label: "name",
        field: "name",
      },
      {
        label: "Price",
        field: "price",
      },
      {
        label: "Quantity",
        field: "quantity",
      },
    ],
  }),
};
</script>



