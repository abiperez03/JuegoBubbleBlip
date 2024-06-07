

// Variables globales
let puntajeTotal = 0;
let puntajeporJuego = 0;
let clicked =true;
let progressBarInterval;
var bubblePositions = []; // Variable para almacenar las coordenadas de las burbujas


let palabraUsuario = palabrasUsuario();

let partida = 0; // Declarar partida como variable global

// Función principal para iniciar el juego de burbujas
async function inicioJuegoBurbuja() {
    try {
        // Obtener las palabras homófonas para la palabra actual
        const palHomofonas = await obtenerPalabrasAPI(palabraUsuario[partida]);
        
        // Crear burbujas con las palabras homófonas
        createBubbles(palHomofonas);
        iniciarBarra();
        voz();



    } catch (error) {
        console.error("Ocurrió un error al obtener palabras homófonas:", error);
        // Manejar el error si es necesario
    }
}

// Función para manejar el avance de la partida después de hacer clic en una burbuja
function avanzarPartida() {

   
        
        puntajeporJuego = BarValue();
        puntajeTotal += puntajeporJuego;
        puntajeporJuego = 0
        
      //  crearModal();

        // Avanzar a la siguiente partida
        partida++;
        // Iniciar el juego con la siguiente palabra
        clicked =true;
        if(partida<palabraUsuario.length){
            inicioJuegoBurbuja();
        }else{
            crearModal();
        }
        




}



function BarValue(){
    let progressBar = document.getElementById("myBar");
    let progressBarWidth = parseFloat(progressBar.style.width); // Obtener el ancho de la barra en formato decimal
    const anchoMaximo = 100; // Definir el ancho máximo de la barra
    const puntos = Math.floor((progressBarWidth / anchoMaximo) * 400); // Calcular los puntos en función del ancho actual de la barra

    return puntos;
}



// OBTENER PALABRAS

function getEnglishWords() {
    const words = localStorage.getItem('englishword');
    return words ? JSON.parse(words) : [];
}

function palabrasUsuario() {


    let palabras = getEnglishWords();
    //let palabras = ['Hello', 'Goodbye', 'Cat', 'Dog', 'House', 'Tree', 'Sun', 'Moon'];
    
    return palabras;
}

// Función para obtener palabras homófonas de la API
function palabrasHomofonas(palabra) {
    const endpoint = `https://api.datamuse.com/words?sl=` + palabra;
  
    return fetch(endpoint)
      .then(response => response.json())
      .then(data => {
        if (data && Array.isArray(data)) {
          const palabrasSeleccionadas = [];
          while (palabrasSeleccionadas.length < 7) {
            const randomIndex = Math.floor(Math.random() * data.length);
            palabrasSeleccionadas.push(data[randomIndex].word);
          }
          palabrasSeleccionadas.push(palabra);
          return palabrasSeleccionadas;
        } else {
          console.log("No se recibieron datos válidos de la API.");
          return [palabra];
        }
      })
      .catch(error => {
        console.error("Hubo un error al obtener los datos:", error);
        return [palabra];
      });
}

// Función asíncrona para obtener palabras de la API
async function obtenerPalabrasAPI(searchW) {
    try {
      const resultado = await palabrasHomofonas(searchW);
      console.log(resultado);
      return resultado; // Devuelve el resultado para que pueda ser utilizado fuera de esta función
    } catch (error) {
      console.error("Ocurrió un error:", error);
      return [searchW]; // Devuelve la palabra de búsqueda en caso de error
    }
}

// Función para crear burbujas
function createBubbles(wordArray) {
    wordArray.forEach(function(word) {
        createBubble(word);
    });
}

