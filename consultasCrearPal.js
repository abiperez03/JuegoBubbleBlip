// MODAL PARA GUARDAR LAS PALABRAS o jugar

// Esperar a que el DOM esté cargado
document.addEventListener("DOMContentLoaded", () => {
  const playButton = document.getElementById("playButton");
  playButton.addEventListener("click", function () {
    // Obtener el valor del input con id 'nombre'
    const nombreInput = document.getElementById("nombre").value;
    // Obtener las tablas y verificar si están vacías
    const tablas = document.querySelectorAll(".tabla"); // Suponiendo que las tablas tienen la clase 'tabla'
    const tablasLlenas = Array.from(tablas).every(
      (tabla) => tabla.innerHTML.trim() !== ""
    );

    // Si el nombre y todas las tablas están llenas, permitir el avance
    if (nombreInput.trim() !== "" && tablasLlenas) {
      // Permitir avanzar a la siguiente ventana
      createModalSaveword();
    } else {
      // Mostrar mensaje de alerta
      alert("Por favor, complete todos los campos antes de continuar.");
    }
  });
});

// CREACION DEL MODAL

function createModalSaveword() {
  const modal = document.createElement("div");
  modal.id = "modalsaveword";
  modal.className = "modalsaveword";

  const modalContent = document.createElement("div");
  modalContent.className = "modalsaveword-content";

  const closeBtn = document.createElement("span");
  closeBtn.className = "close";
  closeBtn.innerHTML = "&times;";

  const title = document.createElement("h3");
  title.textContent = "¿Desea guardar sus palabras antes de jugar?";

  // Crear el botón "Guardar"
  const saveBtn = document.createElement("button");
  saveBtn.id = "saveModalBtn";
  saveBtn.textContent = "Guardar";

  // Crear el botón "Jugar"
  const playBtn = document.createElement("button");
  playBtn.id = "playModalBtn";
  playBtn.textContent = "Jugar";

  modalContent.appendChild(closeBtn);
  modalContent.appendChild(title);
  modalContent.appendChild(saveBtn);
  modalContent.appendChild(playBtn);

  modal.appendChild(modalContent);

  document.body.appendChild(modal);

  closeBtn.addEventListener("click", closeModal);
  saveBtn.addEventListener("click", guardarWord);
  playBtn.addEventListener("click", jugar);

  // Cerrar el modal si el usuario hace clic fuera del contenido del modal
  window.addEventListener("click", (event) => {
    if (event.target === modal) {
      saveEnglishWords();
      closeModal();
      irAlMenu();
    }
  });

  // Mostrar el modal después de crearlo
  showModalSaveword();
}

function showModalSaveword() {
  const modal = document.getElementById("modalsaveword");
  modal.style.display = "block";
}

function closeModal() {
  const modal = document.getElementById("modalsaveword");
  modal.style.display = "none";
}

// Función que se llama al hacer clic en "Guardar"
function guardarWord() {
  enviarPalabras();
  saveEnglishWords();

  closeModal();
  irAlMenu();
}

// Función que se llama al hacer clic en "Jugar"
function jugar() {
  saveEnglishWords();
  closeModal(); // Cerrar el modal después de jugar
  irAlMenu();
}

// GET PALABRAS DE LA TABLA

function obtenerPalabras() {
  const lspalabraspanish = Array.from(
    document.querySelectorAll("#lista-esp tbody tr")
  ).map((row) => row.cells[0].textContent);
  const lspalabrasEng = Array.from(
    document.querySelectorAll("#lista-ing tbody tr")
  ).map((row) => row.cells[0].textContent);

  return { lspalabraspanish, lspalabrasEng };
}

// GUARDAR PALABRAS EN LA DB

function enviarPalabra(palabra, idioma, idUsuario, groupName) {
  const data = {
    idUsuario: {
      idLogin: idUsuario,
    },
    palabra: palabra,
    idioma: idioma,
    setWName: groupName,
    puntajeHigher: 0,
  };

  fetch("http://localhost:8080/api/historial/saveW", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Success:", data);
      alert("Palabras Guardadas con éxito");
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

// Función para enviar todas las palabras obtenidas de las tablas

function enviarPalabras() {
  const { lspalabraspanish, lspalabrasEng } = obtenerPalabras();

  const idUsuario = localStorage.getItem("idUsuario");
  const groupName =
    document.getElementById("nombre").value || "defaultGroupName"; // Obtén el nombre del grupo

  if (!idUsuario) {
    alert("No se encontró el ID de usuario en el almacenamiento local.");
    return;
  }

  // Iterar sobre las palabras en español
  lspalabraspanish.forEach((palabra) => {
    enviarPalabra(palabra, "espanol", idUsuario, groupName);
  });

  // Iterar sobre las palabras en inglés
  lspalabrasEng.forEach((palabra) => {
    enviarPalabra(palabra, "ingles", idUsuario, groupName);
  });
}

// Función para guardar las palabras en inglés en el almacenamiento local
function saveEnglishWords() {
  const lspalabrasEng = Array.from(
    document.querySelectorAll("#lista-ing tbody tr")
  ).map((row) => row.cells[0].textContent);
  localStorage.setItem("englishword", JSON.stringify(lspalabrasEng));
}

function irAlMenu() {
  window.location.href = "/menu/menu.html";
}
