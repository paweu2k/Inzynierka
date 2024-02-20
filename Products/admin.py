from django.contrib import admin
from .models import Switches, Cable, Routers, Printer, Workstation, EthernetSocket, GameConsole, TV, Desk, OfficeSupplies

admin.site.register(Switches)
admin.site.register(Routers)
admin.site.register(Printer)
admin.site.register(Workstation)
admin.site.register(EthernetSocket)
admin.site.register(GameConsole)
admin.site.register(TV)
admin.site.register(Desk)
admin.site.register(OfficeSupplies)
admin.site.register(Cable)