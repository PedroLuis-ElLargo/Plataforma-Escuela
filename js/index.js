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

    // Llamar a la función para crear una nueva instancia de Estudiante
    crearNuevoEstudiante(editNombre, editApellido, editMatricula, editCurso, editCalificacion);

    // Ordenar la base de datos por nombre
    baseDeDatos.sort((a, b) => a.nombre.localeCompare(b.nombre));

    actualizarTabla();
    LimpiarCelda();
}

// Definir una función para crear una nueva instancia de Estudiante
function crearNuevoEstudiante(nombre, apellido, matricula, curso, calificacion) {
    function Estudiante(nombre, apellido, matricula, curso, calificacion) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.matricula = matricula;
        this.curso = curso;
        this.calificacion = calificacion;
    }

    let nuevoEstudiante = new Estudiante(nombre, apellido, matricula, curso, calificacion);
    baseDeDatos.push(nuevoEstudiante);
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

     const botonAgregar = document.getElementById("agregar");
     const botonEditar = document.getElementById("editar");
     botonAgregar.style.display = "none";
     botonEditar.style.display = "inline";

    let fila = editar.parentNode.parentNode;
    const datosEditados = {
        nombre: fila.cells[0].innerHTML,
        apellido: fila.cells[1].innerHTML,
        matricula: fila.cells[2].innerHTML,
        curso: fila.cells[3].innerHTML,
        calificacion: fila.cells[4].innerHTML,
    }
    document.getElementById("nombre").value = datosEditados.nombre;
    document.getElementById("apellido").value = datosEditados.apellido;
    document.getElementById("matricula").value = datosEditados.matricula;
    document.getElementById("curso").value = datosEditados.curso;
    document.getElementById("calificacion").value = datosEditados.calificacion;

    const editMatricula = document.getElementById("matricula");
    editMatricula.disabled = true;

}

document.getElementById("form_agregar").addEventListener('submit', function (evento) {
    evento.preventDefault();

    const editNombre = document.getElementById("nombre").value;
    const editApellido = document.getElementById("apellido").value;
    const editMatricula = document.getElementById("matricula").value;
    const editCurso = document.getElementById("curso").value;
    const editCalificacion = document.getElementById("calificacion").value;

    const filaOriginal = document.querySelector( ".table tr.padreTabla" );
    filaOriginal.innerHTML = `
        <td>${ editNombre }</td>
        <td>${ editApellido }</td>
        <td>${ editMatricula }</td>
        <td>${ editCurso }</td>
        <td>${ editCalificacion }</td>
        <td>
            <input type="submit" class="btn-update btn btn-primary" onClick="EditarCelda(this)" value="Actualizar">
            <input type="submit" class="btn-delete btn btn-danger" onclick="EliminarCelda(this)" value="Eliminar">
        </td>
    `;
    filaOriginal.classList.remove( "padreTabla" );
    document.getElementById( "form_agregar" ).reset();
    
    crearNuevoEstudiante(editNombre, editApellido, editMatricula, editCurso, editCalificacion);
    let index = baseDeDatos.findIndex(estudiante => estudiante.matricula === editMatricula);
    if (index !== -1) {
        baseDeDatos.splice(index, 1);
    }
    console.log( {baseDeDatos} );

    const botonAgregar = document.getElementById( "agregar" );
    const botonEditar = document.getElementById( "editar" );
    botonAgregar.style.display = "inline";
    botonEditar.style.display = "none";
    setTimeout(function () {
        document.getElementById("matricula").disabled = false;
    }, 0);
});

function EliminarCelda( eventoEliminar ) {

    const celda = eventoEliminar.parentNode.parentNode;
    const index = Array.from( celda.parentNode.children ).indexOf( celda );
    baseDeDatos.splice(  index, 1 );
    celda.remove();

}
