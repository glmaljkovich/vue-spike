<template>
  <h5><span :class="['badge', badgeColor]">{{ status }}</span></h5>
</template>

<script>
export default {
  name: 'StatusBadge',
  props: {
    status: String
  },
  computed: {
    badgeColor () {
      const colors = {
        PENDING: 'badge-secondary',
        ACCEPTED: 'badge-success',
        REJECTED: 'badge-danger'
      }
      return colors[this.status]
    }
  }
}
</script>

<style>

</style>
