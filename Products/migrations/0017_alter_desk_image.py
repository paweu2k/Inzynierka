# Generated by Django 4.2.9 on 2024-01-28 17:26

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Products', '0016_cable'),
    ]

    operations = [
        migrations.AlterField(
            model_name='desk',
            name='image',
            field=models.ImageField(default='images/desk_images/default_no_image.png', upload_to='images/desk_images/'),
        ),
    ]
