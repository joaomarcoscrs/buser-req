<template>
  <user_list :users="users"></user_list>
</template>

<script>

import user_list from '~/components/user_list.vue'
import AppApi from '~apijs'

export default {
  components: {
    user_list
  },
  data () {
    return {
      users: []
    }
  },
  mounted() {
    const self = this
    AppApi.list_users().then(function(result){
      self.users = result.data
    })
  }
}
</script>

<style>
</style>
