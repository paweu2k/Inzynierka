# Generated by Django 4.2.9 on 2024-02-03 15:22

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Products', '0028_tv_total_speaker_power_alter_tv_refresh_rate_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='tv',
            name='hdmi',
        ),
        migrations.AlterField(
            model_name='tv',
            name='total_speaker_power',
            field=models.CharField(max_length=100),
        ),
    ]
