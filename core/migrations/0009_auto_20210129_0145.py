# -*- coding: utf-8 -*-
# Generated by Django 1.11.17 on 2021-01-29 01:45
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0008_auto_20210128_2300'),
    ]

    operations = [
        migrations.AlterField(
            model_name='requisition',
            name='priority',
            field=models.IntegerField(blank=True, choices=[(0, 'prioridade 0'), (1, 'prioridade 1'), (2, 'prioridade 2'), (3, 'prioridade 3')], null=True),
        ),
        migrations.AlterField(
            model_name='requisition',
            name='status',
            field=models.CharField(blank=True, choices=[('backlog', 'backlog'), ('pending', 'pending'), ('ongoing', 'ongoing'), ('done', 'done'), ('delivered', 'delivered')], max_length=20, null=True),
        ),
    ]
