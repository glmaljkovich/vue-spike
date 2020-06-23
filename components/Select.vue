<template>
<div class="form-group">
    <label class="bold">{{ label }}</label>
    <select class="form-control" name="" id="" :value="value" @change="$emit('select', $event.target.value)">
        <option :value="''" disabled>Selecciona una opción</option>
        <option v-for="option in options" :key="option" :value="option">{{option}}</option>
    </select>
  </div>
</template>

<script>
export default {
    name: "FormSelect",
    props: ["options", "value", "label"]
}
</script>

<style>
.bold {
    font-weight: bold;
    color: #666;
}
</style>