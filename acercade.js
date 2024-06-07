document.addEventListener('DOMContentLoaded', function () {
    const text = "ACERCA DE";
    const container = document.getElementById("animated-text");

    function animateText() {
        container.innerHTML = '';
        text.split('').forEach((char, index) => {
            const span = document.createElement('span');
            span.textContent = char;
            span.className = 'letter';
            span.style.animationDelay = `${index * 0.2}s`;
            container.appendChild(span);
        });
    }

    animateText();
    setInterval(animateText, 4000); // Reinicia la animación cada 4 segundos
});

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
