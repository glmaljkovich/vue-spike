<template>
  <div class="form-group">
    <label class="bold">{{ label }}</label>
    <!-- <select class="form-control" name="" id="" :value="value" @change="$emit('select', $event.target.value)">
        <option :value="''" disabled>Selecciona una opción</option>
        <option v-for="option in options" :key="option[optionValueProperty || option]" :value="option[optionValueProperty || option]">{{option[optionTextProperty] || option}}</option>
    </select> -->
    <v-select
      :label="optionTextProperty"
      :value="value"
      :reduce="option => optionValueProperty ? option[optionValueProperty] : option"
      :options="options"
      @input="setSelected"
      @search:focus="$emit('search:focus')"
    />
  </div>
</template>

<script>
import 'vue-select/dist/vue-select.css'

export default {
  name: 'FormSelect',
  props: ['options', 'value', 'label', 'optionTextProperty', 'optionValueProperty'],
  methods: {
    setSelected (option) {
      this.$emit('select', option)
    }
  }
}
</script>

<style>
.bold {
    font-weight: bold;
    color: #666;
}
</style>
