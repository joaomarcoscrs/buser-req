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
  asyncData() {
    return AppApi.list_users().then(result => {
      return {
        users: result.data
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
