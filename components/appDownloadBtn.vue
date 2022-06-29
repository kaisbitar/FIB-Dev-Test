<template>
  <div>
    <vue-excel-xlsx
      :data="items"
      :columns="columns"
      :file-name="fileName"
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
  props: ["items", "columns", "fileName"],
  data: () => ({ }),
};
</script>



