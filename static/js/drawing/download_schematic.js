function downloadImage() {
    html2canvas(document.body, {
        backgroundColor: null // Ustawia tło canvasu na przezroczyste
    }).then(function (canvas) {
        var link = document.createElement('a');
        link.download = 'Schematic.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
    });
}

document.getElementById('downloadBtn').addEventListener('click', downloadImage);
