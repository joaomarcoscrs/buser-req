<template>
  <v-card 
    max-width="400"
    class="mx-auto rounded-card"
    color="#ECECEC"
  >
    <v-system-bar class="flex-box-barra"
      color="#969696"
      height="50"
    >

      <span><h1 class="font-weight-regular texto-board">backlog</h1></span>

    </v-system-bar>
    <v-container>
      <v-row dense>

        <v-col
          v-for="req in reqs"
          :key="req.id"
          cols="12"
        >
          <v-card  class="margin-card rounded-card">
            <v-card-title
              class="headline titulo-tasks font-weight-medium"
              v-text="req.title"
            ></v-card-title>
              <div class="flex-box-content-card">
                <div class="d-flex justify-space-around">
                  <span>{{req.team}}</span>
                  <span>{{req.priority}}</span>
                </div>
                <div class="d-flex justify-space-around">
                  <span>{{req.category}}</span>
                  <span>{{req.priority_color}}</span>
                </div>
              </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
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
      ],
    }),
  }
</script>

<style>
.rounded-card{ 
    border-radius:20px;
}
.margin-card {
  margin: 10px;
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
  font-size: 18px !important;
}
.flex-box-content-card {
  display:flex;
  flex-flow: column wrap;
  justify-content: space-between;
  margin: 10px;
  height: 60px;
}
</style>
