from django.shortcuts import redirect, render
from django.http import HttpResponse
from django.contrib.auth.models import User
from django.contrib import messages
from django.contrib.auth import authenticate, login, logout, get_user_model
from inzynierka import settings
from django.core.mail import send_mail, EmailMessage
from django.contrib.sites.shortcuts import get_current_site
from django.template.loader import render_to_string
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.utils.encoding import force_bytes, force_str
from .tokens import generate_token
from django.http import JsonResponse
from .models import *

def home(request):
    return render(request, "Products/index.html")

def switches_list(request):
    switches = Switches.objects.all().values('id', 'manufacturer', 'model', 'price', 'manufacturer_code', 'port_architecture', 'manageable', 'bus_speed', 'throughput', 'total_ports', 'sfp_ports', 'poe_ports', 'enclosure_type', 'width_mm', 'height_mm', 'depth_mm', 'image' )
    return JsonResponse(list(switches), safe=False)

def routers_list(request):
    routers = Routers.objects.all().values('id', 'manufacturer', 'model', 'price', 'manufacturer_code', 'supported_networks', 'wifi_standard', 'mesh_system', 'vpn_support', 'qos', 'print_server', 'encryption_standard', 'wan_ports', 'lan_ports_number', 'sim_socket', 'antennas', 'transmission_speed_24ghz', 'transmission_speed_5ghz', 'width_mm', 'height_mm', 'depth_mm'
, 'image' )
    return JsonResponse(list(routers), safe=False)

def desk_list(request):
    desk = Desk.objects.all().values('id', 'manufacturer', 'model', 'price', 'manufacturer_code', 'type', 'illumination', 'height_adjustment', 'dominant_color', 'width', 'depth', 'height', 'image' )
    return JsonResponse(list(desk), safe=False)

def printers_list(request):
    printers = Printer.objects.all().values('id', 'manufacturer', 'model', 'price', 'manufacturer_code', 'type', 'maximum_print_format', 'print_resolution_black', 'print_resolution_color', 'print_speed_black', 'print_speed_color', 'duty_cycle', 'automatic_duplex_printing', 'output_tray_capacity', 'input_tray_capacity', 'display', 'memory', 'wired_network_support', 'interface', 'wifi', 'bluetooth', 'height_cm', 'width_cm', 'depth_cm', 'weight_kg', 'color'
, 'image' )
    return JsonResponse(list(printers), safe=False)

def workstations_list(request):
    workstations = Workstation.objects.all().values('id', 'manufacturer', 'model', 'price', 'manufacturer_code', 'case_type', 'operating_system', 'optical_drive', 'wifi', 'bluetooth', 'built_in_speakers', 'processor_model', 'core_count', 'base_frequency', 'ram_size', 'ram_type', 'hdd_capacity', 'ssd_capacity', 'graphics_chipset', 'sound_card', 'network_card', 'memory_card_reader'
, 'image' )
    return JsonResponse(list(workstations), safe=False)

def ethernetSocket_list(request):
    ethernetSocket = EthernetSocket.objects.all().values('id', 'manufacturer', 'model', 'price', 'type', 'category', 'mounting', 'height', 'width', 'depth', 'visible_depth', 'color', 'image' )
    return JsonResponse(list(ethernetSocket), safe=False)

def gameConsole_list(request):
    gameConsole = GameConsole.objects.all().values('id', 'manufacturer', 'model', 'price', 'manufacturer_code', 'console_version', 'color', 'number_of_controllers_in_set', 'processor', 'clock_speed', 'graphics_system', 'ram_memory', 'hard_drive', 'wifi', 'bluetooth', 'optical_drive', 'number_of_usb_ports', 'video_output', 'ethernet', 'height_mm', 'width_mm', 'depth_mm'
, 'image' )
    return JsonResponse(list(gameConsole), safe=False)

def tv_list(request):
    tv = TV.objects.all().values('id', 'manufacturer', 'model', 'price', 'manufacturer_code', 'frame_color', 'matrix_type', 'screen_size_inches', 'screen_size_cm', 'hd_format', 'resolution', 'refresh_rate', 'tuner', 'hdr_technology', 'game_mode', 'backlight_type', 'smart_tv', 'wifi', 'bluetooth', 'hdmi', 'hbbtv', 'arc', 'ambilight', 'dolby_technologies', 'total_speaker_power', 'number_of_speakers', 'number_of_hdmi_ports', 'scart_connector', 'ethernet_port', 'ci_slot', 'new_energy_class', 'height_with_stand', 'width_with_stand', 'depth_with_stand'
, 'image' )
    return JsonResponse(list(tv), safe=False)

