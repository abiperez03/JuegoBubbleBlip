// EFECTOS DE LA BARRA 

/*function iniciarBarra() {
  let Mtime = 1000;
  setTimeout(() => {
    var elem = document.getElementById("myBar");
    var width = 100;
    var id = setInterval(frame, 100); // Velocidad de retroceso en milisegundos
    function frame() {
      if (width <= 0) {
        clearInterval(id);
      } else {
        Mtime -=200;  
        width-=2;
        elem.style.width = width + "%";
      }
    }
  }, Mtime); // Inicia después de 2 segundos (2000 milisegundos)
}*/


// EJECUCION DE VENTANA Y CREACION DE BURBUJAS


document.addEventListener("DOMContentLoaded", function() {
  var modal = document.getElementById('openModal');
  modal.classList.add('open');

  var acceptButton = modal.querySelector('.acceptButton');
  acceptButton.addEventListener('click', function() {
    modal.classList.remove('open');

    // Redirigir a la ventana "menu" cuando se hace clic en el botón "Aceptar"
    window.location.href = '/menu/menu.html'; // Cambia 'ruta/a/tu/menu.html' por la ruta real de tu ventana "menu"
  });
});



/*function move() {
  var elem = document.getElementById("myBar");
  var width = 100;
  var id = setInterval(frame, 100); // Velocidad de retroceso en milisegundos
  function frame() {
    if (width <= 0) {
      clearInterval(id);
    } else {
      width--;
      elem.style.width = width + "%";
    }
  }
}

move();*/
