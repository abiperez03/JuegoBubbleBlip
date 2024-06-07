function agregarPalabra(inputId, tableId) {
  const input = document.getElementById(inputId);
  const value = input.value.trim();
  const regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ]+$/;

  if (!regex.test(value)) {
    alert("Solo se permiten letras y no se permiten espacios, solo debes de introducir una palabra.");
    return;
  }

  const table = document.getElementById(tableId).getElementsByTagName("tbody")[0];
  const rowCount = table.rows.length;

  if (rowCount >= 8) {
    alert("Solo se pueden agregar un máximo de 8 palabras.");
    return;
  }

  const newRow = table.insertRow();
  const newCell1 = newRow.insertCell(0);
  const newCell2 = newRow.insertCell(1);

  const newText = document.createTextNode(value);
  newCell1.appendChild(newText);
  newCell2.innerHTML = '<button onclick="borrarFila(this)">Borrar</button>';

  input.value = ""; // Limpiar el input después de agregar la palabra
}

function borrarFila(button) {
  const row = button.parentNode.parentNode;
  row.parentNode.removeChild(row);
}
