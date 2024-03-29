# Generated by Django 4.2.9 on 2024-01-25 19:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Products', '0006_routers_manufacturer_code_routers_price'),
    ]

    operations = [
        migrations.AlterField(
            model_name='routers',
            name='manufacturer_code',
            field=models.CharField(default='', max_length=100),
        ),
        migrations.AlterField(
            model_name='routers',
            name='price',
            field=models.DecimalField(decimal_places=2, default='0', max_digits=10),
        ),
    ]
