# Generated by Django 4.2.9 on 2024-02-03 14:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Products', '0021_alter_routers_transmission_speed_24ghz_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='routers',
            name='transmission_speed_24ghz',
            field=models.CharField(max_length=100, verbose_name='Transmission Speed 2.4GHz'),
        ),
        migrations.AlterField(
            model_name='routers',
            name='transmission_speed_5ghz',
            field=models.CharField(max_length=100, verbose_name='Transmission Speed 5GHz'),
        ),
    ]
