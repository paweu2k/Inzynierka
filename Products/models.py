# models.py
from django.db import models

class Switches(models.Model):
    MANAGEABLE_CHOICES = (
        ('Yes', 'Yes'),
        ('No', 'No'),
    )

    manufacturer = models.CharField(max_length=100)
    model = models.CharField(max_length=100)
    manufacturer_code = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    port_architecture = models.CharField(max_length=100)
    manageable = models.CharField(max_length=3, choices=MANAGEABLE_CHOICES)
    bus_speed = models.CharField(max_length=100)
    throughput = models.CharField(max_length=100)
    total_ports = models.IntegerField()
    sfp_ports = models.IntegerField()
    poe_ports = models.CharField(max_length=100)
    enclosure_type = models.CharField(max_length=100)
    width_mm = models.DecimalField(max_digits=6, decimal_places=2)
    height_mm = models.DecimalField(max_digits=6, decimal_places=2)
    depth_mm = models.DecimalField(max_digits=6, decimal_places=2)
    image = models.ImageField(upload_to='images/switches_images/', default='images/switches_images/default_no_image.png')


    def __str__(self):
        return f"{self.manufacturer} {self.model}"

class Routers(models.Model):
    manufacturer = models.CharField(max_length=100)
    model = models.CharField(max_length=100)
    manufacturer_code = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    supported_networks = models.CharField(max_length=100)
    wifi_standard = models.CharField(max_length=100)
    mesh_system = models.BooleanField(default=False)
    vpn_support = models.BooleanField(default=False)
    qos = models.BooleanField(default=False, verbose_name="QoS (Traffic Control)")
    print_server = models.BooleanField(default=False)
    encryption_standard = models.CharField(max_length=100)
    wan_ports = models.PositiveIntegerField()
    lan_ports_number = models.PositiveIntegerField()
    sim_socket = models.BooleanField(default=False)
    antennas = models.PositiveIntegerField()
    transmission_speed_24ghz = models.CharField(max_length=100, verbose_name="Transmission Speed 2.4GHz")
    transmission_speed_5ghz = models.CharField(max_length=100, verbose_name="Transmission Speed 5GHz")
    width_mm = models.PositiveIntegerField(verbose_name="Width [mm]")
    height_mm = models.PositiveIntegerField(verbose_name="Height [mm]")
    depth_mm = models.PositiveIntegerField(verbose_name="Depth [mm]")
    image = models.ImageField(upload_to='images/routers_images/', default='images/routers_images/default_no_image.png')

    def __str__(self):
        return f"{self.manufacturer} {self.model}"


class Printer(models.Model):
    manufacturer = models.CharField(max_length=100)
    model = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    manufacturer_code = models.CharField(max_length=100)
    type = models.CharField(max_length=100)
    maximum_print_format = models.CharField(max_length=100)
    print_resolution_black = models.CharField(max_length=100)
    print_resolution_color = models.CharField(max_length=100)
    print_speed_black = models.CharField(max_length=100)
    print_speed_color = models.CharField(max_length=100)
    duty_cycle = models.CharField(max_length=100)
    automatic_duplex_printing = models.BooleanField(default=False)
    output_tray_capacity = models.CharField(max_length=100)
    input_tray_capacity = models.CharField(max_length=100)
    display = models.BooleanField(default=False)
    memory = models.CharField(max_length=100)
    wired_network_support = models.BooleanField(default=False)
    interface = models.CharField(max_length=100)
    wifi = models.BooleanField(default=False)
    bluetooth = models.BooleanField(default=False)
    height_cm = models.CharField(max_length=100)
    width_cm = models.CharField(max_length=100)
    depth_cm = models.CharField(max_length=100)
    weight_kg = models.CharField(max_length=100)
    color = models.CharField(max_length=100)
    image = models.ImageField(upload_to='images/printers_images/', default='images/printers_images/default_no_image.png')

    def __str__(self):
        return f"{self.manufacturer} {self.model}"