def officeSupplies_list(request):
    officeSupplies = OfficeSupplies.objects.all().values('id', 'banded_pack', 'price', 'blue_pen', 'black_pen', 'fountain_pen', 'pencil', 'adhesive_tape', 'stapler', 'punch', 'notepad', 'paper_clips', 'binder_clips')
    return JsonResponse(list(officeSupplies), safe=False)

def cable_list(request):
    cable = Cable.objects.all().values('id', 'manufacturer', 'model', 'price', 'color', 'type', 'length', 'category', 'shielding', 'cores', 'insulation', 'packaging_dimensions')
    return JsonResponse(list(cable), safe=False)

def signup(request):
    if request.method == "POST":
        username = request.POST['username']
        fname = request.POST['fname']
        lname = request.POST['lname']
        email = request.POST['email']
        pass1 = request.POST['pass1']
        pass2 = request.POST['pass2']

        if User.objects.filter(username=username):
            messages.error(request, "Username already exist! Please try some other username")
            return render(request, "Products/signup.html")

        if User.objects.filter(email=email):
            messages.error(request, "Email already exist!")
            return render(request, "Products/signup.html")

        if len(username) > 10:
            messages.error(request, "Username must be under 10 characters")
            return render(request, "Products/signup.html")

        if len(pass1) < 10:
            messages.error(request, "Password must be over 10 characters!")
            return render(request, "Products/signup.html")

        if pass1 != pass2:
            messages.error(request, "Password didn't match!")
            return render(request, "Products/signup.html")

        if not username.isalnum():
            messages.error(request, "Username must be Alpha-Numeric!")
            return render(request, "Products/signup.html")

        myuser = User.objects.create_user(username, email, pass1)
        myuser.first_name = fname
        myuser.last_name = lname
        myuser.is_active = False
        myuser.save()

        messages.success(request,
                         "Your account has been successfully created. We have sent you a confirmation email, please confirm your email in order to activate your account.")

        # Welcome email

        subject = "Welcome to Building Schematics App!"
        message = "Hello " + myuser.first_name + "!! \n" + "Welcome to Network Building Calc! \nThank you for visiting our website \nWe have also sent you a confirmation email, please confirm your email address in order to activate your account. \n\nYours sincerely\nPawel Glodzik"
        from_email = settings.EMAIL_HOST_USER
        to_list = [myuser.email]
        send_mail(subject, message, from_email, to_list, fail_silently=True)

        # Email address confirmation email

        current_site = get_current_site(request)
        email_subject = "Confirm your email @ Building Schematics App!"
        message2 = render_to_string('email_confirmation.html', {
            'name': myuser.first_name,
            'domain': current_site.domain,
            'uid': urlsafe_base64_encode(force_bytes(myuser.pk)),
            'token': generate_token.make_token(myuser)
        })

        email = EmailMessage(
            email_subject,
            message2,
            settings.EMAIL_HOST_USER,
            [myuser.email],
        )
        email.fail_silently = True
        email.send()

        return redirect('signin')

    return render(request, "Products/signup.html")


def signin(request):
    if request.method == "POST":
        username = request.POST['username']
        pass1 = request.POST['pass1']

        user = authenticate(username=username, password=pass1)

        if user is not None:
            login(request, user)
            fname = user.first_name
            #return render(request, "drawing/drawing.html", {'fname': fname})
            return render(request,"drawing/drawing.html")

        else:
            messages.error(request, "Bad Credentials")
            return redirect('signin')

    return render(request, "Products/signin.html")


def signout(request):
    logout(request)
    messages.success(request, "Logged Out Successfully!")
    return redirect('home')


def cart(request):
    return render(request, "drawing/cart.html")

def activate(request, uidb64, token):
    try:
        uid = force_str(urlsafe_base64_decode(uidb64))
        myuser = User.objects.get(pk=uid)
    except (TypeError, ValueError, OverflowError, User.DoesNotExist):
        myuser = None

    if myuser is not None and generate_token.check_token(myuser, token):
        myuser.is_active = True
        myuser.save()
        login(request, myuser)
        return render(request,"drawing/drawing.html")
    else:
        return render(request, 'activation_failed.html')

def drawing_page(request):
    if request.user.is_authenticated:
        return render(request, "drawing/drawing.html")
    else:
        return redirect('signin')