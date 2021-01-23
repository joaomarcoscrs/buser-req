<template>
<div>
    <div v-if="req.is_ghost" class="ghost-card">teste</div>
    <div v-if="!req.is_ghost">
        <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
                <v-card v-bind="attrs" v-on="on" class="margin-card rounded-task-card" elevation="4">
                    <v-card-title
                        class="headline titulo-tasks font-weight-regular"
                        v-text="req.title"
                        ></v-card-title>
                    <div class="flex-box-content-card">
                        <div class="flex-box-content-linha">
                        <div class="esquerda">
                            <template v-if="req.team == 'operações'">
                                <v-icon color="#49CB57" class="padding-dentro-card">mdi-account-group</v-icon>
                                <span class="texto-card-content padding-dentro-card" style="color: #49CB57">{{req.team}}</span>
                            </template>
                            <template v-else-if="req.team == 'tecnologia'">
                                <v-icon color="#49B4CB" class="padding-dentro-card">mdi-account-group</v-icon>
                                <span class="texto-card-content padding-dentro-card" style="color: #49B4CB">{{req.team}}</span>
                            </template>
                            <template v-else-if="req.team == 'marketing'">
                                <v-icon color="#FF7A00" class="padding-dentro-card">mdi-account-group</v-icon>
                                <span class="texto-card-content padding-dentro-card" style="color: #FF7A00">{{req.team}}</span>
                            </template>
                            <template v-else-if="req.team == 'people'">
                                <v-icon color="#B80F74" class="padding-dentro-card">mdi-account-group</v-icon>
                                <span class="texto-card-content padding-dentro-card" style="color: #B80F74">{{req.team}}</span>
                            </template>
                            <template v-else>
                                <v-icon color="#5B5B5B" class="padding-dentro-card">mdi-account-group</v-icon>
                                <span class="texto-card-content padding-dentro-card" style="color: #5B5B5B">todos</span>
                            </template>
                        </div>
                            <div class="direita">
                                <template v-if="req.priority == 0">
                                    <v-icon  color="#E03B24" class="padding-dentro-card">mdi-flag-variant</v-icon>
                                    <span class="texto-card-content padding-dentro-card" style="color: #E03B24">prioridade {{req.priority}}</span>
                                </template>
                                <template v-else-if="req.priority == 1">
                                    <v-icon  color="#F16500" class="padding-dentro-card">mdi-flag-variant</v-icon>
                                    <span class="texto-card-content padding-dentro-card" style="color: #F16500">prioridade {{req.priority}}</span>
                                </template>
                                <template v-else-if="req.priority == 2">
                                    <v-icon  color="#FDCB01" class="padding-dentro-card">mdi-flag-variant</v-icon>
                                    <span class="texto-card-content padding-dentro-card" style="color: #FDCB01">prioridade {{req.priority}}</span>
                                </template>
                                <template v-else-if="req.priority == 3">
                                    <v-icon  color="#57D71B" class="padding-dentro-card">mdi-flag-variant</v-icon>
                                    <span class="texto-card-content padding-dentro-card" style="color: #57D71B">prioridade {{req.priority}}</span>
                                </template>
                                <template v-else>
                                    <v-icon  color="#DCDCDC" class="padding-dentro-card">mdi-flag-variant</v-icon>
                                    <span class="texto-card-content padding-dentro-card" style="color: #DCDCDC">prioridade -</span>
                                </template>
                            </div>
                        </div>
                        <div class="flex-box-content-linha">
                            <div class="esquerda">
                                <template v-if="req.category == 'compra'">
                                    <v-icon  color="#FF3677" class="padding-dentro-card">mdi-cart</v-icon>
                                </template>
                                <template v-if="req.category == 'obra'">
                                    <v-icon  color="#FF3677" class="padding-dentro-card">mdi-account-hard-hat</v-icon>
                                </template>
                                <template v-if="req.category == 'manutenção'">
                                    <v-icon  color="#FF3677" class="padding-dentro-card">mdi-hammer-wrench</v-icon>
                                </template>
                                <span class="texto-card-content padding-dentro-card" style="color: #FF3677">{{req.category}}</span>
                            </div>
                            <div class="container-link">
                                <div class="direita">
                                    <template v-if="req.link !== null">
                                        <v-icon color="#367CDD" class="padding-dentro-card">mdi-open-in-new</v-icon>
                                        <span class="texto-card-content padding-dentro-card" style="color: #367CDD">
                                        <a target="_blank" :href="req.link">link</a>
                                        </span>
                                    </template>
                                    <template v-else>
                                        <v-icon  color="#DCDCDC" class="padding-dentro-card">mdi-open-in-new</v-icon>
                                        <span class="texto-card-content padding-dentro-card" style="color: #DCDCDC">vazio</span>
                                    </template>
                                </div>
                                <v-btn icon class="padding-dentro-card tirar-margem-botao">
                                    <v-icon  v-if="req.archived" color="#FF3677" >mdi-archive-arrow-up</v-icon>
                                    <v-icon  v-else color="grey" >mdi-archive-arrow-down</v-icon>
                                </v-btn>
                            </div>
                        </div>
                    </div>
                </v-card>
            </template>
        <span>{{req.description}}</span>
        </v-tooltip>
    </div>
    </div>
</template>

<script>
export default {
      props: ['req', 'status'],
}
</script>

<style scoped>
   .tirar-margem-botao {
     margin: 0px;
     margin-right:10px;
   }
   .rounded-task-card{ 
   border-radius:10px;
   }
   .margin-card {
   color: #ffffff;
   }
   .flex-box-barra {
   justify-content: center;
   }
   .titulo-tasks {
   color: #5B5B5B;
   font-size: 18px !important;
   padding: 10px;
   margin-left: 15px;
   overflow:auto;
   height: 60px;
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
   width: 280px;
   }
   .texto-card-content {
   font-size: 14px;
   }
   .esquerda {
   display: flex;
   margin-left: 10px;
   margin-bottom: 10px;
   align-items: center;
   justify-content: start;
   width: 50%;
   }
   .direita {
   display: flex;
   margin-right: 10px;
   margin-bottom: 10px;
   justify-content: start;
   align-items: center;
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
   align-items: flex-start;
   }
   .boards-todos {
   margin: 10px;
   min-width: 360px;
   }
   .overflow {
   overflow: auto;
   display: flex;
   position: relative;
   flex-shrink: 0;
   margin-right: 10px;
   margin-left: 10px;
   }
   .ghost-card {
       min-height: 10px;
       height:10px;
       content: '.';
       visibility: hidden;
   }
</style>