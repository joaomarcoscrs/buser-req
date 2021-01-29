from django.contrib import admin

from core.models import ActivityLog, Requisition, Profile


class ActivityLogAdmin(admin.ModelAdmin):
    list_display = ('type', 'logged_user', 'created_at')


class ReqAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'status', 'team', 'priority', 'category', 'description', 'link')


class ProfileAdmin(admin.ModelAdmin):
    list_display = ('user', 'team')


admin.site.register(Profile, ProfileAdmin)
admin.site.register(ActivityLog, ActivityLogAdmin)
admin.site.register(Requisition, ReqAdmin)
