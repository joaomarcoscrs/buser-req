<template>
  <lista_arquivados :reqs="reqs_archived"></lista_arquivados>
</template>

<script>

import AppApi from '~apijs'
import lista_arquivados from '~/components/lista_arquivados.vue'

export default {
  components: {
    lista_arquivados
  },
  asyncData() {
    return AppApi.list_archived_reqs().then(result => {
      return {
        reqs_archived: result.data
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
