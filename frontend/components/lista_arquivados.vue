<template>
  <div class="caixa-archived">
    <div class="flexbox-archived">
        <reqcard class="margem-arquivados" v-for="req in reqs" :key="req.id" :req = req :status ="{name: 'arquivados'}"></reqcard>
    </div>
  </div>
</template>

<script>

import reqcard from '~/components/reqcard.vue'
export default {
    components: {
        reqcard
    },
    props: ['reqs']
}
</script>

<style scoped>
.flexbox-archived {
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-start;
  align-items: center;
  align-content: center;
}
.caixa-archived {
  display: flex;
  justify-content: center;
  overflow: auto;
  }
.margem-arquivados {
    margin: 5px;
    max-width: 280px;
}
</style>