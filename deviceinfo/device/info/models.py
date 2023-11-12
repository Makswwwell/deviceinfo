from django.db import models


# Create your models here.
class DeviceInfo(models.Model):
    info = models.CharField(max_length=255)


class DevicePoint(models.Model):
    model = models.ForeignKey(DeviceInfo, on_delete=models.CASCADE)
    point = models.FloatField()
    datetime = models.DateTimeField()


class GroupDevices(models.Model):
    names = models.CharField(max_length=255, default='')
    name_group = models.CharField(max_length=255, default='')
