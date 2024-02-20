document.addEventListener("DOMContentLoaded", function() {
  // Element przycisku do otwierania instrukcji
  var instructionButton = document.getElementById("instructionButton");
  // Element modalny z instrukcją
  var instructionModal = document.getElementById("instructionModal");

  // Otwórz modal z instrukcją
  instructionButton.addEventListener("click", function() {
    instructionModal.style.display = "block";
  });

  // Zamknij modal z instrukcją, jeśli kliknięto gdziekolwiek poza treścią
  window.addEventListener("click", function(event) {
    if (event.target == instructionModal) {
      instructionModal.style.display = "none";
    }
  });
});
