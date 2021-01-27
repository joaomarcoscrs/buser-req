<template>
  <home :reqs="reqs"></home>
</template>

<script>

import home from '~/components/home.vue'
import AppApi from '~apijs'

export default {
  components: {
    home
  },
  asyncData() {
      return AppApi.list_reqs().then(reqsResult => {
        return {
          reqs: reqsResult.data
          }
      })
  },
  data () {
    return {
    }
  }
}
</script>

<style>
</style>