// Función para crear una burbuja individual
function createBubble(word) {

    var screenWidth = window.innerWidth * 0.91;
    var screenHeight = window.innerHeight;

    var bubble = document.createElement('div');
    bubble.classList.add('bubble');

    var span;
    for (var j = 0; j < 5; j++) {
        span = document.createElement('span');
        bubble.appendChild(span);
    }

    var p = document.createElement('p');
    p.textContent = word;
    bubble.appendChild(p);

    var firework = document.createElement('div');
    firework.classList.add('firework');
    bubble.appendChild(firework);

    var bubbleWidth = bubble.offsetWidth * 0.80;
    var bubbleHeight = bubble.offsetHeight * 0.10;

    // Define la distancia mínima entre burbujas
    var minDistance = 20;

    // Define la posición aleatoria en el eje X
    var randomLeft = Math.random() * (screenWidth - bubbleWidth);

    // Define la posición aleatoria en el eje Y de 0 a 10% de la altura de la pantalla
    var randomTop = Math.random() * (screenHeight * 0.1);

    // Ajusta la posición vertical para evitar superposiciones
    bubblePositions.forEach(function(existingBubble) {
        if (
            Math.abs(existingBubble.left - randomLeft) < bubbleWidth + minDistance &&
            Math.abs(existingBubble.top - randomTop) < bubbleHeight + minDistance
        ) {
            randomTop += bubbleHeight + minDistance;
        }
    });

    bubble.style.left = randomLeft + 'px';
    bubble.style.top = randomTop + 'px';

    // Guardar las coordenadas de posición de la burbuja
    bubblePositions.push({ bubble: bubble, left: randomLeft, top: randomTop });

    // Agregar evento onclick a la burbuja
    bubble.onclick = handleBubbleClick;

    document.body.appendChild(bubble);

    // Verificar si la burbuja alcanza el 90% del eje Y y reiniciarla si es necesario
    var checkBubblePosition = setInterval(function() {
        var bubbleRect = bubble.getBoundingClientRect();
        var bottomEdge = bubbleRect.bottom;
        if (bottomEdge >= screenHeight * 0.84) {
            clearInterval(checkBubblePosition);
            bubble.remove();
            createBubble(word); // Crear una nueva burbuja
        }
    }, 100); // Verificar la posición cada 100 milisegundos
}

// Función para manejar el clic en una burbuja
function handleBubbleClick(event) {
    const clickedWord = event.currentTarget.querySelector('p').textContent;

    if (palabraUsuario.includes(clickedWord)) {

        limpiarPantalla();
        var bubbles = document.querySelectorAll('.bubble');
        bubbles.forEach(function(bubble) {
            bubble.style.animationPlayState = 'paused';
            bubble.classList.remove('flotar');
        });
       
        if(partida<palabraUsuario.length){
            crearModal();
        }
        

        // Crear el modal
        explode(event.currentTarget); // Hacer explotar la burbuja clicada
        SonidoCorrectBubble();
        clicked = false;

    }else{

        sonidobadBurbuja();
    }

}

// Función para ejecutar el efecto de explosión (firework)
function explode(bubble) {
    bubble.classList.add('clicked');
    
    // Opcional: Eliminar la burbuja después de cierto tiempo
    setTimeout(function() {
        bubble.remove();
    }, 1000); // Eliminar la burbuja después de 1 segundo
}

// Función para crear el modal
function crearModal() {

    var titulo= "";
    var msg = "";
    var msgpuntos = 0;
    if(partida<palabraUsuario.length){
        msg = msgpoPartido(BarValue());
        titulo = "Puntos Actuales";
        msgpuntos = "Su puntaje actual es : "+ BarValue();
    }else{
        msg = msgFinal(BarValue());
        titulo = "¡Felicidades! Has completado el juego.";
        msgpuntos ="Su puntaje final  es : "+ puntajeTotal;
    }

    // Crear el elemento del modal
    var modal = document.createElement('div');
    modal.id = 'mensajeCongrat';
    modal.classList.add('modalDialog');
    modal.style.position = 'fixed';
    modal.style.fontFamily = 'Cherry Bomb One", system-ui';
    modal.style.top = '0';
    modal.style.right = '0';
    modal.style.bottom = '0';
    modal.style.left = '0';
    modal.style.background = 'rgba(0,0,0,0.8)';
    modal.style.zIndex = '99999';
    modal.style.opacity = '0';
    modal.style.transition = 'opacity 400ms ease-in';
    modal.style.pointerEvents = 'none';

    // Crear el contenido del modal
    var contenidoModal = document.createElement('div');
    contenidoModal.style.width = '50vh';
    contenidoModal.style.position = 'relative';
    contenidoModal.style.margin = '10% auto';
    contenidoModal.style.padding = '1vh';
    contenidoModal.style.borderRadius = '5px';
    contenidoModal.style.background = '#fff';
    contenidoModal.style.background = '-moz-linear-gradient(#a8e4fa, #26c7cd)';
    contenidoModal.style.background = '-webkit-linear-gradient(#a8e4fa, #26c7cd)';
    contenidoModal.style.background = '-o-linear-gradient(#a8e4fa, #26c7cd)';
    contenidoModal.style.transition = 'opacity 400ms ease-in';

    var tituloElemento  = document.createElement('h2');
    tituloElemento.textContent = titulo;
    contenidoModal.appendChild(tituloElemento);

    var parrafo1 = document.createElement('p');
    parrafo1.textContent = msg
    contenidoModal.appendChild(parrafo1);

    var parrafo2 = document.createElement('p');
    parrafo2.textContent = msgpuntos
    contenidoModal.appendChild(parrafo2);

    tituloElemento.style.marginBottom = "5vh";
    parrafo1.style.marginBottom = "8px";

    var botonAceptar = document.createElement('button');
    botonAceptar.id = 'acceptButton';
    botonAceptar.classList.add('acceptButton');
    botonAceptar.textContent = 'Aceptar';
    botonAceptar.style.display = 'block';
    botonAceptar.style.margin = '1vh auto 0';
    botonAceptar.style.padding = '1vh 2vh';
    botonAceptar.style.border = 'none';
    botonAceptar.style.borderRadius = '6vh';
    botonAceptar.style.backgroundColor = '#a8e4fa';
    botonAceptar.style.color = 'white';
    botonAceptar.style.fontSize = '4vh';
    botonAceptar.style.cursor = 'pointer';
    botonAceptar.style.transition = 'background-color 0.3s';
    botonAceptar.addEventListener('click', function() {
        modal.style.display = 'none';
        if(partida<palabraUsuario.length ){
            avanzarPartida();    // Llama a la función avanzarPartida después de hacer clic en Aceptar
        }else{
            //LLEVAR A MENU*******************************
            window.location.href = "/menu/menu.html";
        }
     
        
    });

    contenidoModal.appendChild(botonAceptar);

    modal.appendChild(contenidoModal);


    document.body.appendChild(modal);

   
    setTimeout(function() {
        modal.style.opacity = '1';
        modal.style.pointerEvents = 'auto';
    }, 100);
}




