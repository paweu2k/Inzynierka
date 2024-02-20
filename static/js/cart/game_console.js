var currentConsole = null;
var currentRowIndex = null;

function openConsoleModal(rowIndex) {
    document.getElementById('consoleModal').style.display = 'block';
    currentRowIndex = rowIndex;
    loadConsoleList();
}

function closeConsoleModal() {
    document.getElementById('consoleModal').style.display = 'none';
    event.stopPropagation();
    document.getElementById('consoleModal').style.display = 'none';
}

function stopPropagation(event) {
    event.stopPropagation();
}

document.addEventListener('keydown', function (event) {
    if (event.key === "Escape") {
        closeConsoleModal();
    }
});

function loadConsoleList() {
    fetch('/api/gameConsole/')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            var consoleList = document.getElementById('consoleList');
            consoleList.innerHTML = '';
            data.forEach(function (consoleObj, index) {
                var consoleElement = document.createElement('div');
                consoleElement.className = 'consoleElement';
                consoleElement.innerHTML = consoleObj.manufacturer + ' ' + consoleObj.model;
                consoleElement.addEventListener('click', function () {
                    showConsoleDescription(consoleObj, this);
                });
                consoleList.appendChild(consoleElement);

                if (currentConsole && currentConsole.manufacturer === consoleObj.manufacturer && currentConsole.model === consoleObj.model) {
                    consoleElement.classList.add('activeElement');
                }
            });
        })
        .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
        });
}

function showConsoleDescription(consoleObj, element) {
    var elements = document.getElementsByClassName('consoleElement');
    for (var i = 0; i < elements.length; i++) {
        elements[i].classList.remove('activeElement');
    }

    if (element) {
        element.classList.add('activeElement');
    }

    currentConsole = consoleObj;

    var consoleDescription = document.getElementById('consoleDescription');
    consoleDescription.innerHTML =
        'Manufacturer: ' + consoleObj.manufacturer + '<br>' +
        'Model: ' + consoleObj.model + '<br>' +
        'Price: ' + consoleObj.price + '<br>' +
        'Manufacturer Code: ' + consoleObj.manufacturer_code + '<br>' +
        'Console Version: ' + consoleObj.console_version + '<br>' +
        'Color: ' + consoleObj.color + '<br>' +
        'Number of Controllers in Set: ' + consoleObj.number_of_controllers_in_set + '<br>' +
        'Processor: ' + consoleObj.processor + '<br>' +
        'Clock Speed: ' + consoleObj.clock_speed + ' GHz<br>' +
        'Graphics System: ' + consoleObj.graphics_system + '<br>' +
        'RAM Memory: ' + consoleObj.ram_memory + ' GB<br>' +
        'Hard Drive: ' + consoleObj.hard_drive + '<br>' +
        'Wi-Fi: ' + (consoleObj.wifi ? 'Yes' : 'No') + '<br>' +
        'Bluetooth: ' + (consoleObj.bluetooth ? 'Yes' : 'No') + '<br>' +
        'Optical Drive: ' + (consoleObj.optical_drive ? 'Yes' : 'No') + '<br>' +
        'Number of USB Ports: ' + consoleObj.number_of_usb_ports + '<br>' +
        'Video Output: ' + consoleObj.video_output + '<br>' +
        'Ethernet: ' + (consoleObj.ethernet ? 'Yes' : 'No') + '<br>' +
        'Height (mm): ' + consoleObj.height_mm + ' mm<br>' +
        'Width (mm): ' + consoleObj.width_mm + ' mm<br>' +
        'Depth (mm): ' + consoleObj.depth_mm + ' mm<br>' +
        'Image:  <br>' + (consoleObj.image ? '<img src="' + consoleObj.image + '" alt="Console Image" class="Image">' : 'No image available') + '<br>';

    currentConsole = consoleObj;
}

function acceptConsole() {
    if (currentConsole && currentRowIndex !== null) {
        var table = document.getElementById("consoleSection");
        var button = table.rows[currentRowIndex].cells[1].getElementsByTagName('button')[0];
        var priceCell = table.rows[currentRowIndex].cells[2];

        button.innerText = currentConsole.manufacturer + ' ' + currentConsole.model;
        priceCell.innerText = currentConsole.price ? currentConsole.price : 'Not available';
        closeConsoleModal();
        updateTotalPrice();
    }
}

function noChoiceConsole() {
    if (currentRowIndex !== null) {
        var table = document.getElementById("consoleSection");
        var button = table.rows[currentRowIndex].cells[1].getElementsByTagName('button')[0];
        var priceCell = table.rows[currentRowIndex].cells[2];

        button.innerText = '----------';
        priceCell.innerText = '0';
        closeConsoleModal();
        updateTotalPrice();
    }
}

window.addEventListener('load', function () {
    var consoleCount = localStorage.getItem('consoleCount') || 0;
    var table = document.getElementById("consoleSection");

    for (var i = 0; i < consoleCount; i++) {
        var row = table.insertRow(-1);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2); // Dodanie komórki na cenę

        cell1.innerHTML = "Console";
        var chooseButton = document.createElement('button');
        chooseButton.innerText = 'Choose';
        (function (rowIndex) {
            chooseButton.onclick = function () { openConsoleModal(rowIndex); };
        })(i);
        cell2.appendChild(chooseButton);
        cell3.innerHTML = '0'; // Początkowa wartość ceny
    }
});
