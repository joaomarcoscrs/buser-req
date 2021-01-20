<template>
<div class="d-flex flex-shrink-0">
  <v-card v-for="status in statuses" :key=status.id
    width="400"
    max-width="400"
    class="mx-auto rounded-card boards-todos"
    color="#ECECEC"
  >
    <v-system-bar class="flex-box-barra"
      :color="status.color"
      height="50"
    >

      <span><h1 class="font-weight-regular texto-board">{{status.name}}</h1></span>

    </v-system-bar>
    <v-container>
      <v-row dense>

        <v-col
          v-for="req in reqs"
          :key="req.id"
          cols="12"
        >
        <div v-if="req.status == status.name">
          <v-card  class="margin-card rounded-card">
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
                    <v-icon medium color="#969696" class="padding-dentro-card">mdi-text</v-icon>
                  </div>
                </div>
              </div>
          </v-card>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</div>
</template>

<script>

export default {

    data: () => ({
      reqs: [
        {
          id: 1,
          status: 'backlog',
          title: '20 Celulares ops',
          team: 'operações',
          team_color: '#49CB57',
          priority: 2,
          priority_color: '#FDCB01',
          category: 'compra',
          link: 'https://www.magazineluiza.com.br/iphone-12-apple-128gb-preto-tela-61-cam-dupla-12mp-ios/p/155598100/te/ip12/?&force=1&seller_id=magazineluiza&&utm_source=google&utm_medium=pla&utm_campaign=&partner_id=58983&gclid=CjwKCAiAo5qABhBdEiwAOtGmbrloLajQVAR5CJJ140SZCONEy_oHoBHcxA24_rtbPL5E95OzyaIxFxoCaOMQAvD_BwE',
          description: 'Atualizando os modelos de telefone da galera'
        },
        {
          id: 2,
          status: 'backlog',
          title: '13 Notebooks busercamp',
          team: 'tecnologia',
          team_color: '#49B4CB',
          priority: 2,
          priority_color: '#F16500',
          category: 'compra',
          link: 'https://produto.mercadolivre.com.br/MLB-1230646082-notebook-alienware-i7-7700hq-28ghz-16gb-128ssd1tb-17-gtx-_JM?matt_tool=25965143&matt_word=&matt_source=google&matt_campaign_id=10583714816&matt_ad_group_id=99841550330&matt_match_type=&matt_network=u&matt_device=c&matt_creative=449544880201&matt_keyword=&matt_ad_position=&matt_ad_type=&matt_merchant_id=297106340&matt_product_id=MLB1230646082&matt_product_partition_id=1037040749722&matt_target_id=pla-1037040749722&gclid=CjwKCAiAo5qABhBdEiwAOtGmbp1Qgk4ocXvmvrwECE-MMYAfdE7ogwjYLlqzyZ1sNk52QAd8OoS07BoC1sAQAvD_BwE',
          description: 'Notebooks de presente pra galera do busercamp'
        },
        {
          id: 3,
          status: 'backlog',
          title: 'Ar-condicionado térreo',
          team: 'todos',
          team_color: '#D81B60',
          priority: 0,
          priority_color: '#E03B24',
          category: 'obra',
          link: null,
          description: 'Arrumar o arcond do térreo para o pessoal começar a trabalhar lá'
        },
        {
          id: 4,
          status: 'backlog',
          title: 'Microondas 1º andar',
          team: 'todos',
          team_color: '#D81B60',
          priority: 3,
          priority_color: '#64A338',
          category: 'compra',
          link: null,
          description: 'Comprar um microondas pra colocar na copa do 1º andar'
        },
        {
          id: 5,
          status: 'pendente',
          title: 'Portão elétrico abre sozinho',
          team: 'todos',
          team_color: '#D81B60',
          priority: 2,
          priority_color: '#FDCB01',
          category: 'manutenção',
          link: null,
          description: 'Portão tá abrindo sozinho, precisa arrumar'
        },
        {
          id: 6,
          status: 'em andamento',
          title: 'Macbook pro',
          team: 'marketing',
          team_color: '#FF7A00',
          priority: 1,
          priority_color: '#F16500',
          category: 'compra',
          link: 'https://www.kabum.com.br/produto/114218/macbook-pro-retina-apple-intel-core-i5-8gb-ssd-512gb-macos-13-3-cinza-espacial-mxk52bz-a?gclid=CjwKCAiAxp-ABhALEiwAXm6IyQrA5dnuxsSnQ4ry_49e83QpgAHglUXXeT12Kb9RMUzT4mJ4hv4U9hoC1tYQAvD_BwE',
          description: 'Time de mkt precisa de um novo macbook para viagens'
        },
      ],
      statuses: [
        {
          id: 1,
          name: 'backlog',
          color: '#969696',
          description: 'Tudo que está aqui precisa ser priorizado e endereçado.'
        },
        {
          id: 2,
          name: 'pendente',
          color: '#FFCC00',
          description: 'Tudo que está aqui está dependendo de alguma autorização ou liberação para continuar.'
        },
        {
          id: 3,
          name: 'em andamento',
          color: '#64A338',
          description: 'Tudo que está aqui está em andamento, aguardando apenas o desfecho.'
        },
        {
          id: 4,
          name: 'concluído',
          color: '#87A2C7',
          description: 'Tudo que está aqui já foi concluído, falta apenas ser entregue.'
        },
        {
          id: 5,
          name: 'entregue',
          color: '#3865A3',
          description: 'Tudo que está aqui já foi concluído e já foi entregue.'
        }
      ]
    }),
  }
</script>

<style>
.rounded-card{ 
    border-radius:20px;
}
.margin-card {
  margin: 15px;
  color: #ffffff;
}
.texto-board {
  text-align: center;
  background-color: inherit;
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
  margin-right: 50px;
}
</style>
