let activeElement = null;
let offsetX = 0;
let offsetY = 0;
let deleteButton = null; // Globalna zmienna dla przycisku usuń
let countRouters = 0;
let countSwitches = 0;
let countPrinters = 0;
let countWorkstations = 0;
let countEthernet = 0;
let countOffice_Supplies = 0;
let countConsole = 0;
let countTV = 0;
let countDesk = 0;



const toolboxItems = document.querySelectorAll(".toolbox-item");

toolboxItems.forEach((item) => {
  item.addEventListener("mousedown", mouseDownOriginal, false);
});

window.addEventListener("mousemove", moveElement, false);
window.addEventListener("mouseup", mouseUp, false);
window.addEventListener("mousedown", windowMouseDown, false); // Dodajemy nasłuchiwacz zdarzeń

function mouseDownOriginal(e) {
  if (e.button === 0) { // LPM
    e.preventDefault();

    const original = e.currentTarget;
    createClone(original, e.clientX, e.clientY);
  }
}

function createClone(element, clientX, clientY) {
  activeElement = element.cloneNode(true);
  document.body.appendChild(activeElement);
  activeElement.classList.add("clone");

  activeElement.style.position = "absolute";
  activeElement.style.pointerEvents = "none";
  activeElement.isNewElement = true; // Dodajemy flagę do nowego klonu

  offsetX = clientX - element.getBoundingClientRect().left;
  offsetY = clientY - element.getBoundingClientRect().top;

  setClonePosition(clientX, clientY);

  activeElement.addEventListener("mousedown", mouseDownClone, false);
  activeElement.addEventListener("contextmenu", contextMenu, false);
}

function mouseDownClone(e) {
  if (e.button === 0) { // LPM
    e.preventDefault();
    activeElement = e.currentTarget;
    offsetX = e.clientX - activeElement.getBoundingClientRect().left;
    offsetY = e.clientY - activeElement.getBoundingClientRect().top;
  }
}

function setClonePosition(clientX, clientY) {
  const mouseX = clientX - offsetX;
  const mouseY = clientY - offsetY;

  activeElement.style.left = `${mouseX}px`;
  activeElement.style.top = `${mouseY}px`;
}

function moveElement(e) {
  if (activeElement) {
    setClonePosition(e.clientX, e.clientY);
  }
}

function mouseUp() {
  if (activeElement) {
    if (isInsideCanvas(activeElement)) {
      if (activeElement.isNewElement) {
        countNetworkDevices(activeElement);
      }
      activeElement.style.pointerEvents = "auto";
      delete activeElement.isNewElement;
    } else {
      // Jeśli element został przesunięty poza obszar canvas, zmniejszamy licznik
      if (!activeElement.isNewElement) {
        decrementDeviceCount(activeElement);
      }
      activeElement.remove();
    }
    activeElement = null;
  }
}


function isInsideCanvas(element) {
  const canvas = document.querySelector('#myCanvas');

  if (!canvas) {
    console.error("Element canvas nie został znaleziony.");
    return false;
  }

  const canvasRect = canvas.getBoundingClientRect();
  const elementRect = element.getBoundingClientRect();

  return (
    elementRect.top >= canvasRect.top - elementRect.height * 0.5 &&
    elementRect.left >= canvasRect.left - elementRect.width * 0.5 &&
    elementRect.right <= canvasRect.right + elementRect.width * 0.5 &&
    elementRect.bottom <= canvasRect.bottom + elementRect.height * 0.5
  );
}

function contextMenu(e) {
  e.preventDefault();
  createDeleteButton(e.currentTarget, e.clientX, e.clientY);
}

function createDeleteButton(element, posX, posY) {
  removeDeleteButton(); // Usuwamy poprzedni przycisk usuń, jeśli istnieje

  deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.style.position = "absolute";
  deleteButton.style.left = `${posX}px`;
  deleteButton.style.top = `${posY}px`;
  deleteButton.style.zIndex = "1000";

  deleteButton.onclick = function () {
    decrementDeviceCount(element); // Zmniejszamy licznik urządzenia
    element.remove();
    removeDeleteButton();
  };

  document.body.appendChild(deleteButton);
}

function removeDeleteButton() {
  if (deleteButton) {
    deleteButton.remove();
    deleteButton = null;
  }
}

function windowMouseDown(e) {
  // Jeśli kliknięcie nastąpiło poza przyciskiem usuń, usuwamy przycisk
  if (e.target !== deleteButton) {
    removeDeleteButton();
  }
}


// zliczanie elementów
function countNetworkDevices(element) {
  const type = element.getAttribute('data-type');
  switch (type) {
    case 'printer':
      countPrinters++;
      break;

    case 'switch':
      countSwitches++;
      break;

    case 'router':
      countRouters++;
      break;

    case 'workstation':
      countWorkstations++;
      break;

    case 'ethernet':
      countEthernet++;
      break;

    case 'office_supplies':
      countOffice_Supplies++;
      break;

    case 'console':
      countConsole++;
      break;

    case 'tv':
      countTV++;
      break;

    case 'desk':
      countDesk++;
      break;

  }
  updateStorage(); // Aktualizujemy localStorage
}

//usuwanie i zmniejszanie ilosci w storage
function decrementDeviceCount(element) {
  const type = element.getAttribute('data-type');
  switch (type) {
    case 'printer':
      countPrinters--;
      break;

    case 'switch':
      countSwitches--;
      break;

    case 'router':
      countRouters--;
      break;

    case 'workstation':
      countWorkstations--;
      break;

    case 'ethernet':
      countEthernet--;
      break;

    case 'office_supplies':
      countOffice_Supplies--;
      break;

    case 'console':
      countConsole--;
      break;

    case 'tv':
      countTV--;
      break;

    case 'desk':
      countDesk--;
      break;
  }
  updateStorage();
}

function updateStorage() {
  localStorage.setItem("routerCount", countRouters);
  localStorage.setItem("switchCount", countSwitches);
  localStorage.setItem("printerCount", countPrinters);
  localStorage.setItem("workstationCount", countWorkstations);
  localStorage.setItem("ethernetCount", countEthernet);
  localStorage.setItem("office_suppliesCount", countOffice_Supplies);
  localStorage.setItem("consoleCount", countConsole);
  localStorage.setItem("tvCount", countTV);
  localStorage.setItem("deskCount", countDesk);
}

function saveDevicesCount() {
  var cartUrl = "{% url 'cart' %}"; // Użyj tagu szablonu Django do wygenerowania URL
  window.location.href = cartUrl; // Przekieruj do wygenerowanego URL
}

//usuniecie ilosci po przeladowaniu strony
function resetCounts() {
  countRouters = 0;
  countSwitches = 0;
  countPrinters = 0;
  countWorkstations = 0;
  countEthernet = 0;
  countOffice_Supplies = 0;
  countConsole = 0;
  countTV = 0;
  countDesk = 0;

  updateStorage(); // Aktualizujemy localStorage z nowymi wartościami
}
document.addEventListener('DOMContentLoaded', resetCounts);