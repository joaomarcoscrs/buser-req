from django.contrib import admin

from core.models import ActivityLog
from core.models import Requisition


class ActivityLogAdmin(admin.ModelAdmin):
    list_display = ('type', 'logged_user', 'created_at')


class ReqAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'status', 'team', 'priority', 'category', 'description', 'link')


admin.site.register(ActivityLog, ActivityLogAdmin)
admin.site.register(Requisition, ReqAdmin)
