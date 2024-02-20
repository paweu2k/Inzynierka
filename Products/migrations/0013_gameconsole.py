# Generated by Django 4.2.9 on 2024-01-27 17:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Products', '0012_ethernetsocket_manufacturer_code'),
    ]

    operations = [
        migrations.CreateModel(
            name='GameConsole',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('manufacturer', models.CharField(max_length=100)),
                ('model', models.CharField(max_length=100)),
                ('price', models.DecimalField(decimal_places=2, max_digits=10)),
                ('manufacturer_code', models.CharField(max_length=100)),
                ('console_version', models.CharField(max_length=100)),
                ('color', models.CharField(max_length=100)),
                ('number_of_controllers_in_set', models.PositiveIntegerField()),
                ('processor', models.CharField(max_length=100)),
                ('clock_speed', models.DecimalField(decimal_places=2, max_digits=6)),
                ('graphics_system', models.CharField(max_length=100)),
                ('ram_memory', models.PositiveIntegerField()),
                ('hard_drive', models.CharField(max_length=100)),
                ('wifi', models.BooleanField(default=False)),
                ('bluetooth', models.BooleanField(default=False)),
                ('optical_drive', models.BooleanField(default=False)),
                ('number_of_usb_ports', models.PositiveIntegerField()),
                ('video_output', models.CharField(max_length=100)),
                ('ethernet', models.BooleanField(default=False)),
                ('height_mm', models.DecimalField(decimal_places=2, max_digits=6)),
                ('width_mm', models.DecimalField(decimal_places=2, max_digits=6)),
                ('depth_mm', models.DecimalField(decimal_places=2, max_digits=6)),
                ('image', models.ImageField(default='gameConsole_images/default_no_image.png', upload_to='gameConsole_images/')),
            ],
        ),
    ]
