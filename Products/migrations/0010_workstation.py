# Generated by Django 4.2.9 on 2024-01-27 17:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Products', '0009_printer'),
    ]

    operations = [
        migrations.CreateModel(
            name='Workstation',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('manufacturer', models.CharField(max_length=100)),
                ('model', models.CharField(max_length=100)),
                ('price', models.DecimalField(decimal_places=2, max_digits=10)),
                ('manufacturer_code', models.CharField(max_length=100)),
                ('case_type', models.CharField(max_length=100)),
                ('operating_system', models.CharField(max_length=100)),
                ('optical_drive', models.BooleanField(default=False)),
                ('wifi', models.BooleanField(default=False)),
                ('bluetooth', models.BooleanField(default=False)),
                ('built_in_speakers', models.BooleanField(default=False)),
                ('processor_model', models.CharField(max_length=100)),
                ('core_count', models.PositiveIntegerField()),
                ('base_frequency', models.DecimalField(decimal_places=2, max_digits=6)),
                ('ram_size', models.PositiveIntegerField()),
                ('ram_type', models.CharField(max_length=100)),
                ('hdd_capacity', models.PositiveIntegerField()),
                ('ssd_capacity', models.PositiveIntegerField()),
                ('graphics_chipset', models.CharField(max_length=100)),
                ('sound_card', models.CharField(max_length=100)),
                ('network_card', models.CharField(max_length=100)),
                ('memory_card_reader', models.BooleanField(default=False)),
                ('image', models.ImageField(default='workstations_images/default_no_image.png', upload_to='workstations_images/')),
            ],
        ),
    ]
