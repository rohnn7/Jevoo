# Generated by Django 3.0.3 on 2020-09-06 13:24

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('Post', '0007_remove_series_author'),
        ('Series', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='post',
            name='series',
            field=models.ForeignKey(blank=True, default=None, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='series', to='Series.Series'),
        ),
        migrations.DeleteModel(
            name='Series',
        ),
    ]
