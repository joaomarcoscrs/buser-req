# -*- coding: utf-8 -*-
# Generated by Django 1.11.17 on 2021-02-24 22:27
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0010_profile'),
    ]

    operations = [
        migrations.AddField(
            model_name='requisition',
            name='slack_user',
            field=models.CharField(blank=True, default='', max_length=50),
        ),
        migrations.AlterField(
            model_name='requisition',
            name='category',
            field=models.CharField(blank=True, choices=[('compra', 'compra'), ('manutenção', 'manutenção'), ('obra', 'obra')], max_length=30),
        ),
        migrations.AlterField(
            model_name='requisition',
            name='description',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='requisition',
            name='link',
            field=models.TextField(blank=True, max_length=2000, null=True),
        ),
        migrations.AlterField(
            model_name='requisition',
            name='status',
            field=models.CharField(blank=True, choices=[('backlog', 'backlog'), ('pending', 'pending'), ('ongoing', 'ongoing'), ('done', 'done'), ('delivered', 'delivered')], max_length=30, null=True),
        ),
        migrations.AlterField(
            model_name='requisition',
            name='team',
            field=models.CharField(blank=True, choices=[('operações', 'operações'), ('tecnologia', 'tecnologia'), ('marketing', 'marketing'), ('people', 'people'), ('finance', 'finance'), ('suporte', 'suporte'), ('legal', 'legal'), ('newbiz', 'newbiz')], max_length=30),
        ),
    ]
