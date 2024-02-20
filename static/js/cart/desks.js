// desk.js
var currentDesk = null;
var currentRowIndex = null;

function openDeskModal(rowIndex) {
    document.getElementById('deskModal').style.display = 'block';
    currentRowIndex = rowIndex;
    loadDeskList();
}

function closeDeskModal() {
    document.getElementById('deskModal').style.display = 'none';
    event.stopPropagation();
    document.getElementById('deskModal').style.display = 'none';
}

function stopPropagation(event) {
    event.stopPropagation();
}

document.addEventListener('keydown', function (event) {
    if (event.key === "Escape") {
        closeDeskModal();
    }
});

function loadDeskList() {
    fetch('/api/desk/')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            var deskList = document.getElementById('deskList');
            deskList.innerHTML = '';
            data.forEach(function (deskObj) {
                var deskElement = document.createElement('div');
                deskElement.className = 'deskElement';
                deskElement.innerHTML = deskObj.manufacturer + ' ' + deskObj.model;
                deskElement.addEventListener('click', function () {
                    showDeskDescription(deskObj, this);
                });
                deskList.appendChild(deskElement);

                if (currentDesk && currentDesk.manufacturer === deskObj.manufacturer && currentDesk.model === deskObj.model) {
                    deskElement.classList.add('activeElement');
                }
            });
        })
        .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
        });
}

function showDeskDescription(deskObj, element) {
    var elements = document.getElementsByClassName('deskElement');
    for (var i = 0; i < elements.length; i++) {
        elements[i].classList.remove('activeElement');
    }

    if (element) {
        element.classList.add('activeElement');
    }

    currentDesk = deskObj;

    var deskDescription = document.getElementById('deskDescription');
    deskDescription.innerHTML =
        'Manufacturer: ' + deskObj.manufacturer + '<br>' +
        'Model: ' + deskObj.model + '<br>' +
        'Price: ' + deskObj.price + '<br>' +
        'Manufacturer Code: ' + deskObj.manufacturer_code + '<br>' +
        'Type: ' + deskObj.type + '<br>' +
        'Illumination: ' + (deskObj.illumination ? 'Yes' : 'No') + '<br>' +
        'Height Adjustment: ' + (deskObj.height_adjustment ? 'Yes' : 'No') + '<br>' +
        'Dominant Color: ' + deskObj.dominant_color + '<br>' +
        'Width (mm): ' + deskObj.width + '<br>' +
        'Depth (mm): ' + deskObj.depth + '<br>' +
        'Height (mm): ' + deskObj.height + '<br>' +
        'Image: <br>' + (deskObj.image ? '<img src="' + deskObj.image + '" alt="Desk Image" class="Image">' : 'No image available') + '<br>';

    currentDesk = deskObj;
}

function acceptDesk() {
    if (currentDesk && currentRowIndex !== null) {
        var table = document.getElementById("deskSection");
        var button = table.rows[currentRowIndex].cells[1].getElementsByTagName('button')[0];
        var priceCell = table.rows[currentRowIndex].cells[2];

        button.innerText = currentDesk.manufacturer + ' ' + currentDesk.model;
        priceCell.innerText = currentDesk.price ? currentDesk.price : 'Not available';
        closeDeskModal();
        updateTotalPrice();
    }
}

function noChoiceDesk() {
    if (currentRowIndex !== null) {
        var table = document.getElementById("deskSection");
        var button = table.rows[currentRowIndex].cells[1].getElementsByTagName('button')[0];
        var priceCell = table.rows[currentRowIndex].cells[2];

        button.innerText = '----------';
        priceCell.innerText = '0';
        closeDeskModal();
        updateTotalPrice();
    }
}

window.addEventListener('load', function () {
    var deskCount = localStorage.getItem('deskCount') || 0;
    var table = document.getElementById("deskSection");

    for (var i = 0; i < deskCount; i++) {
        var row = table.insertRow(-1);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2); // Dodanie komórki na cenę

        cell1.innerHTML = "Desk";
        var chooseButton = document.createElement('button');
        chooseButton.innerText = 'Choose';
        (function (rowIndex) {
            chooseButton.onclick = function () { openDeskModal(rowIndex); };
        })(i);
        cell2.appendChild(chooseButton);
        cell3.innerHTML = '0'; // Początkowa wartość ceny
    }
});

