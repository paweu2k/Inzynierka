var currentRouter = null;
var currentRowIndex = null;

function openRouterModal(rowIndex) {
    document.getElementById('routerModal').style.display = 'block';
    currentRowIndex = rowIndex;
    loadRouterList();
}

function closeRouterModal() {
    document.getElementById('routerModal').style.display = 'none';
    event.stopPropagation();
}

function stopPropagation(event) {
    event.stopPropagation();
}

document.addEventListener('keydown', function (event) {
    if (event.key === "Escape") {
        closeRouterModal();
    }
});

function loadRouterList() {
    fetch('/api/router/')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            var routerList = document.getElementById('routerList');
            routerList.innerHTML = '';
            data.forEach(function (routerObj) {
                var routerElement = document.createElement('div');
                routerElement.className = 'routerElement';
                routerElement.innerHTML = routerObj.manufacturer + ' ' + routerObj.model;
                routerElement.addEventListener('click', function () {
                    showRouterDescription(routerObj, this);
                });
                routerList.appendChild(routerElement);

                if (currentRouter && currentRouter.manufacturer === routerObj.manufacturer && currentRouter.model === routerObj.model) {
                    routerElement.classList.add('activeElement');
                }
            });
        })
        .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
        });
}

function showRouterDescription(routerObj, element) {
    var elements = document.getElementsByClassName('routerElement');
    for (var i = 0; i < elements.length; i++) {
        elements[i].classList.remove('activeElement');
    }

    if (element) {
        element.classList.add('activeElement');
    }

    currentRouter = routerObj;
    var routerDescription = document.getElementById('routerDescription');
    routerDescription.innerHTML =
        'Manufacturer: ' + routerObj.manufacturer + '<br>' +
        'Model: ' + routerObj.model + '<br>' +
        'Price: ' + routerObj.price + '<br>' +
        'Manufacturer Code: ' + routerObj.manufacturer_code + '<br>' +
        'Supported Networks: ' + routerObj.supported_networks + '<br>' +
        'WiFi Standard: ' + routerObj.wifi_standard + '<br>' +
        'Mesh System: ' + routerObj.mesh_system + '<br>' +
        'VPN Support: ' + routerObj.vpn_support + '<br>' +
        'QoS: ' + routerObj.qos + '<br>' +
        'Print Server: ' + routerObj.print_server + '<br>' +
        'Encryption Standard: ' + routerObj.encryption_standard + '<br>' +
        'WAN Ports: ' + routerObj.wan_ports + '<br>' +
        'LAN Ports Number: ' + routerObj.lan_ports_number + '<br>' +
        'SIM Socket: ' + routerObj.sim_socket + '<br>' +
        'Antennas: ' + routerObj.antennas + '<br>' +
        'Transmission Speed 2.4GHz: ' + routerObj.transmission_speed_24ghz + '<br>' +
        'Transmission Speed 5GHz: ' + routerObj.transmission_speed_5ghz + '<br>' +
        'Width (mm): ' + routerObj.width_mm + '<br>' +
        'Height (mm): ' + routerObj.height_mm + '<br>' +
        'Depth (mm): ' + routerObj.depth_mm + '<br>' +
        'Image:  <br>' + (routerObj.image ? '<img src="' + routerObj.image + '" alt="Router Image" class="Image">' : 'No image available') + '<br>';

    currentRouter = routerObj;
}



function acceptRouter() {
    if (currentRouter && currentRowIndex !== null) {
        var table = document.getElementById("routerSection");
        var button = table.rows[currentRowIndex].cells[1].getElementsByTagName('button')[0];
        var priceCell = table.rows[currentRowIndex].cells[2];

        button.innerText = currentRouter.manufacturer + ' ' + currentRouter.model;
        priceCell.innerText = currentRouter.price ? currentRouter.price : 'Not available';
        closeRouterModal();
        updateTotalPrice();
    }
}

function noChoiceRouter() {
    if (currentRowIndex !== null) {
        var table = document.getElementById("routerSection");
        var button = table.rows[currentRowIndex].cells[1].getElementsByTagName('button')[0];
        var priceCell = table.rows[currentRowIndex].cells[2];

        button.innerText = '----------';
        priceCell.innerText = '0';
        closeRouterModal();
        updateTotalPrice();
    }
}

window.addEventListener('load', function () {
    var routerCount = localStorage.getItem('routerCount') || 0;
    var table = document.getElementById("routerSection");

    for (var i = 0; i < routerCount; i++) {
        var row = table.insertRow(-1);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2); // Dodanie komórki na cenę

        cell1.innerHTML = "Router";
        var chooseButton = document.createElement('button');
        chooseButton.innerText = 'Choose';
        (function (rowIndex) {
            chooseButton.onclick = function () { openRouterModal(rowIndex); };
        })(i);
        cell2.appendChild(chooseButton);
        cell3.innerHTML = '0'; // Początkowa wartość ceny
    }
});