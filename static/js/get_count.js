document.addEventListener('DOMContentLoaded', (event) => {
    var count = localStorage.getItem('printerCount') || 0; // Default to 0 if nothing is stored
    document.getElementById('printerCountDisplay').innerText = `${count}`;

    var count = localStorage.getItem('switchCount') || 0; // Default to 0 if nothing is stored
    document.getElementById('switchCountDisplay').innerText = `${count}`;

    var count = localStorage.getItem('routerCount') || 0; // Default to 0 if nothing is stored
    document.getElementById('routerCountDisplay').innerText = `${count}`;

    var count = localStorage.getItem('workstationCount') || 0; // Default to 0 if nothing is stored
    document.getElementById('workstationCountDisplay').innerText = `${count}`;

    var count = localStorage.getItem('ethernetCount') || 0; // Default to 0 if nothing is stored
    document.getElementById('ethernetCountDisplay').innerText = `${count}`;

    var count = localStorage.getItem('office_suppliesCount') || 0; // Default to 0 if nothing is stored
    document.getElementById('office_suppliesCountDisplay').innerText = `${count}`;

    var count = localStorage.getItem('consoleCount') || 0; // Default to 0 if nothing is stored
    document.getElementById('consoleCountDisplay').innerText = `${count}`;

    var count = localStorage.getItem('tvCount') || 0; // Default to 0 if nothing is stored
    document.getElementById('tvCountDisplay').innerText = `${count}`;

    var count = localStorage.getItem('deskCount') || 0; // Default to 0 if nothing is stored
    document.getElementById('deskCountDisplay').innerText = `${count}`;

    var count = localStorage.getItem('dtotalRedLineLength') || 0; // Default to 0 if nothing is stored
    document.getElementById('totalRedLineLengthDisplay').innerText = `${count}`;

});
