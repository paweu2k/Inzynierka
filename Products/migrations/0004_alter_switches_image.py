# Generated by Django 4.2.9 on 2024-01-24 17:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Products', '0003_switches_image_alter_switches_manageable'),
    ]

    operations = [
        migrations.AlterField(
            model_name='switches',
            name='image',
            field=models.ImageField(default='switches_images/default_no_image.png', upload_to='switches_images/'),
        ),
    ]