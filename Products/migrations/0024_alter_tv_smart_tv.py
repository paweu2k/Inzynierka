# Generated by Django 4.2.9 on 2024-02-03 15:11

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Products', '0023_alter_tv_refresh_rate'),
    ]

    operations = [
        migrations.AlterField(
            model_name='tv',
            name='smart_tv',
            field=models.CharField(max_length=100),
        ),
    ]
