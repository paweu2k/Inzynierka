var currentPrinter = null;
var currentRowIndex = null;

function openPrinterModal(rowIndex) {
    document.getElementById('printerModal').style.display = 'block';
    currentRowIndex = rowIndex;
    loadPrinterList();
}

function closePrinterModal() {
    document.getElementById('printerModal').style.display = 'none';
    event.stopPropagation();
    document.getElementById('printerModal').style.display = 'none';
}

function stopPropagation(event) {
    event.stopPropagation();
}

document.addEventListener('keydown', function (event) {
    if (event.key === "Escape") {
        closePrinterModal();
    }
});

function loadPrinterList() {
    fetch('/api/printer/')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            var printerList = document.getElementById('printerList');
            printerList.innerHTML = '';
            data.forEach(function (printerObj, index) {
                var printerElement = document.createElement('div');
                printerElement.className = 'printerElement';
                printerElement.innerHTML = printerObj.manufacturer + ' ' + printerObj.model;
                printerElement.addEventListener('click', function () {
                    showPrinterDescription(printerObj, this);
                });
                printerList.appendChild(printerElement);

                if (currentPrinter && currentPrinter.manufacturer === printerObj.manufacturer && currentPrinter.model === printerObj.model) {
                    printerElement.classList.add('activeElement');
                }
            });
        })
        .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
        });
}

function showPrinterDescription(printerObj, element) {
    var elements = document.getElementsByClassName('printerElement');
    for (var i = 0; i < elements.length; i++) {
        elements[i].classList.remove('activeElement');
    }

    if (element) {
        element.classList.add('activeElement');
    }

    currentPrinter = printerObj;

    var printerDescription = document.getElementById('printerDescription');
    printerDescription.innerHTML =
        'Manufacturer: ' + printerObj.manufacturer + '<br>' +
        'Model: ' + printerObj.model + '<br>' +
        'Price: ' + printerObj.price + '<br>' +
        'Manufacturer Code: ' + printerObj.manufacturer_code + '<br>' +
        'Type: ' + printerObj.type + '<br>' +
        'Maximum Print Format: ' + printerObj.maximum_print_format + '<br>' +
        'Print Resolution (Black): ' + printerObj.print_resolution_black + '<br>' +
        'Print Resolution (Color): ' + printerObj.print_resolution_color + '<br>' +
        'Print Speed (Black): ' + printerObj.print_speed_black + '<br>' +
        'Print Speed (Color): ' + printerObj.print_speed_color + '<br>' +
        'Duty Cycle: ' + printerObj.duty_cycle + '<br>' +
        'Automatic Duplex Printing: ' + (printerObj.automatic_duplex_printing ? 'Yes' : 'No') + '<br>' +
        'Output Tray Capacity: ' + printerObj.output_tray_capacity + '<br>' +
        'Input Tray Capacity: ' + printerObj.input_tray_capacity + '<br>' +
        'Display: ' + printerObj.display + '<br>' +
        'Memory: ' + printerObj.memory + '<br>' +
        'Wired Network Support: ' + (printerObj.wired_network_support ? 'Yes' : 'No') + '<br>' +
        'Interface: ' + printerObj.interface + '<br>' +
        'Wi-Fi: ' + (printerObj.wifi ? 'Yes' : 'No') + '<br>' +
        'Bluetooth: ' + (printerObj.bluetooth ? 'Yes' : 'No') + '<br>' +
        'Height (cm): ' + printerObj.height_cm + '<br>' +
        'Width (cm): ' + printerObj.width_cm + '<br>' +
        'Depth (cm): ' + printerObj.depth_cm + '<br>' +
        'Weight (kg): ' + printerObj.weight_kg + '<br>' +
        'Color: ' + printerObj.color + '<br>' +
        'Image:  <br>' + (printerObj.image ? '<img src="' + printerObj.image + '" alt="Printer Image" class="Image">' : 'No image available') + '<br>';

    currentPrinter = printerObj;
}

function acceptPrinter() {
    if (currentPrinter && currentRowIndex !== null) {
        var table = document.getElementById("printerSection");
        var button = table.rows[currentRowIndex].cells[1].getElementsByTagName('button')[0];
        var priceCell = table.rows[currentRowIndex].cells[2];

        button.innerText = currentPrinter.manufacturer + ' ' + currentPrinter.model;
        priceCell.innerText = currentPrinter.price ? currentPrinter.price : 'Not available';
        closePrinterModal();
        updateTotalPrice();
    }
}

function noChoicePrinter() {
    if (currentRowIndex !== null) {
        var table = document.getElementById("printerSection");
        var button = table.rows[currentRowIndex].cells[1].getElementsByTagName('button')[0];
        var priceCell = table.rows[currentRowIndex].cells[2];

        button.innerText = '----------';
        priceCell.innerText = '0';
        closePrinterModal();
        updateTotalPrice();
    }
}

window.addEventListener('load', function () {
    var printerCount = localStorage.getItem('printerCount') || 0;
    var table = document.getElementById("printerSection");

    for (var i = 0; i < printerCount; i++) {
        var row = table.insertRow(-1);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2); // Dodanie komórki na cenę

        cell1.innerHTML = "Printer";
        var chooseButton = document.createElement('button');
        chooseButton.innerText = 'Choose';
        (function (rowIndex) {
            chooseButton.onclick = function () { openPrinterModal(rowIndex); };
        })(i);
        cell2.appendChild(chooseButton);
        cell3.innerHTML = '0'; // Początkowa wartość ceny
    }
});
