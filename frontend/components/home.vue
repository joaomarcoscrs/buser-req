<template>
  <board :reqs="reqs" :statuses="statuses"></board>
</template>

<script>

import board from '~/components/board.vue'

export default {
  props: ['reqs', 'statuses'],
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
