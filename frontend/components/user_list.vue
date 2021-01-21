<template>
  <v-card elevation="4" class="rounded-card">
    <v-list three-line>
      <v-divider class="margin-divider"></v-divider>

      <template v-for="user in users">
        <v-list-tile :key="user.id" class="flex-box-user" :to="{name: 'usuario-username', params: {username: user.username}}">
          <v-list-tile-avatar size="60" class="margin-avatar">
            <img :src="user.profile_picture">
          </v-list-tile-avatar>

          <v-list-tile-content class="box">
            <h1 class="nome"> {{user.first_name}} {{user.last_name}}</h1>
            <h1 class="username"> {{user.username}}</h1>
          </v-list-tile-content>

          <v-list-tile-content class="box">
            <h1 class="email">{{user.email}}</h1>
            <h1 class="team">{{user.team}} </h1>
          </v-list-tile-content>

          <v-list-tile-content class="box flex-linha">
            <v-icon large v-if="user.role == 'admin'" class="role margin-divider">mdi-shield-account</v-icon>
            <v-icon large v-if="user.role == 'viewer'" class="role margin-divider">mdi-eye</v-icon>
            <h1 class="role">{{user.role}}</h1>
          </v-list-tile-content>

        </v-list-tile>
        <v-divider :key="user.id" class="margin-divider"></v-divider>
      </template>

    </v-list>
  </v-card>
</template>

<script>
   export default {
      props: ['users'],
    }
</script>

<style scoped>
   .box{ 
   max-width: 37%;
   }
   .rounded-card{ 
   border-radius:20px;
   }
   .nome{ 
   font-size: 20px;
   font-weight: 400;
   color: #5B5B5B;
   }
   .email{ 
   font-size: 20px;
   font-weight: 300;
   color: #5B5B5B;
   }
   .username{ 
   font-size: 20px;
   font-weight: 400;
   color: #D81B60;
   }
   .team{ 
   font-size: 20px;
   font-weight: 300;
   color: #5B5B5B;
   }
   .role{ 
   font-size: 20px;
   font-weight: 300;
   color: #5B5B5B;
   }
   .flex-box-user {
    display: flex;
    flex-flow: column;
    justify-content: space-around;
   }
   .margin-avatar {
     margin-right: 15px;
     margin-top: 15px;
     margin-bottom: 15px;
   }
   .margin-divider {
     margin-left: 10px;
     margin-right: 10px;
   }
   .flex-linha {
     display:flex;
     flex-flow: row wrap;
     justify-content: start;
     align-items: center;
   }
</style>