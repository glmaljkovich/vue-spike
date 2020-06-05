<template lang="html">
  <div class="form-group">
    <label>{{label}}</label>
    <input
      :type="type"
      class="form-control"
      :class="{ 'is-invalid': validator.$error }"
      :value="value"
      @input="$emit('input', $event.target.value)"
      v-model.trim="validator.$model"
      @blur="validator.$touch()"
      required
      >
    <small v-if="validator && validator.$error" class="error">{{errorMessage}}</small>
    <small v-else class="form-text text-muted">{{hint}}</small>
  </div>
</template>

<script>
export default {
  name: "FormInput",
  props: ['value', 'hint', 'label', 'errorMessage', 'type', 'validator']
}
</script>

<style lang="css" scoped>
.error {
  color: red
}
</style>
