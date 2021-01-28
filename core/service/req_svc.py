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
