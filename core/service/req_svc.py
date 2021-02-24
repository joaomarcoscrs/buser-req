from core.models import Requisition, User


def list_reqs(user):
    return Requisition.objects.all()


def create_req(user, status, title, archived, analysis, is_trash, team, priority, category, link, description, slack_user=''):
    Requisition.objects.create(creator=user, title=title, status=status, priority=priority, category=category,
                               link=link, description=description, archived=archived, analysis=analysis,
                               is_trash=is_trash, team=team, slack_user=slack_user)
    return Requisition.objects.latest('id')


def archive_req(id_2):
    r = Requisition.objects.get(id=id_2)
    r.archived = True
    r.save()
    return {'status': r.status, 'id': r.id}


def unarchive_req(id_2):
    r = Requisition.objects.get(id=id_2)
    r.archived = False
    r.save()
    return {'id': r.id}


def analyze_req(id_2):
    r = Requisition.objects.get(id=id_2)
    r.analysis = False
    r.status = 'backlog'
    r.save()
    return {'id': r.id}


def delete_req(id_2):
    r = Requisition.objects.get(id=id_2)
    r.delete()
    return {'id': r.id}


def update_req_status(id_2, status):
    r = Requisition.objects.get(id=id_2)
    print(r.id)
    print("status anterior:" + r.status)
    r.status = status
    print("status novo:" + status)
    r.save()
    print(r.save())
    return {'id': r.id, 'status': r.status}


def update_req_index(id_2, index):
    r = Requisition.objects.get(id=id_2)
    r.index = index
    r.save()
    return {'id': r.id, 'index': r.index, 'status': r.status}


def update_req_prop(id_2, prop, value):
    r = Requisition.objects.get(id=id_2)
    if prop == 'title':
        r.title = value
    elif prop == 'priority':
        r.priority = value
    elif prop == 'team':
        r.team = value
    elif prop == 'category':
        r.category = value
    elif prop == 'description':
        r.description = value
    elif prop == 'link':
        r.link = value
    r.save()
    if r.archived:
        _type = 'archived'
    else:
        _type = 'board'
    return {'id': r.id, 'prop': prop, 'value': value, 'status': r.status, 'type': _type}
