# coding: utf-8
import json
from django.http.response import HttpResponse, JsonResponse
from django.contrib import auth
from commons.django_model_utils import get_or_none
from commons.django_views_utils import ajax_login_required
from core.service import log_svc, req_svc
from django.views.decorators.csrf import csrf_exempt
from core.service import *

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
def list_users(request):
    User = auth.get_user_model()
    user_list = []
    for user in User.objects.all():
        user = _user2dict(user)
        user_list.append(user)
    return JsonResponse(user_list, safe=False)


@ajax_login_required
def list_reqs(request):
    reqs = req_svc.list_reqs(request.user)
    return JsonResponse(reqs)

@ajax_login_required
def list_reqs_analysis(request):
    reqs = req_svc.list_reqs(request.user, analysis=True)
    return JsonResponse(reqs)

@ajax_login_required
def list_archived_reqs(request):
    reqs = req_svc.list_reqs(request.user, archived=True)
    return JsonResponse(reqs)

@ajax_login_required
def update_reqs(request):
    req_svc.update_reqs()
    return JsonResponse({})

@ajax_login_required
def create_req(request):
    title = request.POST['title']
    status = request.POST['status']
    priority = request.POST['priority']
    category = request.POST['category']
    link = request.POST['link']
    description = request.POST['description']
    req_svc.create_req(request.user, title, status, priority, category, link, description)
    return JsonResponse({})

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
