# coding: utf-8
import json
from django.http.response import HttpResponse, JsonResponse
from django.contrib import auth
from commons.django_views_utils import ajax_login_required
from commons.utils import gravatar_url
from core.service import log_svc, req_svc
from django.views.decorators.csrf import csrf_exempt
from core.models import Requisition


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
    statuses = ['backlog', 'pending', 'ongoing', 'done', 'delivered']
    req_list = {
        'backlog': [],
        'pending': [],
        'ongoing': [],
        'done': [],
        'delivered': []
    }
    for req in reqs:
        req = _req2dict(req)
        for valor in statuses:
            if req['status'] == valor and not req['is_trash']:
                req_list[valor].append(req)
    return JsonResponse(req_list, safe=False)


@ajax_login_required
def delete_req(request):
    id_2 = request.POST['id']
    r = req_svc.delete_req(id_2)
    return JsonResponse(r)


@ajax_login_required
def archive_req(request):
    id_2 = request.POST['id']
    r = req_svc.archive_req(id_2)
    return JsonResponse(r)


@ajax_login_required
def analyze_req(request):
    id_2 = request.POST['id']
    r = req_svc.analyze_req(id_2)
    return JsonResponse(r)


@ajax_login_required
def unarchive_req(request):
    id_2 = request.POST['id']
    r = req_svc.unarchive_req(id_2)
    return JsonResponse(r)


@ajax_login_required
def update_req_status(request):
    id_2 = request.POST['id']
    status = request.POST['status']
    r = req_svc.update_req_status(id_2, status)
    return JsonResponse(r)


@ajax_login_required
def update_req_prop(request):
    id_2 = request.POST['id']
    prop = request.POST['prop']
    value = request.POST['value']
    r = req_svc.update_req_prop(id_2, prop, value)
    return JsonResponse(r)


@ajax_login_required
def update_req_index(request):
    id_2 = request.POST['id']
    index = request.POST['index']
    r = req_svc.update_req_index(id_2, index)
    return JsonResponse(r)


@ajax_login_required
def create_req(request):
    if request.POST['type'] == 'url_verification':
        return JsonResponse({'challenge': request.POST['challenge']})
    else:
        title = request.POST['title']
        status = request.POST['status']
        priority = request.POST['priority']
        category = request.POST['category']
        link = request.POST['link']
        description = request.POST['description']
        archived = request.POST['archived']
        analysis = request.POST['analysis']
        is_trash = request.POST['is_trash']
        team = request.POST['team']

        if archived == 'f':
            archived = False
        else:
            archived = True

        if analysis == 'f':
            analysis = False
        else:
            analysis = True

        if is_trash == 'f':
            is_trash = False
        else:
            is_trash = True

        req = req_svc.create_req(request.user, status, title, archived, analysis, is_trash, team, priority, category, link,
                                 description)
        return JsonResponse(_req2dict(req))


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
        'profile_picture': gravatar_url(user.email),
        'is_admin': user.is_superuser,
        'team': user.profile.team
    }
    return d


def _req2dict(req):
    d = {
        'id': req.id,
        'title': req.title,
        'team': req.team,
        'status': req.status,
        'archived': req.archived,
        'analysis': req.analysis,
        'creator': req.creator.username,
        'created_at': req.created_at,
        'updated_at': req.updated_at,
        'priority': req.priority,
        'category': req.category,
        'link': req.link,
        'description': req.description,
        'is_trash': req.is_trash,
        'index': req.index
    }
    return d
