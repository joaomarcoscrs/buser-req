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
  asyncData() {
    return AppApi.list_statuses().then(statusResult => {
      return AppApi.list_reqs().then(reqsResult => {
        return {
          statuses: statusResult.data,
          reqs: reqsResult.data
          }
      })
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
