# Generated by Django 3.0.3 on 2020-09-03 13:48

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('Post', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='post',
            name='published_date',
            field=models.DateTimeField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='post',
            name='saved_date',
            field=models.DateTimeField(default=django.utils.timezone.now),
        ),
    ]
