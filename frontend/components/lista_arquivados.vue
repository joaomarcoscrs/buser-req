<template>
  <div class="caixa-archived">
    <div class="flexbox-archived">
        <reqcard class="margem-arquivados" v-for="req in reqs_archived" :key="req.id" :req = req :status ="{name: 'arquivados'}"></reqcard>
    </div>
  </div>
</template>

<script>

import reqcard from '~/components/reqcard.vue'
export default {
    components: {
        reqcard
    },
  computed: {
    reqs_archived() {
      return this.$store.getters.reqs_archived
    }
  },
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
    min-width: 340px;
    max-width: 340px;
}
</style>