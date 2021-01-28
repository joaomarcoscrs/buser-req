from core.models import Requisition, User


def list_reqs(user):
    return Requisition.objects.all()


def create_req(user, status, title, archived, analysis, is_trash, team, priority, category, link, description):
    Requisition.objects.create(creator=user, title=title, status=status, priority=priority, category=category,
                               link=link, description=description, archived=archived, analysis=analysis,
                               is_trash=is_trash, team=team)
    return Requisition.objects.latest('id')


def archive_req(id):
    r = Requisition.objects.get(id=id)
    r.archived = True
    r.save()
    return {'status': r.status, 'id': r.id}


def unarchive_req(id):
    r = Requisition.objects.get(id=id)
    r.archived = False
    r.save()
    return {'id': r.id}


def analyze_req(id):
    r = Requisition.objects.get(id=id)
    r.analysis = False
    r.status = 'backlog'
    r.save()
    return {'id': r.id}


def delete_req(id):
    r = Requisition.objects.get(id=id)
    r.delete()
    return {'id': r.id}


def change_status(id, status):
    r = Requisition.objects.get(id=id)
    r.status = status
    return {'id': r.id, 'status': r.status}


def update_req_index(id, index):
    r = Requisition.objects.get(id=id)
    r.index = index
    return {'id': r.id, 'index': r.index}
