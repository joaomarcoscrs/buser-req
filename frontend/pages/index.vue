<template>
  <home></home>
</template>

<script>

import home from '~/components/home.vue'

export default {
  components: {
    home
  },
  computed: {
    reqs() {
      return this.$store.getters.reqs
    }
  },
  data () {
    return {
    }
  }
}
</script>

<style>
</style>
