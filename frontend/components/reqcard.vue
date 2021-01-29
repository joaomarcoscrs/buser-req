<template>
    <div>
        <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
                <v-card v-bind="attrs" v-on="on" class="margin-card rounded-task-card" elevation="4">
                    <v-card-title style="color: #5B5B5B" contenteditable v-text="req.title" @blur="onEdit($event,'title', req.id)"
                        class="headline titulo-tasks font-weight-regular"
                        ></v-card-title>
                    <div class="flex-box-content-card">
                        <div class="flex-box-content-linha">
                        <div class="esquerda">
                            <template v-if="req.team == 'operações'">
                                <v-icon color="#49CB57" class="padding-dentro-card">mdi-account-group</v-icon>
                                <span class="texto-card-content padding-dentro-card" style="color: #49CB57"></span><div style="color: #49CB57" contenteditable v-text="req.team" @blur="onEdit($event,'team', req.id)"></div>
                            </template>
                            <template v-else-if="req.team == 'tecnologia'">
                                <v-icon color="#49B4CB" class="padding-dentro-card">mdi-account-group</v-icon>
                                <span class="texto-card-content padding-dentro-card" style="color: #49B4CB"></span><div style="color: #49B4CB" contenteditable v-text="req.team" @blur="onEdit($event,'team', req.id)"></div>
                            </template>
                            <template v-else-if="req.team == 'marketing'">
                                <v-icon color="#FF7A00" class="padding-dentro-card">mdi-account-group</v-icon>
                                <span class="texto-card-content padding-dentro-card" style="color: #FF7A00"></span><div style="color: #FF7A00" contenteditable v-text="req.team" @blur="onEdit($event,'team', req.id)"></div>
                            </template>
                            <template v-else-if="req.team == 'people'">
                                <v-icon color="#B80F74" class="padding-dentro-card">mdi-account-group</v-icon>
                                <span class="texto-card-content padding-dentro-card" style="color: #B80F74"></span><div style="color: #B80F74" contenteditable v-text="req.team" @blur="onEdit($event,'team', req.id)"></div>
                            </template>
                            <template v-else-if="req.team == '-'">
                                <v-icon color="#DCDCDC" class="padding-dentro-card">mdi-account-group</v-icon>
                                <span class="texto-card-content padding-dentro-card" style="color: #DCDCDC"></span><div style="color: #DCDCDC" contenteditable v-text="req.team" @blur="onEdit($event,'team', req.id)"></div>
                            </template>
                            <template v-else>
                                <v-icon color="#5B5B5B" class="padding-dentro-card">mdi-account-group</v-icon>
                                <span class="texto-card-content padding-dentro-card" style="color: #5B5B5B"></span><div style="color: #5B5B5B" contenteditable v-text="req.team" @blur="onEdit($event,'team', req.id)"></div>
                            </template>
                        </div>
                            <div class="direita">
                                <template v-if="req.priority == 0">
                                    <v-icon  color="#E03B24" class="padding-dentro-card">mdi-flag-variant</v-icon>
                                    <span class="texto-card-content padding-dentro-card" style="color: #E03B24">prioridade</span><div style="color: #E03B24" contenteditable v-text="req.priority" @blur="onEdit($event,'priority', req.id)"></div>
                                </template>
                                <template v-else-if="req.priority == 1">
                                    <v-icon  color="#F16500" class="padding-dentro-card">mdi-flag-variant</v-icon>
                                    <span class="texto-card-content padding-dentro-card" style="color: #F16500">prioridade</span><div style="color: #F16500" contenteditable v-text="req.priority" @blur="onEdit($event,'priority', req.id)"></div>
                                </template>
                                <template v-else-if="req.priority == 2">
                                    <v-icon  color="#FDCB01" class="padding-dentro-card">mdi-flag-variant</v-icon>
                                    <span class="texto-card-content padding-dentro-card" style="color: #FDCB01">prioridade</span><div style="color: #FDCB01" contenteditable v-text="req.priority" @blur="onEdit($event,'priority', req.id)"></div>
                                </template>
                                <template v-else-if="req.priority == 3">
                                    <v-icon  color="#57D71B" class="padding-dentro-card">mdi-flag-variant</v-icon>
                                    <span class="texto-card-content padding-dentro-card" style="color: #57D71B">prioridade</span><div style="color: #57D71B" contenteditable v-text="req.priority" @blur="onEdit($event,'priority', req.id)"></div>
                                </template>
                                <template v-else>
                                    <v-icon  color="#DCDCDC" class="padding-dentro-card">mdi-flag-variant</v-icon>
                                    <span class="texto-card-content padding-dentro-card" style="color: #DCDCDC">prioridade</span><div style="color: #DCDCDC" contenteditable v-text="req.priority" @blur="onEdit($event,'priority', req.id)"></div>
                                </template>
                            </div>
                        </div>
                        <div class="flex-box-content-linha">
                            <div class="esquerda">
                                <template v-if="req.category == 'compra'">
                                    <v-icon  color="#FF3677" class="padding-dentro-card">mdi-cart</v-icon>
                                </template>
                                <template v-else-if="req.category == 'obra'">
                                    <v-icon  color="#FF3677" class="padding-dentro-card">mdi-account-hard-hat</v-icon>
                                </template>
                                <template v-else-if="req.category == 'manutenção'">
                                    <v-icon  color="#FF3677" class="padding-dentro-card">mdi-hammer-wrench</v-icon>
                                </template>
                                <template v-else>
                                    <v-icon  color="#FF3677" class="padding-dentro-card">mdi-new-box</v-icon>
                                </template>
                                <span class="texto-card-content padding-dentro-card" style="color: #FF3677"></span><div style="color: #FF3677" contenteditable v-text="req.category" @blur="onEdit($event,'category', req.id)"></div>
                            </div>
                            <div class="container-link">
                                <div class="direita">
                                    <template v-if="req.link !== '-'">
                                        <v-icon color="#367CDD" class="padding-dentro-card">mdi-open-in-new</v-icon>
                                        <span class="texto-card-content padding-dentro-card" style="color: #367CDD">
                                        <a target="_blank" :href="req.link">link</a>
                                        </span>
                                    </template>
                                    <template v-else>
                                        <v-icon  color="#DCDCDC" class="padding-dentro-card">mdi-open-in-new</v-icon>
                                        <span class="texto-card-content padding-dentro-card" style="color: #DCDCDC">-</span>
                                    </template>
                                </div>
      <v-btn
        v-if="!req.archived"
        icon
        style="margin: 0px 0px 10px 0px;"
        @click="archive(req.id, req.status)"
      >
        <v-icon color="#969696">mdi-delete</v-icon>
     </v-btn>
     <v-btn
        v-else
        icon
        style="margin: 0px 0px 10px 0px;"
        @click="unarchive(req.id, req.status)"
      >
        <v-icon color="#367CDD">mdi-delete-restore</v-icon>
      </v-btn>
                            </div>
                        </div>
                    </div>
                </v-card>
            </template>
        <span>{{req.description}}</span>
        </v-tooltip>
        </div>
