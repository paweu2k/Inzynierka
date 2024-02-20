var currentOfficeSupplies = null;
var currentRowIndex = null;

function openOfficeSuppliesModal(rowIndex) {
    document.getElementById('officeSuppliesModal').style.display = 'block';
    currentRowIndex = rowIndex;
    loadOfficeSuppliesList();
}

function closeOfficeSuppliesModal() {
    document.getElementById('officeSuppliesModal').style.display = 'none';
    event.stopPropagation();
    document.getElementById('officeSuppliesModal').style.display = 'none';
}

function stopPropagation(event) {
    event.stopPropagation();
}

document.addEventListener('keydown', function (event) {
    if (event.key === "Escape") {
        closeOfficeSuppliesModal();
    }
});

function loadOfficeSuppliesList() {
    fetch('/api/officeSupplies/')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            var officeSuppliesList = document.getElementById('officeSuppliesList');
            officeSuppliesList.innerHTML = '';
            data.forEach(function (officeSuppliesObj, index) {
                var officeSuppliesElement = document.createElement('div');
                officeSuppliesElement.className = 'officeSuppliesElement';
                officeSuppliesElement.innerHTML = 'Banded Pack:' + ' ' + officeSuppliesObj.banded_pack;
                officeSuppliesElement.addEventListener('click', function () {
                    showOfficeSuppliesDescription(officeSuppliesObj, this);
                });
                officeSuppliesList.appendChild(officeSuppliesElement);

                if (currentOfficeSupplies && currentOfficeSupplies.banded_pack === officeSuppliesObj.banded_pack) {
                    officeSuppliesElement.classList.add('activeElement');
                }
            });
        })
        .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
        });
}

function showOfficeSuppliesDescription(officeSuppliesObj, element) {
    var elements = document.getElementsByClassName('officeSuppliesElement');
    for (var i = 0; i < elements.length; i++) {
        elements[i].classList.remove('activeElement');
    }

    if (element) {
        element.classList.add('activeElement');
    }

    currentOfficeSupplies = officeSuppliesObj;

    var officeSuppliesDescription = document.getElementById('officeSuppliesDescription');
    officeSuppliesDescription.innerHTML =
        'Banded Pack: ' + officeSuppliesObj.banded_pack + '<br>' +
        'Price: ' + officeSuppliesObj.price + '<br>' +
        'Blue Pen Quantity: ' + officeSuppliesObj.blue_pen + '<br>' +
        'Black Pen Quantity: ' + officeSuppliesObj.black_pen + '<br>' +
        'Fountain Pen Quantity: ' + officeSuppliesObj.fountain_pen + '<br>' +
        'Pencil Quantity: ' + officeSuppliesObj.pencil + '<br>' +
        'Adhesive Tape Quantity: ' + officeSuppliesObj.adhesive_tape + '<br>' +
        'Stapler Quantity: ' + officeSuppliesObj.stapler + '<br>' +
        'Punch Quantity: ' + officeSuppliesObj.punch + '<br>' +
        'Notepad Quantity: ' + officeSuppliesObj.notepad + '<br>' +
        'Paper Clips Quantity: ' + officeSuppliesObj.paper_clips + '<br>' +
        'Binder Clips Quantity: ' + officeSuppliesObj.binder_clips + '<br>';

    currentOfficeSupplies = officeSuppliesObj;
}

function acceptOfficeSupplies() {
    if (currentOfficeSupplies && currentRowIndex !== null) {
        var table = document.getElementById("officeSuppliesSection");
        var button = table.rows[currentRowIndex].cells[1].getElementsByTagName('button')[0];
        var priceCell = table.rows[currentRowIndex].cells[2];

        button.innerText = 'Banded Pack:' + ' ' + currentOfficeSupplies.banded_pack;
        priceCell.innerText = currentOfficeSupplies.price ? currentOfficeSupplies.price : 'Not available';
        closeOfficeSuppliesModal();
        updateTotalPrice();
    }
}

function noChoiceOfficeSupplies() {
    if (currentRowIndex !== null) {
        var table = document.getElementById("officeSuppliesSection");
        var button = table.rows[currentRowIndex].cells[1].getElementsByTagName('button')[0];
        var priceCell = table.rows[currentRowIndex].cells[2];

        button.innerText = '----------';
        priceCell.innerText = '0';
        closeOfficeSuppliesModal();
        updateTotalPrice();
    }
}

window.addEventListener('load', function () {
    var officeSuppliesCount = localStorage.getItem('office_suppliesCount') || 0;
    var table = document.getElementById("officeSuppliesSection");

    for (var i = 0; i < officeSuppliesCount; i++) {
        var row = table.insertRow(-1);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2); // Dodanie komórki na cenę

        cell1.innerHTML = "Office Supplies";
        var chooseButton = document.createElement('button');
        chooseButton.innerText = 'Choose';
        (function (rowIndex) {
            chooseButton.onclick = function () { openOfficeSuppliesModal(rowIndex); };
        })(i);
        cell2.appendChild(chooseButton);
        cell3.innerHTML = '0'; // Początkowa wartość ceny
    }
});
