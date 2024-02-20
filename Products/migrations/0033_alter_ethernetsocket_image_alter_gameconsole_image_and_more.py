# Generated by Django 4.2.9 on 2024-02-17 12:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Products', '0032_alter_tv_smart_tv'),
    ]

    operations = [
        migrations.AlterField(
            model_name='ethernetsocket',
            name='image',
            field=models.ImageField(default='images/ethernet_images/default_no_image.png', upload_to='images/ethernet_images/'),
        ),
        migrations.AlterField(
            model_name='gameconsole',
            name='image',
            field=models.ImageField(default='images/gameConsole_images/default_no_image.png', upload_to='images/gameConsole_images/'),
        ),
        migrations.AlterField(
            model_name='printer',
            name='image',
            field=models.ImageField(default='images/printers_images/default_no_image.png', upload_to='images/printers_images/'),
        ),
        migrations.AlterField(
            model_name='routers',
            name='image',
            field=models.ImageField(default='images/routers_images/default_no_image.png', upload_to='images/routers_images/'),
        ),
        migrations.AlterField(
            model_name='switches',
            name='image',
            field=models.ImageField(default='images/switches_images/default_no_image.png', upload_to='images/switches_images/'),
        ),
        migrations.AlterField(
            model_name='tv',
            name='image',
            field=models.ImageField(default='images/tv_images/default_no_image.png', upload_to='images/tv_images/'),
        ),
        migrations.AlterField(
            model_name='workstation',
            name='image',
            field=models.ImageField(default='images/workstations_images/default_no_image.png', upload_to='images/workstations_images/'),
        ),
    ]