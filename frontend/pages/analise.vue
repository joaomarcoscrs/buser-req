<template>
  <lista_analise :reqs_analysis="reqs_analysis"></lista_analise>
</template>

<script>

import AppApi from '~apijs'
import lista_analise from '~/components/lista_analise.vue'

export default {
  components: {
    lista_analise
  },
  asyncData() {
    return AppApi.list_reqs_analysis().then(result => {
      return {
        reqs_analysis: result.data
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
