<template>
    <div></div>
</template>>

<script lang="js">

export default {
  created () {
      if (!this.$auth.user) {
          this.$router.push('signup')
      } else if (!this.$auth.user.is_admin) {
          this.$router.push('myorders')
      } else {
          this.$router.push('admin')
      }
  }
}
</script>
