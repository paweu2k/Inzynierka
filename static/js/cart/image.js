document.addEventListener('DOMContentLoaded', function () {
    document.addEventListener('click', function (event) {

        if (event.target.classList.contains('Image')) {
            console.log('Kliknięto obrazek');
            event.target.classList.toggle('enlarged');
        } else {
            var enlargedImages = document.querySelectorAll('.Image.enlarged');
            enlargedImages.forEach(function(image) {
                image.classList.remove('enlarged');
            });
        }
    });
});
