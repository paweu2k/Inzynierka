var currentWorkstation = null;
var currentRowIndex = null;

function openWorkstationModal(rowIndex) {
    document.getElementById('workstationModal').style.display = 'block';
    currentRowIndex = rowIndex;
    loadWorkstationList();
}

function closeWorkstationModal() {
    document.getElementById('workstationModal').style.display = 'none';
    event.stopPropagation();
    document.getElementById('workstationModal').style.display = 'none';
}

function stopPropagation(event) {
    event.stopPropagation();
}

document.addEventListener('keydown', function (event) {
    if (event.key === "Escape") {
        closeWorkstationModal();
    }
});

function loadWorkstationList() {
    fetch('/api/workstation/')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            var workstationList = document.getElementById('workstationList');
            workstationList.innerHTML = '';
            data.forEach(function (workstationObj, index) {
                var workstationElement = document.createElement('div');
                workstationElement.className = 'workstationElement';
                workstationElement.innerHTML = workstationObj.manufacturer + ' ' + workstationObj.model;
                workstationElement.addEventListener('click', function () {
                    showWorkstationDescription(workstationObj, this);
                });
                workstationList.appendChild(workstationElement);

                if (currentWorkstation && currentWorkstation.manufacturer === workstationObj.manufacturer && currentWorkstation.model === workstationObj.model) {
                    workstationElement.classList.add('activeElement');
                }
            });
        })
        .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
        });
}

function showWorkstationDescription(workstationObj, element) {
    var elements = document.getElementsByClassName('workstationElement');
    for (var i = 0; i < elements.length; i++) {
        elements[i].classList.remove('activeElement');
    }

    if (element) {
        element.classList.add('activeElement');
    }

    currentWorkstation = workstationObj;

    var workstationDescription = document.getElementById('workstationDescription');
    workstationDescription.innerHTML =
        'Manufacturer: ' + workstationObj.manufacturer + '<br>' +
        'Model: ' + workstationObj.model + '<br>' +
        'Price: ' + workstationObj.price + '<br>' +
        'Manufacturer Code: ' + workstationObj.manufacturer_code + '<br>' +
        'Case Type: ' + workstationObj.case_type + '<br>' +
        'Operating System: ' + workstationObj.operating_system + '<br>' +
        'Optical Drive: ' + (workstationObj.optical_drive ? 'Yes' : 'No') + '<br>' +
        'Wi-Fi: ' + (workstationObj.wifi ? 'Yes' : 'No') + '<br>' +
        'Bluetooth: ' + (workstationObj.bluetooth ? 'Yes' : 'No') + '<br>' +
        'Built-in Speakers: ' + (workstationObj.built_in_speakers ? 'Yes' : 'No') + '<br>' +
        'Processor Model: ' + workstationObj.processor_model + '<br>' +
        'Core Count: ' + workstationObj.core_count + '<br>' +
        'Base Frequency: ' + workstationObj.base_frequency + '<br>' +
        'RAM Size: ' + workstationObj.ram_size + '<br>' +
        'RAM Type: ' + workstationObj.ram_type + '<br>' +
        'HDD Capacity: ' + workstationObj.hdd_capacity + '<br>' +
        'SSD Capacity: ' + workstationObj.ssd_capacity + '<br>' +
        'Graphics Chipset: ' + workstationObj.graphics_chipset + '<br>' +
        'Sound Card: ' + workstationObj.sound_card + '<br>' +
        'Network Card: ' + workstationObj.network_card + '<br>' +
        'Memory Card Reader: ' + (workstationObj.memory_card_reader ? 'Yes' : 'No') + '<br>' +
        'Image:  <br>' + (workstationObj.image ? '<img src="' + workstationObj.image + '" alt="Workstation Image" class="Image">' : 'No image available') + '<br>';

    currentWorkstation = workstationObj;
}

function acceptWorkstation() {
    if (currentWorkstation && currentRowIndex !== null) {
        var table = document.getElementById("workstationSection");
        var button = table.rows[currentRowIndex].cells[1].getElementsByTagName('button')[0];
        var priceCell = table.rows[currentRowIndex].cells[2];

        button.innerText = currentWorkstation.manufacturer + ' ' + currentWorkstation.model;
        priceCell.innerText = currentWorkstation.price ? currentWorkstation.price : 'Not available';
        closeWorkstationModal();
        updateTotalPrice();
    }
}

function noChoiceWorkstation() {
    if (currentRowIndex !== null) {
        var table = document.getElementById("workstationSection");
        var button = table.rows[currentRowIndex].cells[1].getElementsByTagName('button')[0];
        var priceCell = table.rows[currentRowIndex].cells[2];

        button.innerText = '----------';
        priceCell.innerText = '0';
        closeWorkstationModal();
        updateTotalPrice();
    }
}

window.addEventListener('load', function () {
    var workstationCount = localStorage.getItem('workstationCount') || 0;
    var table = document.getElementById("workstationSection");

    for (var i = 0; i < workstationCount; i++) {
        var row = table.insertRow(-1);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2); // Dodanie komórki na cenę

        cell1.innerHTML = "Workstation";
        var chooseButton = document.createElement('button');
        chooseButton.innerText = 'Choose';
        (function (rowIndex) {
            chooseButton.onclick = function () { openWorkstationModal(rowIndex); };
        })(i);
        cell2.appendChild(chooseButton);
        cell3.innerHTML = '0'; // Początkowa wartość ceny
    }
});
