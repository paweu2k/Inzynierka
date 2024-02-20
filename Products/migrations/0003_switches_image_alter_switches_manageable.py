# Generated by Django 4.2.9 on 2024-01-24 17:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Products', '0002_switches_delete_deviceproposal_delete_switch'),
    ]

    operations = [
        migrations.AddField(
            model_name='switches',
            name='image',
            field=models.ImageField(default='path/to/default/image.jpg', upload_to='switches_images/'),
        ),
        migrations.AlterField(
            model_name='switches',
            name='manageable',
            field=models.CharField(choices=[('Yes', 'Yes'), ('No', 'No')], max_length=3),
        ),
    ]
