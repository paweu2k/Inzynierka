# Generated by Django 4.2.9 on 2024-01-27 17:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Products', '0010_workstation'),
    ]

    operations = [
        migrations.CreateModel(
            name='EthernetSocket',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('manufacturer', models.CharField(max_length=100)),
                ('model', models.CharField(max_length=100)),
                ('price', models.DecimalField(decimal_places=2, max_digits=10)),
                ('type', models.CharField(max_length=100)),
                ('category', models.CharField(max_length=100)),
                ('mounting', models.CharField(max_length=100)),
                ('height', models.DecimalField(decimal_places=2, max_digits=6)),
                ('width', models.DecimalField(decimal_places=2, max_digits=6)),
                ('depth', models.DecimalField(decimal_places=2, max_digits=6)),
                ('visible_depth', models.DecimalField(decimal_places=2, max_digits=6)),
                ('color', models.CharField(max_length=100)),
                ('image', models.ImageField(default='ethernet_images/default_no_image.png', upload_to='ethernet_images/')),
            ],
        ),
    ]