</template>

<script>

export default {
      props: ['req'],
      data: () => ({
      direction: 'top',
      fab: false,
      fling: false,
      hover: true,
      tabs: null,
      top: false,
      right: true,
      bottom: true,
      left: false,
      transition: 'slide-y-reverse-transition',
    }),
    methods:{
    archive (id, list) {
       this.$store.dispatch('archiveReq', {id: id})
       this.$store.getters.reqs_board
       this.$store.dispatch('updateListIndex', {list: list})
    },
    unarchive (id, list) {
       this.$store.dispatch('unarchiveReq', {id: id})
       this.$store.dispatch('updateListIndex', {list: list})
    },
    onEdit(evt, prop, id) {
        let input = evt.target.innerText
        this.$store.dispatch('updateReq', {id: id, prop: prop, input: input})
    }
    },
    computed: {
      reqs_board () {
        return this.$store.getters.reqs_board
      },
      reqs_archived () {
        return this.$store.getters.reqs_archived
      },
    }
}
</script>

<style scoped>
    [contenteditable]:active, [contenteditable]:focus {
        border: none;
        outline: none;
    }
    [contenteditable]:focus {
        font-weight: 700 !important;
    }
   .tirar-margem-botao {
     margin: 0px;
     margin-right:10px;
   }
   .rounded-task-card{ 
   border-radius:6px;
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
   min-width: 280px;
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
   justify-content: space-between;
   width: 50%;
   align-items: flex-center;
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