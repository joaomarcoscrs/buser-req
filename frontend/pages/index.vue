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
      reqs_board () {
        return this.$store.getters.reqs_board
      },
  data () {
    return {
    }
  }
}
}
</script>

<style>
</style>