function limpiarPantalla() {
 
    var bubbles = document.querySelectorAll('.bubble');
    bubbles.forEach(function(bubble) {
        bubble.remove();
    });

   
    bubblePositions = [];
}



function sonidobadBurbuja() {
    let audio = document.getElementById('sonidobadBurbuja');
    audio.play(); // Reproducir el sonido preloaded
}



function SonidoCorrectBubble() {
    let audio2 = document.getElementById('SonidoCorrectBubble');
    audio2.play(); 
}




function iniciarBarra() {
    let totalTime = 7000; 
    let intervalTime = 3; 
    let width = 100;
    let elem = document.getElementById("myBar");
    
    // Valor inicial de los puntos
    let puntos = 170;


    let puntosDisplay = document.querySelector(".puntosDisplay");
    if (!puntosDisplay) {
        puntosDisplay = document.createElement("div");
        puntosDisplay.textContent = puntos + " puntos";
        puntosDisplay.classList.add("puntosDisplay");
        puntosDisplay.style.position = "absolute";
        puntosDisplay.style.top = "60%";
        puntosDisplay.style.transform = "translateY(-50%)";
        puntosDisplay.style.left = "55%";
        puntosDisplay.style.transform += "translateX(-50%)";
        puntosDisplay.style.fontSize = "0px"; 
        puntosDisplay.style.color = "#ffffff"; 
        elem.parentNode.appendChild(puntosDisplay);
    }

    let iterations = totalTime / intervalTime;
    let widthReduction = 100 / iterations;
    
    // Iniciar el intervalo
    let id = setInterval(frame, intervalTime);
    progressBarInterval = id; 
    
    function frame() {
       
        if (width >= 0 && clicked) {
            width -= widthReduction;
            elem.style.width = width + "%";
            // Actualizar el valor de los puntos
            puntos -= 3;
            puntosDisplay.textContent = puntos + " puntos";
        } else {
            clearInterval(id);
            if(width<=0){
                limpiarPantalla();
                var bubbles = document.querySelectorAll('.bubble');
                bubbles.forEach(function(bubble) {
                    bubble.style.animationPlayState = 'paused';
                    bubble.classList.remove('flotar');
                });
                if(partida<palabraUsuario.length){
                    crearModal();
                }
                
            }
        }
    }
}









function msgFinal(barvalue){

    if(barvalue>1600){
        return "Buen puntaje! Sigue practicando";
    }else{
        return "Ánimo, si se puede, practica un rato más";
    }

    
}

function msgpoPartido(BarValue){
    if(BarValue>200){
        return "Sigue así, ¡Fuerza!";
    }else{
        return "¡Concentrate! ";
    }
}



/* VOZ */


document.addEventListener("DOMContentLoaded", function() {
    
    
    if ("speechSynthesis" in window) {
      
        
        let demo = document.getElementById("volumen");
        
   
        
        demo.addEventListener("click", function() {
            
            
            let msg = new SpeechSynthesisUtterance(palabraUsuario[partida]);
            
        
            speechSynthesis.speak(msg);
        });
        
        // Habilitar el botón
        demo.disabled = false;
    }
});


function voz(){
    let msg = new SpeechSynthesisUtterance(palabraUsuario[partida]);
    speechSynthesis.speak(msg);
    //demo.disabled = false;
}



