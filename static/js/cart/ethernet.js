var currentEthernet = null;
var currentRowIndex = null;

function openEthernetModal(rowIndex) {
    document.getElementById('ethernetModal').style.display = 'block';
    currentRowIndex = rowIndex;
    loadEthernetList();
}

function closeEthernetModal() {
    document.getElementById('ethernetModal').style.display = 'none';
    event.stopPropagation();
    document.getElementById('ethernetModal').style.display = 'none';
}

function stopPropagation(event) {
    event.stopPropagation();
}

document.addEventListener('keydown', function (event) {
    if (event.key === "Escape") {
        closeEthernetModal();
    }
});

function loadEthernetList() {
    fetch('/api/ethernetSocket/')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            var ethernetList = document.getElementById('ethernetList');
            ethernetList.innerHTML = '';
            data.forEach(function (ethernetObj, index) {
                var ethernetElement = document.createElement('div');
                ethernetElement.className = 'ethernetElement';
                ethernetElement.innerHTML = ethernetObj.manufacturer + ' ' + ethernetObj.model;
                ethernetElement.addEventListener('click', function () {
                    showEthernetDescription(ethernetObj, this);
                });
                ethernetList.appendChild(ethernetElement);

                if (currentEthernet && currentEthernet.manufacturer === ethernetObj.manufacturer && currentEthernet.model === ethernetObj.model) {
                    ethernetElement.classList.add('activeElement');
                }
            });
        })
        .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
        });
}

function showEthernetDescription(ethernetObj, element) {
    var elements = document.getElementsByClassName('ethernetElement');
    for (var i = 0; i < elements.length; i++) {
        elements[i].classList.remove('activeElement');
    }

    if (element) {
        element.classList.add('activeElement');
    }

    currentEthernet = ethernetObj;

    var ethernetDescription = document.getElementById('ethernetDescription');
    ethernetDescription.innerHTML =
        'Manufacturer: ' + ethernetObj.manufacturer + '<br>' +
        'Model: ' + ethernetObj.model + '<br>' +
        'Price: ' + ethernetObj.price + '<br>' +
        'Manufacturer Code: ' + ethernetObj.manufacturer_code + '<br>' +
        'Type: ' + ethernetObj.type + '<br>' +
        'Category: ' + ethernetObj.category + '<br>' +
        'Mounting: ' + ethernetObj.mounting + '<br>' +
        'Height: ' + ethernetObj.height + ' mm<br>' +
        'Width: ' + ethernetObj.width + ' mm<br>' +
        'Depth: ' + ethernetObj.depth + ' mm<br>' +
        'Visible Depth: ' + ethernetObj.visible_depth + ' mm<br>' +
        'Color: ' + ethernetObj.color + '<br>' +
        'Image:  <br>' + (ethernetObj.image ? '<img src="' + ethernetObj.image + '" alt="Ethernet Image" class="Image">' : 'No image available') + '<br>';

    currentEthernet = ethernetObj;
}

function acceptEthernet() {
    if (currentEthernet && currentRowIndex !== null) {
        var table = document.getElementById("ethernetSection");
        var button = table.rows[currentRowIndex].cells[1].getElementsByTagName('button')[0];
        var priceCell = table.rows[currentRowIndex].cells[2];

        button.innerText = currentEthernet.manufacturer + ' ' + currentEthernet.model;
        priceCell.innerText = currentEthernet.price ? currentEthernet.price : 'Not available';
        closeEthernetModal();
        updateTotalPrice();
    }
}

function noChoiceEthernet() {
    if (currentRowIndex !== null) {
        var table = document.getElementById("ethernetSection");
        var button = table.rows[currentRowIndex].cells[1].getElementsByTagName('button')[0];
        var priceCell = table.rows[currentRowIndex].cells[2];

        button.innerText = '----------';
        priceCell.innerText = '0';
        closeEthernetModal();
        updateTotalPrice();
    }
}

window.addEventListener('load', function () {
    var ethernetCount = localStorage.getItem('ethernetCount') || 0;
    var table = document.getElementById("ethernetSection");

    for (var i = 0; i < ethernetCount; i++) {
        var row = table.insertRow(-1);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2); // Dodanie komórki na cenę

        cell1.innerHTML = "Ethernet";
        var chooseButton = document.createElement('button');
        chooseButton.innerText = 'Choose';
        (function (rowIndex) {
            chooseButton.onclick = function () { openEthernetModal(rowIndex); };
        })(i);
        cell2.appendChild(chooseButton);
        cell3.innerHTML = '0'; // Początkowa wartość ceny
    }
});
