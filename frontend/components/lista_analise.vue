<template>
  <div class="caixa-de-fora">
    <div class="flexbox-analise">
        <card_analysis v-for="req in reqs" :key="req.id" :req = req></card_analysis>
    </div>
  </div>
</template>

<script>

import card_analysis from '~/components/card_analysis.vue'
export default {
    components: {
        card_analysis
    },
  computed: {
    reqs() {
      return this.$store.getters.reqs
    }
  },
}
</script>

<style scoped>
.flexbox-analise {
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-start;
  align-items: center;
  align-content: center;
}
.caixa-de-fora {
  display: flex;
  justify-content: center;
  overflow: auto;
  }
</style>