import Vue from 'vue'

var logged_user = null;

function mockasync (data) {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve({data: data}), 600)
  })
}

function mockasync_fast (data) {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve({data: data}), 200)
  })
}

const api = {
    login(username, password){
        if(password){
            logged_user = {
                username: username,
                first_name: 'Tamires',
                last_name: 'Érvila Cunha de Sousa',
                email: 'tamires.cunha@buser.com.br',
                notifications_enabled: true,
                permissions:{
                    ADMIN: username == 'admin',
                    STAFF: username == 'admin',
                }
            };
        }
        return mockasync(logged_user);
    },
    logout(){
        logged_user = null;
        return mockasync({});
    },
    whoami(){
        return mockasync(logged_user ? {
            authenticated: true,
            user: logged_user,
        } : {authenticated: false});
    },
    add_todo(newtask){
        return mockasync({description: newtask, done: false});
    },
    list_todos(){
        return mockasync({
            todos: [
                {description: 'Do the laundry', done: true},
                {description: 'Walk the dog', done: false}
            ]
        });
    },
    list_users(){
        return mockasync_fast([
           {
             id: 1,
             username: 'tamireservila',
             email: 'tamires.cunha@buser.com.br',
             first_name: 'Tamires',
             last_name: 'Érvila Cunha de Sousa',
             team: 'facilities',
             role: 'admin',
             profile_picture: 'https://media-exp1.licdn.com/dms/image/C4D03AQHXmumyDY1cYA/profile-displayphoto-shrink_800_800/0/1604369429065?e=1616630400&v=beta&t=T-KGP4JO1DrjK29RrgwR0cPwe4cOy01R03Ghyx1eXxs'
           },
           {
             id: 2,
             username: 'joaomarcos',
             email: 'joao.marcos@buser.com.br',
             first_name: 'João Marcos',
             last_name: 'Cardoso Ramos da Silva',
             team: 'busercamp',
             role: 'viewer',
             profile_picture: 'https://media-exp1.licdn.com/dms/image/C4D03AQHxA4EwlM2UbQ/profile-displayphoto-shrink_200_200/0/1603973529120?e=1616630400&v=beta&t=we78RgYgE1igUL6TFXFn_BCCQFnBXOSNwakh66-BAsg'
           }
         ])
    },
    list_reqs(){
        return mockasync({
          backlog: [
           {
             id: 1,
             is_ghost: false,
             title: '20 Celulares ops',
             archived: false,
             team: 'operações',
             priority: 2,
             category: 'compra',
             link: 'https://www.magazineluiza.com.br/iphone-12-apple-128gb-preto-tela-61-cam-dupla-12mp-ios/p/155598100/te/ip12/?&force=1&seller_id=magazineluiza&&utm_source=google&utm_medium=pla&utm_campaign=&partner_id=58983&gclid=CjwKCAiAo5qABhBdEiwAOtGmbrloLajQVAR5CJJ140SZCONEy_oHoBHcxA24_rtbPL5E95OzyaIxFxoCaOMQAvD_BwE',
             description: 'Atualizando os modelos de telefone da galera'
           },
           {
             id: 3,
             is_ghost: false,
             title: 'Ar-condicionado térreo',
             archived: false,
             team: 'todos',
             priority: 0,
             category: 'obra',
             link: null,
             description: 'Arrumar o arcond do térreo para o pessoal começar a trabalhar lá'
           },
         ],
         pending: [
           {
             id: 4,
             is_ghost: false,
             title: 'Microondas 1º andar',
             archived: false,
             team: null,
             priority: 3,
             category: 'compra',
             link: null,
             description: 'Comprar um microondas pra colocar na copa do 1º andar'
           },

         ],
         ongoing: [
         ],
         done: [
           {
             id: 2,
             is_ghost: false,
             title: '13 Notebooks busercamp',
             archived: false,
             team: 'tecnologia',
             priority: 2,
             category: 'compra',
             link: 'https://produto.mercadolivre.com.br/MLB-1230646082-notebook-alienware-i7-7700hq-28ghz-16gb-128ssd1tb-17-gtx-_JM?matt_tool=25965143&matt_word=&matt_source=google&matt_campaign_id=10583714816&matt_ad_group_id=99841550330&matt_match_type=&matt_network=u&matt_device=c&matt_creative=449544880201&matt_keyword=&matt_ad_position=&matt_ad_type=&matt_merchant_id=297106340&matt_product_id=MLB1230646082&matt_product_partition_id=1037040749722&matt_target_id=pla-1037040749722&gclid=CjwKCAiAo5qABhBdEiwAOtGmbp1Qgk4ocXvmvrwECE-MMYAfdE7ogwjYLlqzyZ1sNk52QAd8OoS07BoC1sAQAvD_BwE',
             description: 'Notebooks de presente pra galera do busercamp'
           },
           {
             id: 6,
             is_ghost: false,
             title: 'Macbook pro',
             archived: false,
             team: 'marketing',
             priority: 1,
             category: 'compra',
             link: 'https://www.kabum.com.br/produto/114218/macbook-pro-retina-apple-intel-core-i5-8gb-ssd-512gb-macos-13-3-cinza-espacial-mxk52bz-a?gclid=CjwKCAiAxp-ABhALEiwAXm6IyQrA5dnuxsSnQ4ry_49e83QpgAHglUXXeT12Kb9RMUzT4mJ4hv4U9hoC1tYQAvD_BwE',
             description: 'Time de mkt precisa de um novo macbook para viagens'
           },

         ],
         delivered: [
           {
             id: 5,
             is_ghost: false,
             title: 'Portão elétrico abre sozinho',
             archived: false,
             team: null,
             priority: 2,
             category: 'manutenção',
             link: null,
             description: 'Portão tá abrindo sozinho, precisa arrumar'
           },

         ],
        })
    },
    list_statuses(){
        return mockasync_fast([
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
         ])
    },
    list_reqs_analysis(){
        return mockasync([
           {
             id: 7,
             title: '20 Carros SUV',
             archived: false,
             team: 'operações',
             priority: null,
             category: 'compra',
             link: 'https://www.ofertastlinejeep.com.br/comprar-veiculo-jeep-compass.html?m=&m=adwords&ad=441956994200&kw=%2Bcomprar%20%2Bjeep%20%2Bcompass&mt=b&nw=g&dev=c&pm=&tg=&ap=&gclid=CjwKCAiAxp-ABhALEiwAXm6IyXbQxGsEMThsjyN35Ogn9EAcVnx9N-K84IKOiaSoLwFsrC-yboGeNxoCazAQAvD_BwE',
             description: 'Tá osso ir almoçar a pé, seria bom se tivessem uns carrinhos à disposição do pessoal'
           },
           {
             id: 8,
             title: '13 Notebooks busercamp',
             archived: false,
             team: 'tecnologia',
             priority: null,
             category: 'compra',
             link: 'https://www.kabum.com.br/cgi-local/site/produtos/descricao_ofertas.cgi?codigo=114214&gclid=CjwKCAiAxp-ABhALEiwAXm6IyV1P92CsuObd50cTWDHzMJLgTWopOsm0z-4HRKEMkQgcV1LZ_-fAlhoCSAgQAvD_BwE',
             description: 'Notebooks de presente pra galera do busercamp denovo'
           },
           {
             id: 9,
             title: 'Escorregador para o térreo',
             archived: false,
             team: null,
             priority: null,
             category: 'obra',
             link: null,
             description: 'Porque escorregar é muito mais legal que descer de elevador'
           },
           {
             id: 10,
             title: 'Microondas 2º andar',
             archived: false,
             team: null,
             priority: null,
             category: 'compra',
             link: null,
             description: 'Comprar um microondas pra colocar na copa do 2º andar'
           },
           {
             id: 11,
             title: 'Elevador faz barulho feio quando sobe',
             archived: false,
             team: null,
             priority: null,
             category: 'manutenção',
             link: null,
             description: 'Pessoal tá com medo de cair enquanto estiver subindo, principalmente logo depois do almoço que tá todo mundo mais pesado'
           },
           {
             id: 12,
             title: 'Mesa digitalizadora',
             archived: false,
             team: 'marketing',
             priority: null,
             category: 'compra',
             link: 'https://www.amazon.com.br/Caneta-Tablet-Wacom-Tablets-Gr%C3%A1fico/dp/B01MTZ9CCD/ref=as_li_ss_tl?__mk_pt_BR=%C3%85M%C3%85%C5%BD%C3%95%C3%91&keywords=Wacom+Intuos+Pro+PTH860&qid=1554747767&s=gateway&sr=8-1-fkmrnull&linkCode=sl1&tag=melhores-20&linkId=4afea1f9ed728091f59b72524b82f4af',
             description: 'Time de mkt precisa de uma mesa digitalizadora'
           },
         ])
    },
    list_archived_reqs(){
        return mockasync([
           {
             id: 13,
             title: '20 Carros SUV',
             archived: true,
             team: 'operações',
             priority: null,
             category: 'compra',
             link: 'https://www.ofertastlinejeep.com.br/comprar-veiculo-jeep-compass.html?m=&m=adwords&ad=441956994200&kw=%2Bcomprar%20%2Bjeep%20%2Bcompass&mt=b&nw=g&dev=c&pm=&tg=&ap=&gclid=CjwKCAiAxp-ABhALEiwAXm6IyXbQxGsEMThsjyN35Ogn9EAcVnx9N-K84IKOiaSoLwFsrC-yboGeNxoCazAQAvD_BwE',
             description: 'Tá osso ir almoçar a pé, seria bom se tivessem uns carrinhos à disposição do pessoal'
           },
           {
             id: 14,
             title: '13 Notebooks busercamp',
             archived: true,
             team: 'tecnologia',
             priority: null,
             category: 'compra',
             link: 'https://www.kabum.com.br/cgi-local/site/produtos/descricao_ofertas.cgi?codigo=114214&gclid=CjwKCAiAxp-ABhALEiwAXm6IyV1P92CsuObd50cTWDHzMJLgTWopOsm0z-4HRKEMkQgcV1LZ_-fAlhoCSAgQAvD_BwE',
             description: 'Notebooks de presente pra galera do busercamp denovo'
           },
           {
             id: 15,
             title: 'Escorregador para o térreo',
             archived: true,
             team: null,
             priority: null,
             category: 'obra',
             link: null,
             description: 'Porque escorregar é muito mais legal que descer de elevador'
           },
           {
             id: 16,
             title: 'Microondas 2º andar',
             archived: true,
             team: null,
             priority: null,
             category: 'compra',
             link: null,
             description: 'Comprar um microondas pra colocar na copa do 2º andar'
           },
           {
             id: 17,
             title: 'Elevador faz barulho feio quando sobe',
             archived: true,
             team: null,
             priority: null,
             category: 'manutenção',
             link: null,
             description: 'Pessoal tá com medo de cair enquanto estiver subindo, principalmente logo depois do almoço que tá todo mundo mais pesado'
           },
           {
             id: 18,
             title: 'Mesa digitalizadora',
             archived: true,
             team: 'marketing',
             priority: null,
             category: 'compra',
             link: 'https://www.amazon.com.br/Caneta-Tablet-Wacom-Tablets-Gr%C3%A1fico/dp/B01MTZ9CCD/ref=as_li_ss_tl?__mk_pt_BR=%C3%85M%C3%85%C5%BD%C3%95%C3%91&keywords=Wacom+Intuos+Pro+PTH860&qid=1554747767&s=gateway&sr=8-1-fkmrnull&linkCode=sl1&tag=melhores-20&linkId=4afea1f9ed728091f59b72524b82f4af',
             description: 'Time de mkt precisa de uma mesa digitalizadora'
           },
         ])
    },
    user_info(username){
        return mockasync_fast(
           {
             id: 254,
             username: 'tamireservila',
             name: 'Tamires Érvila Cunha de Sousa',
             email: 'tamires.cunha@buser.com.br',
             team: 'facilities',
             is_admin: true,
             category: 'compra',
             link: 'https://www.ofertastlinejeep.com.br/comprar-veiculo-jeep-compass.html?m=&m=adwords&ad=441956994200&kw=%2Bcomprar%20%2Bjeep%20%2Bcompass&mt=b&nw=g&dev=c&pm=&tg=&ap=&gclid=CjwKCAiAxp-ABhALEiwAXm6IyXbQxGsEMThsjyN35Ogn9EAcVnx9N-K84IKOiaSoLwFsrC-yboGeNxoCazAQAvD_BwE',
             description: 'Tá osso ir almoçar a pé, seria bom se tivessem uns carrinhos à disposição do pessoal'
           })
    },
    change_user_info(id, role){
      if (role == 'admin'){
        changed = true;
      }
      else {
        changed = false;
      }
      return mockasync({
        changed
      })
    }
};

export default api;