class Workstation(models.Model):
    manufacturer = models.CharField(max_length=100)
    model = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    manufacturer_code = models.CharField(max_length=100)
    case_type = models.CharField(max_length=100)
    operating_system = models.CharField(max_length=100)
    optical_drive = models.BooleanField(default=False)
    wifi = models.BooleanField(default=False)
    bluetooth = models.BooleanField(default=False)
    built_in_speakers = models.BooleanField(default=False)
    processor_model = models.CharField(max_length=100)
    core_count = models.PositiveIntegerField()
    base_frequency = models.DecimalField(max_digits=6, decimal_places=2)
    ram_size = models.PositiveIntegerField()
    ram_type = models.CharField(max_length=100)
    hdd_capacity = models.PositiveIntegerField()
    ssd_capacity = models.PositiveIntegerField()
    graphics_chipset = models.CharField(max_length=100)
    sound_card = models.CharField(max_length=100)
    network_card = models.CharField(max_length=100)
    memory_card_reader = models.BooleanField(default=False)
    image = models.ImageField(upload_to='images/workstations_images/', default='images/workstations_images/default_no_image.png')

    def __str__(self):
        return f"{self.manufacturer} {self.model}"


class EthernetSocket(models.Model):
    manufacturer = models.CharField(max_length=100)
    model = models.CharField(max_length=100)
    manufacturer_code = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    type = models.CharField(max_length=100)
    category = models.CharField(max_length=100)
    mounting = models.CharField(max_length=100)
    height = models.DecimalField(max_digits=6, decimal_places=2)
    width = models.DecimalField(max_digits=6, decimal_places=2)
    depth = models.DecimalField(max_digits=6, decimal_places=2)
    visible_depth = models.DecimalField(max_digits=6, decimal_places=2)
    color = models.CharField(max_length=100)
    image = models.ImageField(upload_to='images/ethernet_images/', default='images/ethernet_images/default_no_image.png')

    def __str__(self):
        return f"{self.manufacturer} {self.model}"

class GameConsole(models.Model):
    manufacturer = models.CharField(max_length=100)
    model = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    manufacturer_code = models.CharField(max_length=100)
    console_version = models.CharField(max_length=100)
    color = models.CharField(max_length=100)
    number_of_controllers_in_set = models.PositiveIntegerField()
    processor = models.CharField(max_length=100)
    clock_speed = models.CharField(max_length=100)
    graphics_system = models.CharField(max_length=100)
    ram_memory = models.CharField(max_length=100)
    hard_drive = models.CharField(max_length=100)
    wifi = models.BooleanField(default=False)
    bluetooth = models.BooleanField(default=False)
    optical_drive = models.BooleanField(default=False)
    number_of_usb_ports = models.PositiveIntegerField()
    video_output = models.CharField(max_length=100)
    ethernet = models.BooleanField(default=False)
    height_mm = models.DecimalField(max_digits=6, decimal_places=2)
    width_mm = models.DecimalField(max_digits=6, decimal_places=2)
    depth_mm = models.DecimalField(max_digits=6, decimal_places=2)
    image = models.ImageField(upload_to='images/gameConsole_images/', default='images/gameConsole_images/default_no_image.png')

    def __str__(self):
        return f"{self.manufacturer} {self.model}"

