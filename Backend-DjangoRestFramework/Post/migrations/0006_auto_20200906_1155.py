# Generated by Django 3.0.3 on 2020-09-06 06:25

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('Author', '0003_auto_20200905_1226'),
        ('Post', '0005_auto_20200905_1226'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='images',
            name='posts',
        ),
        migrations.AddField(
            model_name='images',
            name='author',
            field=models.ForeignKey(default=None, on_delete=django.db.models.deletion.CASCADE, related_name='owner', to='Author.Author'),
        ),
        migrations.CreateModel(
            name='PostImages',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('images', models.ForeignKey(blank=True, default=None, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='images', to='Post.Images')),
                ('posts', models.ForeignKey(blank=True, default=None, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='posts', to='Post.Post')),
            ],
        ),
    ]
