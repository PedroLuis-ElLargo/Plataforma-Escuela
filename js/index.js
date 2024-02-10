let baseDeDatos = [];

function Agregar() {
    const editNombre = document.getElementById("nombre").value;
    const editApellido = document.getElementById("apellido").value;
    const editMatricula = document.getElementById("matricula").value;
    const editCurso = document.getElementById("curso").value;
    const editCalificacion = document.getElementById("calificacion").value;

    // Verificar si la matrícula tiene 6 dígitos
    if (editMatricula.length !== 6) {
        alert("La matrícula debe tener 6 dígitos");
        return;
    }

    // Verificar si ya existe un estudiante con el mismo nombre, apellido y matrícula
    for (let estudiante of baseDeDatos) {
        if (estudiante.nombre === editNombre && estudiante.apellido === editApellido && estudiante.matricula === editMatricula) {
            alert("Ya existe un estudiante con el mismo nombre, apellido y matrícula");
            return;
        }
    }

    function Estudiante(nombre, apellido, matricula, curso, calificacion) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.matricula = matricula;
        this.curso = curso;
        this.calificacion = calificacion;
    }

    let nuevoEstudiante = new Estudiante(editNombre, editApellido, editMatricula, editCurso, editCalificacion);
    baseDeDatos.push(nuevoEstudiante);

    // Ordenar la base de datos por nombre
    baseDeDatos.sort((a, b) => a.nombre.localeCompare(b.nombre));

    // Actualizar la tabla
    actualizarTabla();

    LimpiarCelda();
}

function actualizarTabla() {
    const tbody = document.getElementById("table-body");
    tbody.innerHTML = '';
    for (let estudiante of baseDeDatos) {
        tbody.innerHTML += `<tr class="padreTabla"> <td>${estudiante.nombre}</td><td>${estudiante.apellido}</td> <td>${estudiante.matricula}</td> <td>${estudiante.curso}</td> <td>${estudiante.calificacion}</td> <td> <input type="submit" class="btn-update btn btn-primary" onClick="EditarCelda(this)" value="Actualizar"> <input type="submit" class="btn-delete btn btn-danger" onclick="EliminarCelda(this)" value="Eliminar"></td></tr>`;
    }
}

function LimpiarCelda() {
    document.getElementById("nombre").value = '';
    document.getElementById("apellido").value = '';
    document.getElementById("matricula").value = '';
    document.getElementById("curso").value = '';
    document.getElementById("calificacion").value = '';
}

// Editar un estudiante con una función
function EditarCelda(editar) {
    let fila = editar.parentNode.parentNode;
    const datosEditados = {
        nombre: fila.cells[0].textContent,
        apellido: fila.cells[1].textContent,
        matricula: fila.cells[2].textContent,
        curso: fila.cells[3].textContent,
        calificacion: fila.cells[4].textContent,
    }
    document.getElementById("nombre").value = datosEditados.nombre;
    document.getElementById("apellido").value = datosEditados.apellido;
    document.getElementById("matricula").value = datosEditados.matricula;
    document.getElementById("curso").value = datosEditados.curso;
    document.getElementById("calificacion").value = datosEditados.calificacion;
}

document.getElementById("form_agregar").addEventListener('submit', function (evento) {
    evento.preventDefault();
    Agregar();
})

function EliminarCelda(eventoEliminar) {
    const celda = eventoEliminar.parentNode.parentNode; // Llamado del td
    const index = Array.from(celda.parentNode.children).indexOf(celda);
    baseDeDatos.splice(index, 1); // Eliminar el estudiante de la base de datos
    celda.remove(); // Eliminar la celda de la tabla
}
