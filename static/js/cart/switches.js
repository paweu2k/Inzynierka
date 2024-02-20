var currentSwitch = null;
var currentRowIndex = null;

function openSwitchModal(rowIndex) {
    document.getElementById('switchModal').style.display = 'block';
    currentRowIndex = rowIndex;
    loadSwitchList();
}

function closeSwitchModal() {
    document.getElementById('switchModal').style.display = 'none';
    event.stopPropagation();
    document.getElementById('switchModal').style.display = 'none';
}

function stopPropagation(event) {
    event.stopPropagation();
}

document.addEventListener('keydown', function (event) {
    if (event.key === "Escape") {
        closeSwitchModal();
    }
});

function loadSwitchList() {
    fetch('/api/switches/')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            var switchList = document.getElementById('switchList');
            switchList.innerHTML = '';
            data.forEach(function (switchObj, index) {
                var switchElement = document.createElement('div');
                switchElement.className = 'switchElement';
                switchElement.innerHTML = switchObj.manufacturer + ' ' + switchObj.model;
                switchElement.addEventListener('click', function () {
                    showSwitchDescription(switchObj, this);
                });
                switchList.appendChild(switchElement);

                if (currentSwitch && currentSwitch.manufacturer === switchObj.manufacturer && currentSwitch.model === switchObj.model) {
                    switchElement.classList.add('activeElement');
                }
            });
        })
        .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
        });
}

function showSwitchDescription(switchObj, element) {
    var elements = document.getElementsByClassName('switchElement');
    for (var i = 0; i < elements.length; i++) {
        elements[i].classList.remove('activeElement');
    }

    if (element) {
        element.classList.add('activeElement');
    }

    currentSwitch = switchObj;

    var switchDescription = document.getElementById('switchDescription');
    switchDescription.innerHTML =
        'Manufacturer: ' + switchObj.manufacturer + '<br>' +
        'Model: ' + switchObj.model + '<br>' +
        'Price: ' + switchObj.price + '<br>' +
        'Manufacturer Code: ' + switchObj.manufacturer_code + '<br>' +
        'Port Architecture: ' + switchObj.port_architecture + '<br>' +
        'Manageable: ' + switchObj.manageable + '<br>' +
        'Bus Speed: ' + switchObj.bus_speed + '<br>' +
        'Throughput: ' + switchObj.throughput + '<br>' +
        'Total Ports: ' + switchObj.total_ports + '<br>' +
        'SFP Ports: ' + switchObj.sfp_ports + '<br>' +
        'PoE Ports: ' + switchObj.poe_ports + '<br>' +
        'Enclosure Type: ' + switchObj.enclosure_type + '<br>' +
        'Width (mm): ' + switchObj.width_mm + '<br>' +
        'Height (mm): ' + switchObj.height_mm + '<br>' +
        'Depth (mm): ' + switchObj.depth_mm + '<br>' +
        'Image:  <br>' + (switchObj.image ? '<img src="' + switchObj.image + '" alt="Switch Image" class="Image">' : 'No image available') + '<br>';

    currentSwitch = switchObj;
}

function acceptSwitch() {
    if (currentSwitch && currentRowIndex !== null) {
        var table = document.getElementById("switchSection");
        var button = table.rows[currentRowIndex].cells[1].getElementsByTagName('button')[0];
        var priceCell = table.rows[currentRowIndex].cells[2];

        button.innerText = currentSwitch.manufacturer + ' ' + currentSwitch.model;
        priceCell.innerText = currentSwitch.price ? currentSwitch.price : 'Not available';
        closeSwitchModal();
        updateTotalPrice();
    }
}

function noChoiceSwitch() {
    if (currentRowIndex !== null) {
        var table = document.getElementById("switchSection");
        var button = table.rows[currentRowIndex].cells[1].getElementsByTagName('button')[0];
        var priceCell = table.rows[currentRowIndex].cells[2];

        button.innerText = 'No device - choose one';
        priceCell.innerText = '0';
        closeSwitchModal();
        updateTotalPrice();
    }
}

window.addEventListener('load', function () {
    var switchCount = localStorage.getItem('switchCount') || 0;
    var table = document.getElementById("switchSection");

    for (var i = 0; i < switchCount; i++) {
        var row = table.insertRow(-1);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2); // Dodanie komórki na cenę

        cell1.innerHTML = "Switch";
        var chooseButton = document.createElement('button');
        chooseButton.innerText = 'Choose';
        (function (rowIndex) {
            chooseButton.onclick = function () { openSwitchModal(rowIndex); };
        })(i);
        cell2.appendChild(chooseButton);
        cell3.innerHTML = '0'; // Początkowa wartość ceny
    }
});
