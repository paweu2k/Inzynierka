# Generated by Django 4.2.9 on 2024-02-03 14:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Products', '0019_alter_printer_depth_cm_alter_printer_duty_cycle_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='printer',
            name='display',
            field=models.BooleanField(default=False),
        ),
    ]
