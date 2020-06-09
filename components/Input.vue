<template lang="html">
  <div class="form-group">
    <label>{{ label }}</label>
    <input
      v-model.trim="validator && validator.$model"
      :type="type"
      class="form-control"
      :class="{ 'is-invalid': validator && validator.$error }"
      :value="value"
      required
      @input="$emit('input', $event.target.value)"
      @blur="() => validator && validator.$touch()"
    >
    <small v-if="validator && validator.$error" class="error">{{ errorMessage }}</small>
    <small v-else class="form-text text-muted">{{ hint }}</small>
  </div>
</template>

<script>

export default {
  name: 'FormInput',
  props: ['value', 'hint', 'label', 'errorMessage', 'type', 'validator']
}
</script>

<style lang="css" scoped>
.error {
  color: red
}
</style>
