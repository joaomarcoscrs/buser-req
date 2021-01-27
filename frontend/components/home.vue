<template>
  <no-ssr>
    <board :reqs="reqs"></board>
  </no-ssr>
</template>

<script>

import board from '~/components/board.vue'

export default {
  props: ['reqs'],
  components: {
    board
  },
  data () {
    return {

    }
  }
}
</script>

<style>
</style>
