var currentCable = null;
var currentRowIndex = null;
var totalRedLineLengthInMeter = (localStorage.getItem('totalRedLineLength') || 0) / 100 * 1.1;

function openCableModal(rowIndex) {
    document.getElementById('cableModal').style.display = 'block';
    currentRowIndex = rowIndex;
    loadCableList();
}

function closeCableModal() {
    document.getElementById('cableModal').style.display = 'none';
    event.stopPropagation();
    document.getElementById('cableModal').style.display = 'none';
}

function stopPropagation(event) {
    event.stopPropagation();
}

document.addEventListener('keydown', function (event) {
    if (event.key === "Escape") {
        closeCableModal();
    }
});

function loadCableList() {
    fetch('/api/cable/')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            var cableList = document.getElementById('cableList');
            cableList.innerHTML = '';
            data.forEach(function (cableObj) {
                var cableElement = document.createElement('div');
                cableElement.className = 'cableElement';
                cableElement.innerHTML = cableObj.manufacturer + ' ' + cableObj.model;
                cableElement.addEventListener('click', function () {
                    showCableDescription(cableObj, this);
                });
                cableList.appendChild(cableElement);

                if (currentCable && currentCable.manufacturer === cableObj.manufacturer && currentCable.model === cableObj.model) {
                    cableElement.classList.add('activeElement');
                }
            });
        })
        .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
        });
}

function showCableDescription(cableObj, element) {
    var elements = document.getElementsByClassName('cableElement');
    for (var i = 0; i < elements.length; i++) {
        elements[i].classList.remove('activeElement');
    }

    if (element) {
        element.classList.add('activeElement');
    }

    currentCable = cableObj;

    var cableDescription = document.getElementById('cableDescription');
    cableDescription.innerHTML =
        'Manufacturer: ' + cableObj.manufacturer + '<br>' +
        'Model: ' + cableObj.model + '<br>' +
        'Price: ' + cableObj.price + '<br>' +
        'Color: ' + cableObj.color + '<br>' +
        'Type: ' + cableObj.type + '<br>' +
        'Length: ' + cableObj.length + ' meters<br>' +
        'Category: ' + cableObj.category + '<br>' +
        'Shielding: ' + cableObj.shielding + '<br>' +
        'Cores: ' + cableObj.cores + '<br>' +
        'Insulation: ' + cableObj.insulation + '<br>' +
        'Packaging Dimensions: ' + cableObj.packaging_dimensions + '<br>';

    currentCable = cableObj;
}

function acceptCable() {
    if (currentCable && currentRowIndex !== null) {
        var table = document.getElementById("cableSection");
        var button = table.rows[currentRowIndex].cells[1].getElementsByTagName('button')[0];
        var priceCell = table.rows[currentRowIndex].cells[2];

        var roundedLength = Math.ceil(totalRedLineLengthInMeter);
        var totalPrice = roundedLength * currentCable.price;

        button.innerText = currentCable.manufacturer + ' ' + currentCable.model;
        priceCell.innerText = totalPrice.toFixed(2) + ' zł';

        closeCableModal();
        updateTotalPrice();
    }
}

function noChoiceCable() {
    if (currentRowIndex !== null) {
        var table = document.getElementById("cableSection");
        var button = table.rows[currentRowIndex].cells[1].getElementsByTagName('button')[0];
        var priceCell = table.rows[currentRowIndex].cells[2];

        button.innerText = '----------';
        priceCell.innerText = '0';
        closeCableModal();
        updateTotalPrice();
    }
}

window.addEventListener('load', function () {
    var cableCount = localStorage.getItem('totalRedLineLength') || 0;
    var table = document.getElementById("cableSection");
    var totalRedLineLengthInMeter = cableCount / 100 * 1.1;
    var row = table.insertRow(-1);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);

    cell1.innerHTML = "You need " + totalRedLineLengthInMeter.toFixed(1) + " m of ethernet cable. (10% added to stock)";
    var chooseButton = document.createElement('button');
    chooseButton.innerText = 'Choose';
    chooseButton.onclick = function () { openCableModal(0); };
    cell2.appendChild(chooseButton);
    cell3.innerHTML = '0';
});
