<template>
  <h1>Esta é a página que edita as informações do usuário {{username}}</h1>
</template>

<script>

export default {
    asyncData (context) {
        return {
            username: context.params.username
        }
    },
    data () {
        return {}
    }
}
</script>

<style>
</style>
