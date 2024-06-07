

const container = document.getElementById("container");

const registerBtn = document.getElementById("register");

const loginBtn = document.getElementById("login");

registerBtn.addEventListener("click", () => {
  container.classList.add("active");
});

loginBtn.addEventListener("click", () => {
  container.classList.remove("active");
});


// VALIDAR CORREO


function validarCorreo(correo) {
  // Lista de dominios y extensiones permitidos
  const dominiosPermitidos = ["gmail", "hotmail", "outlook"];
  const extensionesPermitidas = ["com", "org", "mx", "es", "edu"];

  // Expresión regular para validar el formato básico del correo
  const regex = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;
  if (!regex.test(correo)) {
      return false;
  }

  // Separar el correo en partes
  const partes = correo.split('@');
  const dominio = partes[1].split('.')[0];
  const extension = partes[1].split('.')[1];

  // Validar el dominio y la extensión
  if (!dominiosPermitidos.includes(dominio) || !extensionesPermitidas.includes(extension)) {
      return false;
  }

  return true;
}

function validarPassword(password) {
  // Validar que la contraseña tenga al menos 8 caracteres
  return password.length >= 8;
}

document.getElementById('registroForm').addEventListener('submit', function (event) {
  event.preventDefault();

  const data = {
      nombre: event.target.nombre.value,
      apellido: event.target.apellido.value,
      correo: event.target.correo.value,
      usuario: event.target.usuario.value,
      password: event.target.password.value
  };

  // Validar el correo electrónico
  if (!validarCorreo(data.correo)) {
      alert("Por favor, ingrese un correo electrónico válido con un dominio permitido y una extensión válida.");
      return; // Detener la ejecución si el correo no es válido
  }

  // Validar la contraseña
  if (!validarPassword(data.password)) {
      alert("La contraseña debe tener al menos 8 caracteres.");
      return; // Detener la ejecución si la contraseña no es válida
  }

  fetch('http://localhost:8080/api/registro/', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
  })
      .then(response => response.text())
      .then(data => {
          alert('Registro exitoso :)');
          window.location.reload(); // Recargar la página actual
      })
      .catch(error => {
          console.error('Error:', error);
          alert('Registro erroneo :)');
      });
});




// INICIAR SESION


async function iniciarSesion() {
    const usuario = document.getElementById("usuario").value;
    const password = document.getElementById("password").value;
  
    if (!usuario || !password) {
        alert("Por favor, ingrese ambos campos.");
        return;
    }
  
    try {
        const response = await fetch('http://localhost:8080/sesion/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ usuario, password })
        });
  
        if (!response.ok) {
            alert("verifique su informacion")
            throw new Error("Error en la respuesta del servidor");
        }
  
        const data = await response.json();
        console.log(data);
  
        if (data && data.length > 0) {
         //   alert("ID de sesión: " + data[0]);
            // Guarda el ID de usuario en el local storage
            localStorage.setItem('idUsuario',data[0]);
            
            console.log(data)
        
            
            window.location.href ='/bienvenida/bienvenida.html';
        } else {
            alert("Usuario o contraseña incorrectos.");
        }
  
    } catch (error) {
        console.error("Error:", error);
        alert("Error al iniciar sesión");
    }
  }
  