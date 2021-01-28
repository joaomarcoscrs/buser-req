from core.models import Requisition, User

def list_reqs(user, archived=False, analysis=False):
    return {
        'backlog': [
           {
               'id': 1,
               'title': '20 Celulares ops',
               'archived': False,
               'analysis': False,
               'team': 'operações',
               'priority': 2,
               'category': 'compra',
               'link': 'https://www.magazineluiza.com.br/iphone-12-apple-128gb-preto-tela-61-cam-dupla-12mp-ios/p/155598100/te/ip12/?&force=1&seller_id=magazineluiza&&utm_source=google&utm_medium=pla&utm_campaign=&partner_id=58983&gclid=CjwKCAiAo5qABhBdEiwAOtGmbrloLajQVAR5CJJ140SZCONEy_oHoBHcxA24_rtbPL5E95OzyaIxFxoCaOMQAvD_BwE',
               'description': 'Atualizando os modelos de telefone da galera'
           },
            {
               'id': 3,
               'title': 'Ar-condicionado térreo',
               'archived': False,
               'analysis': False,
               'team': 'todos',
               'priority': 0,
               'category': 'obra',
               'link': '-',
               'description': 'Arrumar o arcond do térreo para o pessoal começar a trabalhar lá'
           },
        ],
        'pending': [
            {
                'id': 4,
                'title': 'Microondas 1º andar',
                'archived': False,
                'analysis': False,
                'team': '-',
                'priority': 3,
                'category': 'compra',
                'link': '-',
                'description': 'Comprar um microondas pra colocar na copa do 1º andar'
            },
        ],
        'ongoing': [
        ],
        'done': [
            {
                'id': 2,
                'title': '13 Notebooks busercamp',
                'archived': False,
                'analysis': False,
                'team': 'tecnologia',
                'priority': 2,
                'category': 'compra',
                'link': 'https://produto.mercadolivre.com.br/MLB-1230646082-notebook-alienware-i7-7700hq-28ghz-16gb-128ssd1tb-17-gtx-_JM?matt_tool=25965143&matt_word=&matt_source=google&matt_campaign_id=10583714816&matt_ad_group_id=99841550330&matt_match_type=&matt_network=u&matt_device=c&matt_creative=449544880201&matt_keyword=&matt_ad_position=&matt_ad_type=&matt_merchant_id=297106340&matt_product_id=MLB1230646082&matt_product_partition_id=1037040749722&matt_target_id=pla-1037040749722&gclid=CjwKCAiAo5qABhBdEiwAOtGmbp1Qgk4ocXvmvrwECE-MMYAfdE7ogwjYLlqzyZ1sNk52QAd8OoS07BoC1sAQAvD_BwE',
                'description': 'Notebooks de presente pra galera do busercamp'
            },
            {
                'id': 6,
                'title': 'Macbook pro',
                'archived': False,
                'analysis': False,
                'team': 'marketing',
                'priority': 1,
                'category': 'compra',
                'link': 'https://www.kabum.com.br/produto/114218/macbook-pro-retina-apple-intel-core-i5-8gb-ssd-512gb-macos-13-3-cinza-espacial-mxk52bz-a?gclid=CjwKCAiAxp-ABhALEiwAXm6IyQrA5dnuxsSnQ4ry_49e83QpgAHglUXXeT12Kb9RMUzT4mJ4hv4U9hoC1tYQAvD_BwE',
                'description': 'Time de mkt precisa de um novo macbook para viagens'
            },

        ],
        'delivered': [
            {
                'id': 5,
                'title': 'Portão elétrico abre sozinho',
                'archived': False,
                'analysis': False,
                'team': '-',
                'priority': 2,
                'category': 'manutenção',
                'link': '-',
                'description': 'Portão tá abrindo sozinho, precisa arrumar'
            },
        ],
    }
def create_req(user, title, status, priority, category, link, description):
    Requisition.objects.create(creator=user.username,title=title,status=status,priority=priority,category=category,link=link,description=description)

def archive_req(id):
    r = Requisition.objects.get(id=id)
    r.archived = True
    r.save()

def analyze_req(id, requisition_passed):
    r = Requisition.objects.get(id=id)
    if requisition_passed:
        r.analysis = False
        r.status = 'backlog'
        r.save()
    else:
        r.delete()

def update_reqs():
    pass