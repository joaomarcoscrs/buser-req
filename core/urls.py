from core import views
from django.conf.urls import url

urlpatterns = [
    url(r'^api/dapau$', views.dapau),
    url(r'^api/login$', views.login),
    url(r'^api/logout$', views.logout),
    url(r'^api/whoami$', views.whoami),

    url(r'^api/add_todo$', views.add_todo),
    url(r'^api/list_todos$', views.list_todos),
    url(r'^api/list_users$', views.list_users),
    url(r'^api/list_reqs$', views.list_reqs),
    url(r'^api/list_reqs_analysis$', views.list_reqs_analysis),
    url(r'^api/list_archived_reqs$', views.list_archived_reqs),
]
