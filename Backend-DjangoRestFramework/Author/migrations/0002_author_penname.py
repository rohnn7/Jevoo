# Generated by Django 3.0.3 on 2020-09-05 05:31

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Author', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='author',
            name='penname',
            field=models.CharField(default='', max_length=200),
        ),
    ]