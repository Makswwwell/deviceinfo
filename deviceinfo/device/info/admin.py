from django.contrib import admin
from .models import DeviceInfo, GroupDevices, DevicePoint


# Register your models here.

class SettingsDeviceInfo(admin.ModelAdmin):
    list_display = ['id', 'info']
    list_display_links = ['id']
    search_fields = ['info']
    list_editable = ['info']
    list_max_show_all = 1000000
    list_per_page = 20


admin.site.register(DeviceInfo, SettingsDeviceInfo)
admin.site.register(GroupDevices)
admin.site.register(DevicePoint)
