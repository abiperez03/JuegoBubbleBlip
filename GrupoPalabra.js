async function getMazos() {
    try {
        const idUsuario = localStorage.getItem('idUsuario');
        if (!idUsuario) {
            throw new Error("No se encontró un id de usuario en el localStorage");
        }

        const url = `http://localhost:8080/api/historial/wSE?idLogin=${idUsuario}`;

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error("Error en la respuesta del servidor");
        }

        const data = await response.json();

        if (data && data.length > 0) {
            const botonesMenu = document.querySelector('.botones_menu');
            botonesMenu.innerHTML = '';

            data.forEach(palabra => {
                const boton = document.createElement('button');
                boton.className = 'btn';

                const enlace = document.createElement('a');
                enlace.href = '/menu/menu.html';
                enlace.textContent = palabra;

                boton.appendChild(enlace);
                botonesMenu.appendChild(boton);
            });

            console.log("Lista de palabras:", data);
        } else {
            alert("Usted no tiene grupos de palabras guardados.");
        }

    } catch (error) {
        console.error("Error:", error);
        alert("Error al obtener los mazos");
    }
}

async function getPalabrasMazo(button) {
    const idLogin = localStorage.getItem('idUsuario');
    if (!idLogin) {
        console.error('idUsuario no encontrado en localStorage');
        return;
    }

    const setwName = button.textContent;

    async function fetchPalabras(idLogin, setwName, idioma) {
        const response = await fetch('http://localhost:8080/api/historial/palabras', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                idLogin: idLogin,
                setwName: setwName,
                idioma: idioma
            })
        });

        if (!response.ok) {
            throw new Error(`Error en la petición: ${response.statusText}`);
        }

        return await response.json();
    }

    try {
        const [listSpanishWord, listEnglishWord] = await Promise.all([
            fetchPalabras(idLogin, setwName, 'espanol'),
            fetchPalabras(idLogin, setwName, 'ingles')
        ]);

        localStorage.setItem('listSpanishWord', JSON.stringify(listSpanishWord));
        localStorage.setItem('englishword', JSON.stringify(listEnglishWord));

        console.log('Palabras en español:', listSpanishWord);
        console.log('Palabras en inglés:', listEnglishWord);
    } catch (error) {
        console.error('Error al obtener las palabras:', error);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    getMazos();

    document.addEventListener('click', (event) => {
        if (event.target.closest('button') && event.target.closest('button').classList.contains('btn')) {
            getPalabrasMazo(event.target.closest('button'));
        }
    });
});
