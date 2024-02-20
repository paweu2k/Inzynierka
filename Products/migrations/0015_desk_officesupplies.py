# Generated by Django 4.2.9 on 2024-01-28 12:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Products', '0014_tv'),
    ]

    operations = [
        migrations.CreateModel(
            name='Desk',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('manufacturer', models.CharField(max_length=100)),
                ('model', models.CharField(max_length=100)),
                ('price', models.DecimalField(decimal_places=2, max_digits=10)),
                ('manufacturer_code', models.CharField(max_length=100)),
                ('type', models.CharField(max_length=100)),
                ('illumination', models.BooleanField(default=False)),
                ('height_adjustment', models.BooleanField(default=False)),
                ('dominant_color', models.CharField(max_length=100)),
                ('width', models.DecimalField(decimal_places=2, max_digits=6)),
                ('depth', models.DecimalField(decimal_places=2, max_digits=6)),
                ('height', models.DecimalField(decimal_places=2, max_digits=6)),
                ('image', models.ImageField(default='desk_images/default_no_image.png', upload_to='desk_images/')),
            ],
        ),
        migrations.CreateModel(
            name='OfficeSupplies',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('banded_pack', models.CharField(default=0, max_length=100)),
                ('price', models.DecimalField(decimal_places=2, default=0, max_digits=10)),
                ('blue_pen', models.PositiveIntegerField(default=0, verbose_name='Blue Pen Quantity')),
                ('black_pen', models.PositiveIntegerField(default=0, verbose_name='Black Pen Quantity')),
                ('fountain_pen', models.PositiveIntegerField(default=0, verbose_name='Fountain Pen Quantity')),
                ('pencil', models.PositiveIntegerField(default=0, verbose_name='Pencil Quantity')),
                ('adhesive_tape', models.PositiveIntegerField(default=0, verbose_name='Adhesive Tape Quantity')),
                ('stapler', models.PositiveIntegerField(default=0, verbose_name='Stapler Quantity')),
                ('punch', models.PositiveIntegerField(default=0, verbose_name='Punch Quantity')),
                ('notepad', models.PositiveIntegerField(default=0, verbose_name='Notepad Quantity')),
                ('paper_clips', models.PositiveIntegerField(default=0, verbose_name='Paper Clips Quantity')),
                ('binder_clips', models.PositiveIntegerField(default=0, verbose_name='Binder Clips Quantity')),
            ],
        ),
    ]