# Generated by Django 4.2.9 on 2024-02-03 15:23

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Products', '0030_tv_hdmi'),
    ]

    operations = [
        migrations.AlterField(
            model_name='tv',
            name='refresh_rate',
            field=models.CharField(max_length=100),
        ),
    ]