class TV(models.Model):
    manufacturer = models.CharField(max_length=100)
    model = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    manufacturer_code = models.CharField(max_length=100)
    frame_color = models.CharField(max_length=100)
    matrix_type = models.CharField(max_length=100)
    screen_size_inches = models.DecimalField(max_digits=5, decimal_places=2)
    screen_size_cm = models.DecimalField(max_digits=5, decimal_places=2)
    hd_format = models.CharField(max_length=100)
    resolution = models.CharField(max_length=100)
    refresh_rate = models.CharField(max_length=100)
    tuner = models.CharField(max_length=100)
    hdr_technology = models.CharField(max_length=100)
    game_mode = models.BooleanField(default=False)
    backlight_type = models.CharField(max_length=100)
    smart_tv = models.CharField(max_length=100)
    wifi = models.BooleanField(default=False)
    bluetooth = models.BooleanField(default=False)
    hdmi = models.PositiveIntegerField()
    hbbtv = models.BooleanField(default=False)
    arc = models.BooleanField(default=False)
    ambilight = models.BooleanField(default=False)
    dolby_technologies = models.CharField(max_length=100)
    total_speaker_power = models.CharField(max_length=100)
    number_of_speakers = models.PositiveIntegerField()
    number_of_hdmi_ports = models.PositiveIntegerField()
    scart_connector = models.BooleanField(default=False)
    ethernet_port = models.BooleanField(default=False)
    ci_slot = models.BooleanField(default=False)
    new_energy_class = models.CharField(max_length=100)
    height_with_stand = models.DecimalField(max_digits=6, decimal_places=2)
    width_with_stand = models.DecimalField(max_digits=6, decimal_places=2)
    depth_with_stand = models.DecimalField(max_digits=6, decimal_places=2)
    image = models.ImageField(upload_to='images/tv_images/', default='images/tv_images/default_no_image.png')

    def __str__(self):
        return f"{self.manufacturer} {self.model}"


class Desk(models.Model):
    manufacturer = models.CharField(max_length=100)
    model = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    manufacturer_code = models.CharField(max_length=100)
    type = models.CharField(max_length=100)
    illumination = models.BooleanField(default=False)
    height_adjustment = models.BooleanField(default=False)
    dominant_color = models.CharField(max_length=100)
    width = models.DecimalField(max_digits=6, decimal_places=2)
    depth = models.DecimalField(max_digits=6, decimal_places=2)
    height = models.DecimalField(max_digits=6, decimal_places=2)
    image = models.ImageField(upload_to='images/desk_images/', default='images/desk_images/default_no_image.png')

    def __str__(self):
        return f"{self.manufacturer} {self.model}"

class OfficeSupplies(models.Model):
    banded_pack = models.CharField(max_length=100, default=0)
    price = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    blue_pen = models.PositiveIntegerField(default=0, verbose_name='Blue Pen Quantity')
    black_pen = models.PositiveIntegerField(default=0, verbose_name='Black Pen Quantity')
    fountain_pen = models.PositiveIntegerField(default=0, verbose_name='Fountain Pen Quantity')
    pencil = models.PositiveIntegerField(default=0, verbose_name='Pencil Quantity')
    adhesive_tape = models.PositiveIntegerField(default=0, verbose_name='Adhesive Tape Quantity')
    stapler = models.PositiveIntegerField(default=0, verbose_name='Stapler Quantity')
    punch = models.PositiveIntegerField(default=0, verbose_name='Punch Quantity')
    notepad = models.PositiveIntegerField(default=0, verbose_name='Notepad Quantity')
    paper_clips = models.PositiveIntegerField(default=0, verbose_name='Paper Clips Quantity')
    binder_clips = models.PositiveIntegerField(default=0, verbose_name='Binder Clips Quantity')

    def __str__(self):
        return f"{self.banded_pack}, {self.price}"

class Cable(models.Model):
    manufacturer = models.CharField(max_length=100, verbose_name='Manufacturer')
    model = models.CharField(max_length=100, verbose_name='Model')
    price = models.DecimalField(max_digits=10, decimal_places=2)
    color = models.CharField(max_length=100, verbose_name='Color')
    type = models.CharField(max_length=100, verbose_name='Type')
    length = models.DecimalField(max_digits=10, decimal_places=2, default=1)
    category = models.CharField(max_length=100, verbose_name='Category')
    shielding = models.CharField(max_length=100, verbose_name='Shielding')
    cores = models.CharField(max_length=100, verbose_name='Cores')
    insulation = models.CharField(max_length=100, verbose_name='Insulation')
    packaging_dimensions = models.CharField(max_length=100, verbose_name='Packaging Dimensions (WxDxH cm)')

    def __str__(self):
        return f"{self.manufacturer} {self.model}"

