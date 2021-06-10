# Generated by Django 3.0.3 on 2021-02-19 07:26

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('Post', '0013_likedpost'),
    ]

    operations = [
        migrations.CreateModel(
            name='Groups',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('group', models.CharField(max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name='Tags',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('tag', models.CharField(max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name='TagsGroups',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('groups', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='groups', to='Post.Groups')),
                ('tags', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='tags', to='Post.Tags')),
            ],
        ),
        migrations.CreateModel(
            name='PostGroups',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('groups', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='group_tag', to='Post.Groups')),
                ('posts', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='posts_group', to='Post.Post')),
            ],
        ),
    ]
