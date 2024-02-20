var currentTV = null;
var currentRowIndex = null;

function openTVModal(rowIndex) {
    document.getElementById('tvModal').style.display = 'block';
    currentRowIndex = rowIndex;
    loadTVList();
}

function closeTVModal() {
    document.getElementById('tvModal').style.display = 'none';
    event.stopPropagation();
}

function stopPropagation(event) {
    event.stopPropagation();
}

document.addEventListener('keydown', function (event) {
    if (event.key === "Escape") {
        closeTVModal();
    }
});

function loadTVList() {
    fetch('/api/tv/')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            var tvList = document.getElementById('tvList');
            tvList.innerHTML = '';
            data.forEach(function (tvObj) {
                var tvElement = document.createElement('div');
                tvElement.className = 'tvElement';
                tvElement.innerHTML = tvObj.manufacturer + ' ' + tvObj.model;
                tvElement.addEventListener('click', function () {
                    showTVDescription(tvObj, this);
                });
                tvList.appendChild(tvElement);

                if (currentTV && currentTV.manufacturer === tvObj.manufacturer && currentTV.model === tvObj.model) {
                    tvElement.classList.add('activeElement');
                }
            });
        })
        .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
        });
}

function showTVDescription(tvObj, element) {
    var elements = document.getElementsByClassName('tvElement');
    for (var i = 0; i < elements.length; i++) {
        elements[i].classList.remove('activeElement');
    }

    if (element) {
        element.classList.add('activeElement');
    }

    currentTV = tvObj;

    var tvDescription = document.getElementById('tvDescription');
    tvDescription.innerHTML =
        'Manufacturer: ' + tvObj.manufacturer + '<br>' +
        'Model: ' + tvObj.model + '<br>' +
        'Price: ' + tvObj.price + '<br>' +
        'Manufacturer Code: ' + tvObj.manufacturer_code + '<br>' +
        'Frame Color: ' + tvObj.frame_color + '<br>' +
        'Matrix Type: ' + tvObj.matrix_type + '<br>' +
        'Screen Size (inches): ' + tvObj.screen_size_inches + '<br>' +
        'Screen Size (cm): ' + tvObj.screen_size_cm + '<br>' +
        'HD Format: ' + tvObj.hd_format + '<br>' +
        'Resolution: ' + tvObj.resolution + '<br>' +
        'Refresh Rate: ' + tvObj.refresh_rate + '<br>' +
        'Tuner: ' + tvObj.tuner + '<br>' +
        'HDR Technology: ' + tvObj.hdr_technology + '<br>' +
        'Game Mode: ' + (tvObj.game_mode ? 'Yes' : 'No') + '<br>' +
        'Backlight Type: ' + tvObj.backlight_type + '<br>' +
        'Smart TV: ' + tvObj.smart_tv + '<br>' +
        'Wi-Fi: ' + (tvObj.wifi ? 'Yes' : 'No') + '<br>' +
        'Bluetooth: ' + (tvObj.bluetooth ? 'Yes' : 'No') + '<br>' +
        'HDMI Ports: ' + tvObj.hdmi + '<br>' +
        'HbbTV: ' + (tvObj.hbbtv ? 'Yes' : 'No') + '<br>' +
        'ARC: ' + (tvObj.arc ? 'Yes' : 'No') + '<br>' +
        'Ambilight: ' + (tvObj.ambilight ? 'Yes' : 'No') + '<br>' +
        'Dolby Technologies: ' + tvObj.dolby_technologies + '<br>' +
        'Total Speaker Power: ' + tvObj.total_speaker_power + '<br>' +
        'Number of Speakers: ' + tvObj.number_of_speakers + '<br>' +
        'Number of HDMI Ports: ' + tvObj.number_of_hdmi_ports + '<br>' +
        'SCART Connector: ' + (tvObj.scart_connector ? 'Yes' : 'No') + '<br>' +
        'Ethernet Port: ' + (tvObj.ethernet_port ? 'Yes' : 'No') + '<br>' +
        'CI Slot: ' + (tvObj.ci_slot ? 'Yes' : 'No') + '<br>' +
        'New Energy Class: ' + tvObj.new_energy_class + '<br>' +
        'Height with Stand (cm): ' + tvObj.height_with_stand + '<br>' +
        'Width with Stand (cm): ' + tvObj.width_with_stand + '<br>' +
        'Depth with Stand (cm): ' + tvObj.depth_with_stand + '<br>' +
        'Image:  <br>' + (tvObj.image ? '<img src="' + tvObj.image + '" alt="TV Image" class="Image">' : 'No image available') + '<br>';

    currentTV = tvObj;
}


function acceptTV() {
    if (currentTV && currentRowIndex !== null) {
        var table = document.getElementById("tvSection");
        var button = table.rows[currentRowIndex].cells[1].getElementsByTagName('button')[0];
        var priceCell = table.rows[currentRowIndex].cells[2];

        button.innerText = currentTV.manufacturer + ' ' + currentTV.model;
        priceCell.innerText = currentTV.price ? currentTV.price : 'Not available';
        closeTVModal();
        updateTotalPrice();
    }
}

function noChoiceTV() {
    if (currentRowIndex !== null) {
        var table = document.getElementById("tvSection");
        var button = table.rows[currentRowIndex].cells[1].getElementsByTagName('button')[0];
        var priceCell = table.rows[currentRowIndex].cells[2];

        button.innerText = '----------';
        priceCell.innerText = '0';
        closeTVModal();
        updateTotalPrice();
    }
}

window.addEventListener('load', function () {
    var tvCount = localStorage.getItem('tvCount') || 0;
    var table = document.getElementById("tvSection");

    for (var i = 0; i < tvCount; i++) {
        var row = table.insertRow(-1);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2); // Dodanie komórki na cenę

        cell1.innerHTML = "TV";
        var chooseButton = document.createElement('button');
        chooseButton.innerText = 'Choose';
        (function (rowIndex) {
            chooseButton.onclick = function () { openTVModal(rowIndex); };
        })(i);
        cell2.appendChild(chooseButton);
        cell3.innerHTML = '0'; // Początkowa wartość ceny
    }
});
