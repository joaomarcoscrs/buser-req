from core import views
from django.conf.urls import url

urlpatterns = [
    url(r'^api/dapau$', views.dapau),
    url(r'^api/login$', views.login),
    url(r'^api/logout$', views.logout),
    url(r'^api/whoami$', views.whoami),
    url(r'^api/list_users$', views.list_users),
    url(r'^api/list_reqs$', views.list_reqs),
    url(r'^api/archive_req$', views.archive_req),
    url(r'^api/unarchive_req$', views.unarchive_req),
    url(r'^api/analyze_req$', views.analyze_req),
    url(r'^api/delete_req$', views.delete_req),
    url(r'^api/create_req$', views.create_req),
    url(r'^api/create_req_app$', views.create_req_app),
    url(r'^api/update_req_status$', views.update_req_status),
    url(r'^api/update_req_index$', views.update_req_index),
    url(r'^api/update_req_prop$', views.update_req_prop),
]
