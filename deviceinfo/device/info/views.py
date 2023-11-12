from django.shortcuts import render
from .models import DeviceInfo, DevicePoint, GroupDevices


class Adapter:
    data = {"data": [], "column": [], "countColumn": 0}
    column = list()
    dataResponse = list()

    def init_state(self):
        self.data = {"data": [], "column": [], "countColumn": 0}

    def update_send(self):
        self.data["column"] = self.column
        self.data["data"] = self.dataResponse
        self.data["countColumn"] = len(self.data["column"])


def response_list_devices(request):
    adapter = Adapter()
    column = ['ID', 'name_devices', 'point', 'datetime']
    adapter.column = column
    all_devices = DevicePoint.objects.all()
    temp_all_devices = list()
    for item in all_devices:
        temp_all_devices.append(
            [(item.id, column[0]), (item.model.info, column[1]), (item.point, column[2]), (item.datetime, column[3])])
    adapter.dataResponse = temp_all_devices
    adapter.update_send()

    return render(request, "public/home.html", context=adapter.data)


def response_list_groups(request):
    adapter = Adapter()
    column = ['ID', 'name_group', 'names_devices']
    adapter.column = column
    all_group = GroupDevices.objects.all()
    temp_all_group = list()
    for item in all_group:
        names_devices = ''
        temp_id = list(map(int, item.names.split(',')))
        temp_devices_for_group = DeviceInfo.objects.filter(id__in=temp_id).values_list("info")
        for name_item in temp_devices_for_group:
            names_devices += name_item[0] + ' '
        temp_all_group.append([(item.id, column[0]), (item.name_group, column[1]), (names_devices, column[2])])
    adapter.dataResponse = temp_all_group
    adapter.update_send()

    return render(request, "public/list_group.html", context=adapter.data)


def response_create_group(request):
    adapter = Adapter()
    if request.method == "POST":
        pass
    else:
        pass
    return render(request, "public/create_group.html")
