# -*- coding: utf-8 -*-
# Generated by Django 1.11.17 on 2021-01-28 14:32
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0004_auto_20210128_0102'),
    ]

    operations = [
        migrations.AddField(
            model_name='requisition',
            name='is_trash',
            field=models.BooleanField(default=False),
        ),
    ]
