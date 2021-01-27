# coding: utf-8
import json
from django.http.response import HttpResponse, JsonResponse
from django.contrib import auth
from commons.django_model_utils import get_or_none
from commons.django_views_utils import ajax_login_required
from core.service import log_svc, todo_svc
from django.views.decorators.csrf import csrf_exempt


def dapau(request):
    raise Exception('break on purpose')


@csrf_exempt
def login(request):
    username = request.POST['username']
    password = request.POST['password']
    user = auth.authenticate(username=username, password=password)
    user_dict = None
    if user is not None:
        if user.is_active:
            auth.login(request, user)
            log_svc.log_login(request.user)
            user_dict = _user2dict(user)
    return JsonResponse(user_dict, safe=False)


def logout(request):
    if request.method.lower() != 'post':
        raise Exception('Logout only via post')
    if request.user.is_authenticated():
        log_svc.log_logout(request.user)
    auth.logout(request)
    return HttpResponse('{}', content_type='application/json')


def whoami(request):
    i_am = {
        'user': _user2dict(request.user),
        'authenticated': True,
    } if request.user.is_authenticated() else {'authenticated': False}
    return JsonResponse(i_am)


@ajax_login_required
def add_todo(request):
    todo = todo_svc.add_todo(request.POST['new_task'])
    return JsonResponse(todo)


@ajax_login_required
def list_todos(request):
    todos = todo_svc.list_todos()
    return JsonResponse({'todos': todos})

@ajax_login_required
def list_users(request):
    User = auth.get_user_model()
    user_list = []
    for user in User.objects.all():
        user = _user2dict(user)
        user_list.append(user)
    return JsonResponse(user_list, safe=False)


@ajax_login_required
def list_reqs(request):
    reqs = {
        'backlog': [
           {
               'id': 1,
               'title': '20 Celulares ops',
               'archived': False,
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
                'team': '-',
                'priority': 2,
                'category': 'manutenção',
                'link': '-',
                'description': 'Portão tá abrindo sozinho, precisa arrumar'
            },
        ],
    }
    return JsonResponse(reqs)

def list_reqs_analysis(request):
    return JsonResponse([], safe=False)


def list_archived_reqs(request):
    return JsonResponse([], safe=False)

def _user2dict(user):
    d = {
        'id': user.id,
        'name': user.get_full_name(),
        'username': user.username,
        'first_name': user.first_name,
        'last_name': user.last_name,
        'last_login': user.last_login,
        'date_joined': user.date_joined,
        'email': user.email,
        'permissions': {
            'ADMIN': user.is_superuser,
            'STAFF': user.is_staff,
        }
    }
    return d
