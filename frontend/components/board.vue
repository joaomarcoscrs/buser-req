<template>
   <div class="overflow">
      <v-card v-for="status in statuses" :key=status.id
         width="400"
         class="rounded-card boards-todos"
         color="#ECECEC"
         elevation="3"
         >
         <v-system-bar class="flex-box-barra"
            :color="status.color"
            height="50"
            >
            <span>
               <h1 class="font-weight-regular texto-board">{{status.name}}</h1>
            </span>
         </v-system-bar>
         <v-container class="overflow" style="height: 750px">
            <v-row dense>
               <v-col
                  v-for="req in reqs"
                  :key="req.id"
                  cols="12"
                  >
                  <div v-if="req.status == status.name">
                     <v-tooltip bottom>
                        <template v-slot:activator="{ on, attrs }">
                           <v-card v-bind="attrs" v-on="on" class="margin-card rounded-task-card" elevation="2">
                              <v-card-title
                                 class="headline titulo-tasks font-weight-regular"
                                 v-text="req.title"
                                 ></v-card-title>
                              <div class="flex-box-content-card">
                                 <div class="flex-box-content-linha">
                                    <div class="esquerda">
                                       <v-icon medium :color="req.team_color" class="padding-dentro-card">mdi-account-group</v-icon>
                                       <span class="texto-card-content padding-dentro-card" :style="{color: req.team_color}">{{req.team}}</span>
                                    </div>
                                    <div class="direita">
                                       <v-icon medium :color="req.priority_color" class="padding-dentro-card">mdi-flag-variant</v-icon>
                                       <span class="texto-card-content padding-dentro-card" :style="{color: req.priority_color}">prioridade {{req.priority}}</span>
                                    </div>
                                 </div>
                                 <div class="flex-box-content-linha">
                                    <div class="esquerda">
                                       <v-icon medium color="#D81B60" class="padding-dentro-card">mdi-cart</v-icon>
                                       <span class="texto-card-content padding-dentro-card" style="color: #D81B60">{{req.category}}</span>
                                    </div>
                                    <div class="container-link">
                                       <div class="direita">
                                          <v-icon v-if="req.link !== null" medium color="#367CDD" class="padding-dentro-card">mdi-open-in-new</v-icon>
                                          <v-icon v-if="req.link == null" medium color="#DCDCDC" class="padding-dentro-card">mdi-open-in-new</v-icon>
                                          <span v-if="req.link !== null" class="texto-card-content padding-dentro-card" style="color: #367CDD">
                                          <a target="_blank" :href="req.link">link</a>
                                          </span>
                                          <span v-if="req.link == null" class="texto-card-content padding-dentro-card" style="color: #DCDCDC">link</span>
                                       </div>
                                       <v-btn icon class="padding-dentro-card tirar-margem-botao">
                                        <v-icon medium color="grey" >mdi-archive-arrow-down</v-icon>
                                      </v-btn>
                                    </div>
                                 </div>
                              </div>
                           </v-card>
                        </template>
                        <span>{{req.description}}</span>
                     </v-tooltip>
                  </div>
               </v-col>
            </v-row>
         </v-container>
      </v-card>
   </div>
</template>

<script>
   export default {
      props: ['reqs', 'statuses'],
    }
</script>

<style>
   .tirar-margem-botao {
     margin: 0px;
   }
   .rounded-card{ 
   border-radius:20px;
   }
   .rounded-task-card{ 
   border-radius:10px;
   }
   .margin-card {
   margin: 5px;
   color: #ffffff;
   }
   .texto-board {
   text-align: center;
   font-size: 34px;
   color: #ffffff;
   }
   .flex-box-barra {
   justify-content: center;
   }
   .titulo-tasks {
   color: #5B5B5B;
   font-size: 20px !important;
   padding: 10px;
   margin-left: 15px;
   }
   .flex-box-content-card {
   display:flex;
   flex-flow: column wrap;
   justify-content: center;
   margin: 10px;
   }
   .flex-box-content-linha {
   display: flex;
   flex-flow: row no-wrap;
   flex-grow: 1;
   justify-content:space-between;
   width: 300px;
   }
   .texto-card-content {
   font-size: 17px;
   }
   .esquerda {
   display: flex;
   margin-left: 10px;
   margin-bottom: 10px;
   align-items: end;
   justify-content: start;
   width: 50%;
   }
   .direita {
   display: flex;
   margin-right: 10px;
   margin-bottom: 10px;
   justify-content: start;
   align-items: end;
   width: 50%;
   }
   .padding-dentro-card {
   padding: 3px;
   }
   .container-link {
   display: flex;
   margin-right: 10px;
   margin-bottom: 10px;
   justify-content: space-between;
   width: 50%;
   align-items: end;
   }
   .boards-todos {
   margin: 7px;
   min-width: 400px;
   }
   .overflow {
   overflow: auto;
   display: flex;
   justify-content: start;
   flex-shrink: 0;
   margin-right: 10px;
   margin-left: 10px;
   }
</style>