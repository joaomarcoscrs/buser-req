<template>
  <no-ssr>
    <board></board>
  </no-ssr>
</template>

<script>

import board from '~/components/board.vue'

export default {
  components: {
    board
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
