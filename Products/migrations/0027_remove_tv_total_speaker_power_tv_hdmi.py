# Generated by Django 4.2.9 on 2024-02-03 15:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Products', '0026_remove_tv_hdmi'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='tv',
            name='total_speaker_power',
        ),
        migrations.AddField(
            model_name='tv',
            name='hdmi',
            field=models.PositiveIntegerField(default=1),
            preserve_default=False,
        ),
    ]