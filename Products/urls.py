from django.contrib import admin
from django.urls import path, include
from . import  views

urlpatterns = [
    path('', views.home, name='home'),
    path('home', views.home, name='home'),
    path('signup', views.signup, name="signup"),
    path('signin', views.signin, name="signin"),
    path('signout', views.signout, name="signout"),
    path('drawing', views.drawing_page, name="drawing"),
    path('activate/<uidb64>/<token>', views.activate, name="activate"),
    path('cart', views.cart, name='cart'),
    path('api/switches/', views.switches_list, name='switches_list'),
    path('api/router/', views.routers_list, name='routers_list'),
    path('api/printer/', views.printers_list, name='printers_list'),
    path('api/workstation/', views.workstations_list, name='workstations_list'),
    path('api/ethernetSocket/', views.ethernetSocket_list, name='ethernetSocket_list'),
    path('api/gameConsole/', views.gameConsole_list, name='gameConsole_list'),
    path('api/tv/', views.tv_list, name='tv_list'),
    path('api/desk/', views.desk_list, name='desk_list'),
    path('api/officeSupplies/', views.officeSupplies_list, name='officeSupplies_list'),
    path('api/cable/', views.cable_list, name='cable_list'),
]


