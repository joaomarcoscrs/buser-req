from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone
from django.db.models.signals import post_save
from django.dispatch import receiver


class ActivityLog(models.Model):
    type = models.CharField(max_length=64)
    logged_user = models.ForeignKey(User, null=True, blank=True)
    fromuser = models.ForeignKey(User, null=True, blank=True, related_name="activitylogs_withfromuser")
    jsondata = models.TextField(null=True, blank=True)
    created_at = models.DateTimeField('criado em', auto_now_add=True)

    class Meta:
        ordering = ('-created_at',)

    def __str__(self):
        return '%s / %s / %s' % (
            self.type,
            self.logged_user,
            self.created_at,
        )

    def to_dict_json(self):
        return {
            'id': self.id,
            'description': self.description,
            'done': self.done,
        }


class Requisition(models.Model):
    PRIORITIES = (
        (0, 'prioridade 0'),
        (1, 'prioridade 1'),
        (2, 'prioridade 2'),
        (3, 'prioridade 3'),
    )
    STATUSES = (
        ('backlog', 'backlog'),
        ('pending', 'pending'),
        ('ongoing', 'ongoing'),
        ('done', 'done'),
        ('delivered', 'delivered'),
    )
    CATEGORIES = (
        ('compra', 'compra'),
        ('manutenção', 'manutenção'),
        ('obra', 'obra'),
    )
    TEAMS = (
        ('operações', 'operações'),
        ('tecnologia', 'tecnologia'),
        ('marketing', 'marketing'),
        ('people', 'people'),
        ('finance', 'finance'),
        ('suporte', 'suporte'),
    )
    title = models.TextField(blank=True)
    team = models.CharField(blank=True, max_length=30, choices=TEAMS)
    status = models.CharField(null=True, blank=True, max_length=30, choices=STATUSES)
    archived = models.BooleanField(default=False)
    analysis = models.BooleanField(default=False)
    creator = models.ForeignKey(User)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    priority = models.IntegerField(null=True, blank=True, choices=PRIORITIES)
    category = models.CharField(blank=True, max_length=30, choices=CATEGORIES)
    link = models.URLField(blank=True, null=True, max_length=400)
    description = models.TextField(blank=True, null=True)
    is_trash = models.BooleanField(default=False)
    index = models.IntegerField(null=True, blank=True)

    objects = models.Manager()

    def delete(self):
        self.is_trash = True
        self.save()


class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    username = User.username
    team = models.CharField(max_length=20, blank=True)


@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)


@receiver(post_save, sender=User)
def save_user_profile(sender, instance, **kwargs):
    instance.profile.save()
