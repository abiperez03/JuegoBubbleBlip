// EJECUCION DE VENTANA Y CREACION DE BURBUJAS


document.addEventListener("DOMContentLoaded", function() {
    var modal = document.getElementById('openModal');
    modal.classList.add('open');
  
    var acceptButton = modal.querySelector('.acceptButton');
    acceptButton.addEventListener('click', function() {
        modal.classList.remove('open');

      
       
    });
  });
  