# Generated by Django 3.0.3 on 2020-09-03 19:11

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('Author', '0001_initial'),
        ('Post', '0003_auto_20200903_1928'),
    ]

    operations = [
        migrations.AddField(
            model_name='post',
            name='writer',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='writer', to='Author.Author'),
        ),
        migrations.AlterField(
            model_name='post',
            name='saved_date',
            field=models.DateTimeField(auto_now=True),
        ),
        migrations.CreateModel(
            name='Series',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('series_title', models.CharField(max_length=300)),
                ('author', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='author', to='Author.Author')),
            ],
        ),
        migrations.CreateModel(
            name='Images',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('image', models.ImageField(blank=True, upload_to='PostImage')),
                ('posts', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='posts', to='Post.Post')),
            ],
        ),
        migrations.AddField(
            model_name='post',
            name='series',
            field=models.ForeignKey(blank=True, default=None, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='series', to='Post.Series'),
        ),
    ]
