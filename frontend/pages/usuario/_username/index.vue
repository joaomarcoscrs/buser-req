<template>
    <div class="centralizar">
        <v-card class="card-usuario" color="#D1D1D1">
            <h1 class="padding-infos-card-usuario">Esta é a página que edita as informações do usuário {{username}}</h1>
        </v-card>
    </div>
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
.centralizar {
    display: flex;
    justify-content: center;
    align-items: center;
    align-content: center;
    position: relative;
}
.card-usuario {
    height: 600px;
    width: 400px;
}
.padding-infos-card-usuario {
    margin: 10px;
}
</style>
