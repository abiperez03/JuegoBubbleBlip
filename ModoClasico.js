// EJECUCION DE VENTANA Y CREACION DE BURBUJAS


document.addEventListener("DOMContentLoaded", function() {
    var modal = document.getElementById('openModal');
    modal.classList.add('open');

    var acceptButton = modal.querySelector('.acceptButton');
    acceptButton.addEventListener('click', function() {
        modal.classList.remove('open');

          // Llamar a la función explode cuando se hace clic en el botón "Aceptar"
        
        inicioJuegoBurbuja();

      
       
    });
});



