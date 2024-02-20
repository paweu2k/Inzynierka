document.getElementById('downloadBtn').addEventListener('click', function () {
    // Rozwiń tabelę
    var productsContainer = document.getElementById('products-container');
    var originalOverflow = productsContainer.style.overflow;
    var originalHeight = productsContainer.style.height;
    productsContainer.style.overflow = 'visible';
    productsContainer.style.height = 'auto';

    // Wykonaj zrzut ekranu
    html2canvas(document.body, {
        backgroundColor: null // Ustawia tło canvasu na przezroczyste
    }).then(canvas => {
        // Przywróć pierwotny styl tabeli
        productsContainer.style.overflow = originalOverflow;
        productsContainer.style.height = originalHeight;

        // Pobierz obraz
        var link = document.createElement('a');
        link.download = 'Summary.png';
        link.href = canvas.toDataURL();
        link.click();
    });
});
