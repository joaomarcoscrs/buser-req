import Vue from 'vue'

var logged_user = null;

function mockasync (data) {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve({data: data}), 600)
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
        return mockasync([
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
        return mockasync([
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
             status: 'concluído',
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
             status: 'pendente',
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
             status: 'entregue',
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
             status: 'concluído',
             title: 'Macbook pro',
             team: 'marketing',
             team_color: '#FF7A00',
             priority: 1,
             priority_color: '#F16500',
             category: 'compra',
             link: 'https://www.kabum.com.br/produto/114218/macbook-pro-retina-apple-intel-core-i5-8gb-ssd-512gb-macos-13-3-cinza-espacial-mxk52bz-a?gclid=CjwKCAiAxp-ABhALEiwAXm6IyQrA5dnuxsSnQ4ry_49e83QpgAHglUXXeT12Kb9RMUzT4mJ4hv4U9hoC1tYQAvD_BwE',
             description: 'Time de mkt precisa de um novo macbook para viagens'
           },
         ])
    },
    list_statuses(){
        return mockasync([
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
    }
};

export default api;
