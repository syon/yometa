<template>
  <div class="attrcell">
    <div class="cell-label">
      {{ label }}
    </div>
    <div class="cell-val">
      {{ val }}
    </div>
  </div>
</template>

<script>
export default {
  props: ["label", "val"]
};
</script>

<style>
.attrcell .cell-label,
.attrcell .cell-val {
  padding: 3px 6px;
}
.attrcell .cell-label {
  /* background-color: pink; */
  color: gray;
}
.attrcell .cell-val {
  /* background-color: #eef; */
}
</style>
