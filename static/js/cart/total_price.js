function updateTotalPrice() {
    var totalPrice = 0;
    var switchTable = document.getElementById("switchSection");
    var routerTable = document.getElementById("routerSection");
    var deskTable = document.getElementById("deskSection");
    var ethernetTable = document.getElementById("ethernetSection");
    var consoleTable = document.getElementById("consoleSection");
    var officeSuppliesTable = document.getElementById("officeSuppliesSection");
    var printerTable = document.getElementById("printerSection");
    var tvTable = document.getElementById("tvSection");
    var workstationTable = document.getElementById("workstationSection");
    var cableTable = document.getElementById("cableSection");
    var priceCells, price;

    // Calculate total price for switches
    for (var i = 0; i < switchTable.rows.length; i++) {
        priceCells = switchTable.rows[i].cells[2];
        price = parseFloat(priceCells.innerText) || 0;
        totalPrice += price;
    }

    // Calculate total price for routers
    for (var i = 0; i < routerTable.rows.length; i++) {
        priceCells = routerTable.rows[i].cells[2];
        price = parseFloat(priceCells.innerText) || 0;
        totalPrice += price;
    }

    // Calculate total price for desk
    for (var i = 0; i < deskTable.rows.length; i++) {
        priceCells = deskTable.rows[i].cells[2];
        price = parseFloat(priceCells.innerText) || 0;
        totalPrice += price;
    }

    // Calculate total price for ethernet
    for (var i = 0; i < ethernetTable.rows.length; i++) {
        priceCells = ethernetTable.rows[i].cells[2];
        price = parseFloat(priceCells.innerText) || 0;
        totalPrice += price;
    }

    // Calculate total price for console
    for (var i = 0; i < consoleTable.rows.length; i++) {
        priceCells = consoleTable.rows[i].cells[2];
        price = parseFloat(priceCells.innerText) || 0;
        totalPrice += price;
    }

    // Calculate total price for officeSupplies
    for (var i = 0; i < officeSuppliesTable.rows.length; i++) {
        priceCells = officeSuppliesTable.rows[i].cells[2];
        price = parseFloat(priceCells.innerText) || 0;
        totalPrice += price;
    }

    // Calculate total price for tv
    for (var i = 0; i < tvTable.rows.length; i++) {
        priceCells = tvTable.rows[i].cells[2];
        price = parseFloat(priceCells.innerText) || 0;
        totalPrice += price;
    }

    // Calculate total price for workstation
    for (var i = 0; i < workstationTable.rows.length; i++) {
        priceCells = workstationTable.rows[i].cells[2];
        price = parseFloat(priceCells.innerText) || 0;
        totalPrice += price;
    }

    // Calculate total price for workstation
    for (var i = 0; i < printerTable.rows.length; i++) {
        priceCells = printerTable.rows[i].cells[2];
        price = parseFloat(priceCells.innerText) || 0;
        totalPrice += price;
    }

    for (var i = 0; i < cableTable.rows.length; i++) {
        priceCells = cableTable.rows[i].cells[2];
        price = parseFloat(priceCells.innerText) || 0;
        totalPrice += price;
    }

    // Update the total price on the webpage
    document.getElementById("totalPrice").innerText = "Total price: " + totalPrice.toFixed(2) + " zł";
}