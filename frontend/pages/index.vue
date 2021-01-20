<template>
  <home :reqs="reqs" :statuses="statuses"></home>
</template>

<script>

import home from '~/components/home.vue'
import AppApi from '~apijs'

export default {
  components: {
    home
  },
  data () {
    return {
      reqs: [],
      statuses: []
    }
  },
  mounted() {
    const self = this
    AppApi.list_reqs().then(function(result){
      self.reqs = result.data
    })
    AppApi.list_statuses().then(function(result){
      self.statuses = result.data
    })
  }
}
</script>

<style>
</style>
