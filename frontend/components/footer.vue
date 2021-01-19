<template>
  <v-card height="50px" color="#D81B60">
    <v-footer color="#D81B60" class="white--text">
      <span><img src="~/static/buser.png"></span>
      <h2 class="footer-txt font-weight-black">busercamp_</h2>
      <h2 class="footer-txt font-weight-thin">2021</h2>
      <v-spacer></v-spacer>
    </v-footer>
  </v-card>
</template>

<script>
  export default {
    props: ['state']
  }
</script>

<style scoped>
.footer-txt {
  padding-left: 3px;
  margin-top:10px;
}
img {
  max-height: 18px;
  width: auto;
  padding-left: 10px;
  padding-right: 5px;
  margin-top: 10px;
}
</style>