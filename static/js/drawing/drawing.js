document.addEventListener("DOMContentLoaded", function () {
  var canvas = document.getElementById("myCanvas");
  var ctx = canvas.getContext("2d");
  var labelContainer = document.getElementById("labelContainer");
  var hideInfoButton = document.getElementById("hideInfoButton");
  var toggleColorButton = document.getElementById("toggleColorButton");
  var sumButton = document.getElementById("sumButton");
  var isDrawing = false;
  var lines = [];
  var isInfoVisible = false;
  var isRedLine = false;
  var isEditMode = false;
  var selectedLineEnd = null;
  var isCtrlPressed = false;
  var contextMenu = null;
  var isShiftPressed = false;
  var totalRedLineLength = 0;

  canvas.width = window.innerWidth * 0.8;
  canvas.height = window.innerHeight * 0.9;

  function resizeCanvas() {
    canvas.width = window.innerWidth * 0.8;
    canvas.height = window.innerHeight * 0.9;
    redrawLines();
  }

  window.addEventListener("resize", resizeCanvas);

  document.addEventListener("keydown", function (e) {
    if (e.key === "Control") {
      isCtrlPressed = true;
    }
    if (e.key === "Shift") {
      isShiftPressed = true;
    }
  });

  document.addEventListener("keyup", function (e) {
    if (e.key === "Control") {
      isCtrlPressed = false;
    }
    if (e.key === "Shift") {
      isShiftPressed = false;
    }
  });

  function calculateMousePos(event) {
    var rect = canvas.getBoundingClientRect();
    return {
      x: (event.clientX - rect.left) * (canvas.width / rect.width),
      y: (event.clientY - rect.top) * (canvas.height / rect.height),
    };
  }

  function adjustToRightAngle(start, end) {
    var deltaX = Math.abs(end.x - start.x);
    var deltaY = Math.abs(end.y - start.y);

    if (deltaX > deltaY) {
      return { x: end.x, y: start.y };
    } else {
      return { x: start.x, y: end.y };
    }
  }

  function drawLine(start, end, label, color, isCurrentDrawing) {
    ctx.beginPath();
    ctx.moveTo(start.x, start.y);
    ctx.lineTo(end.x, end.y);
    ctx.strokeStyle = color;
    ctx.stroke();

    var midPoint = {
      x: (start.x + end.x) / 2,
      y: (start.y + end.y) / 2,
    };
    var labelDiv = document.createElement("div");
    labelDiv.className = "label";
    var canvasRect = canvas.getBoundingClientRect();
    var labelX = midPoint.x * (canvasRect.width / canvas.width);
    var labelY = midPoint.y * (canvasRect.height / canvas.height);

    labelDiv.style.left = labelX + "px";
    labelDiv.style.top = labelY + "px";
    labelDiv.innerHTML = label;
    labelDiv.style.display = isCurrentDrawing || isInfoVisible ? "block" : "none";
    labelContainer.appendChild(labelDiv);
  }

  function updateInfo(line) {
    var distance = calculateDistance(line.start, line.end);
    var angle = (Math.atan2(line.end.y - line.start.y, line.end.x - line.start.x) * (180 / Math.PI)).toFixed(1);
    return "Length: " + distance + " cm<br>Angle: " + angle + "°";
  }

  function calculateDistance(point1, point2) {
    return Math.round(
      Math.sqrt(Math.pow(point2.x - point1.x, 2) + Math.pow(point2.y - point1.y, 2))
    );
  }

  function startDrawing(e) {
    if (e.button !== 0 || isEditMode) return;

    isDrawing = true;
    var startPoint = calculateMousePos(e);
    lines.push({
      start: startPoint,
      end: startPoint,
      color: isRedLine ? "red" : "black",
    });
  }

  function draw(e) {
    if (isShiftPressed && selectedLineEnd) {
      var mousePos = calculateMousePos(e);
      selectedLineEnd.line[selectedLineEnd.point] = mousePos;
      redrawLines();
    } else if (isDrawing) {
      var currentLine = lines[lines.length - 1];
      var mousePos = calculateMousePos(e);

      if (isCtrlPressed) {
        mousePos = adjustToRightAngle(currentLine.start, mousePos);
      }

      currentLine.end = mousePos;
      redrawLines();
      drawLine(currentLine.start, currentLine.end, updateInfo(currentLine), currentLine.color, true);
    }
  }



  function stopDrawing() {
    if (isShiftPressed) {
      selectedLineEnd = null;
    } else if (isDrawing) {
      isDrawing = false;
      var currentLine = lines[lines.length - 1];
      var length = calculateDistance(currentLine.start, currentLine.end);
      if (length < 10) {
        lines.pop();
        var labels = document.getElementsByClassName("label");
        if (labels[labels.length - 1]) {
          labelContainer.removeChild(labels[labels.length - 1]);
        }
      } else {
        // Dodaj długość linii do całkowitej długości, jeśli jest czerwona
        if (currentLine.color === "red") {
          totalRedLineLength += length;
          localStorage.setItem('totalRedLineLength', totalLength.toFixed(2));
        }
      }
      redrawLines();
    }
  }

  var calculateButton = document.getElementById("calculateTotalLength");
  if (calculateButton) {
    calculateButton.addEventListener("click", function () {
      calculateTotalLength();
    });
  }

  function calculateTotalLength() {
    var totalLength = 0;
    lines.forEach(function (line) {
      if (line.color === "red") {
        totalLength += calculateDistance(line.start, line.end);
      }
    });
    localStorage.setItem('totalRedLineLength', totalLength.toFixed(2));
  }


  function toggleInfoVisibility() {
    isInfoVisible = !isInfoVisible;
    var buttonText = isInfoVisible ? "Hide line label" : "Show line label";
    hideInfoButton.innerText = buttonText; // Aktualizacja tekstu przycisku

    if (isInfoVisible) {
      hideInfoButton.style.backgroundColor = "#660000";
      hideInfoButton.style.color = "white"; // Biały tekst na czerwonym tle
    } else {
      hideInfoButton.style.backgroundColor = ""; // Reset do domyślnego koloru tła
      hideInfoButton.style.color = ""; // Reset do domyślnego koloru tekstu
    }
    var labels = document.getElementsByClassName("label");
    for (var i = 0; i < labels.length; i++) {
      labels[i].style.display = isInfoVisible ? "block" : "none";
    }
    redrawLines();
  }

  function toggleLineColor() {
    isRedLine = !isRedLine;
    var canvas = document.getElementById("myCanvas");
    var titleText = document.querySelector("#title span");
    var buttonText = document.querySelector("#toggleColorButton");
    if (isRedLine) {
      canvas.classList.add('red-border');
      titleText.classList.add('text-shadow');
      titleText.innerText = "You are drawing a cable";
      buttonText.innerText = "Wall drawing";
      toggleColorButton.style.backgroundColor = "#660000";
      toggleColorButton.style.color = "white";
    } else {
      canvas.classList.remove('red-border');
      titleText.classList.remove('text-shadow');
      titleText.innerText = "You are drawing a wall";
      buttonText.innerText = "Cable drawing";
      toggleColorButton.style.backgroundColor = "";
      toggleColorButton.style.color = "white";
    }
  }
  document.getElementById("toggleColorButton").addEventListener("click", toggleLineColor);



  function isNearPoint(point, linePoint) {
    var distance = calculateDistance(point, linePoint);
    return distance < 5; // Dopuszczalna odległość od końca linii
  }

  function setupContextMenu() {
    canvas.addEventListener('contextmenu', function (e) {
      e.preventDefault();
      var mousePos = calculateMousePos(e);

      for (var i = 0; i < lines.length; i++) {
        var line = lines[i];
        var distanceToLine = pointToLineDistance(mousePos, line.start, line.end);

        if (distanceToLine < 5) {
          showDeleteContextMenu(e.clientX, e.clientY, i);
          return;
        }
      }
    });
  }

  function hideContextMenu() {
    if (contextMenu) {
      document.body.removeChild(contextMenu);
      contextMenu = null;
    }
  }

  function showDeleteContextMenu(x, y, lineIndex) {
    var contextMenu = document.createElement('div');
    contextMenu.className = 'context-menu';
    contextMenu.style.position = 'absolute';
    contextMenu.style.top = (y + window.scrollY) + 'px';
    contextMenu.style.left = (x + window.scrollX) + 'px';

    var deleteButton = document.createElement('button');
    deleteButton.innerHTML = 'Delete';
    deleteButton.onclick = function () {
      lines.splice(lineIndex, 1);
      var labels = document.getElementsByClassName("label");
      if (labels[lineIndex]) {
        labelContainer.removeChild(labels[lineIndex]);
      }
      redrawLines();
      contextMenu.remove(); // Usunięcie menu kontekstowego
    };

    contextMenu.appendChild(deleteButton);
    document.body.appendChild(contextMenu);
  }

  document.addEventListener('click', function (event) {
    var contextMenus = document.getElementsByClassName('context-menu');
    for (var i = 0; i < contextMenus.length; i++) {
      if (contextMenus[i] && !contextMenus[i].contains(event.target)) {
        contextMenus[i].remove(); // Usunięcie menu kontekstowego
      }
    }
  });

  function pointToLineDistance(point, lineStart, lineEnd) {
    var A = point.x - lineStart.x;
    var B = point.y - lineStart.y;
    var C = lineEnd.x - lineStart.x;
    var D = lineEnd.y - lineStart.y;

    var dot = A * C + B * D;
    var len_sq = C * C + D * D;
    var param = dot / len_sq;

    var xx, yy;

    if (param < 0) {
      xx = lineStart.x;
      yy = lineStart.y;
    } else if (param > 1) {
      xx = lineEnd.x;
      yy = lineEnd.y;
    } else {
      xx = lineStart.x + param * C;
      yy = lineStart.y + param * D;
    }

    var dx = point.x - xx;
    var dy = point.y - yy;
    return Math.sqrt(dx * dx + dy * dy);
  }

  function redrawLines() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    labelContainer.innerHTML = "";
    lines.forEach(function (line) {
      drawLine(line.start, line.end, updateInfo(line), line.color, false);
    });
  }

  document.addEventListener("keydown", function (e) {
    if (e.ctrlKey) {
      isEditMode = true;
    }
  });

  document.addEventListener("keyup", function (e) {
    if (e.key === "Control") {
      isEditMode = false;
      selectedLineEnd = null;
    }
  });

  resizeCanvas();
  setupContextMenu();
  canvas.addEventListener("mousedown", function (e) {
    if (isShiftPressed) {
      var mousePos = calculateMousePos(e);
      for (var i = 0; i < lines.length; i++) {
        var line = lines[i];
        if (isNearPoint(mousePos, line.start)) {
          selectedLineEnd = { line: line, point: 'start' };
          break;
        } else if (isNearPoint(mousePos, line.end)) {
          selectedLineEnd = { line: line, point: 'end' };
          break;
        }
      }
    } else {
      startDrawing(e);
    }
  });

  document.addEventListener('click', function (event) {
    var contextMenus = document.getElementsByClassName('context-menu');
    for (var i = 0; i < contextMenus.length; i++) {
      if (contextMenus[i] && !contextMenus[i].contains(event.target)) {
        document.body.removeChild(contextMenus[i]);
      }
    }
  });

  document.getElementById("clear_all").addEventListener("click", function () {
    window.location.reload(); // Odświeżenie strony
  });

  canvas.addEventListener("mousemove", draw);
  canvas.addEventListener("mouseup", stopDrawing);
  hideInfoButton.addEventListener("click", toggleInfoVisibility);
  toggleColorButton.addEventListener("click", toggleLineColor);
  sumButton.addEventListener("click", calculateTotalLength);
});
