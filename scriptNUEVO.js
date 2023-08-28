const agregarBtn = document.getElementById("agregar");
const filtroBtns = document.querySelectorAll(".filtro-btn");
const tareaContainer = document.querySelector(".tareas");
let tareaCounter = 0;

class Tarea {
    constructor(titulo, descripcion, estado) {
        this.titulo = titulo;
        this.descripcion = descripcion;
        this.estado = estado;
    }
}

function agregarTarea() {
    tareaCounter++;

    var divFondo = document.getElementById("empty");
    divFondo.style.display = "none";

    const nuevaTarea = document.createElement("div");
    nuevaTarea.classList.add("fila-tarea");
    nuevaTarea.innerHTML = `
        <div class="new-celda-titulo">
            <textarea class="new-titulo" type="text" placeholder="Título de la tarea"></textarea>
        </div>
        <div class="new-celda-descripcion">            
            <textarea class="new-descripcion" placeholder="Descripción de la tarea"></textarea>
        </div>

        <div class="new-estado">
            <span class="radio-container">
                <input type="radio" name="estado_${tareaCounter}" class="check" value="procesando">
                <input type="radio" name="estado_${tareaCounter}"  class="check" value="listo">
            </span>
        </div>

        <div class="new-acciones">    
            <button><img src="iconos/edit.png" alt="editar" class="editar-btn"></button>
            <button><img src="iconos/trash.png" alt="eliminar" class="eliminar-btn"></button>
            <button class="guardar-btn">Guardar</button>
        </div>
    `;

    tareaContainer.appendChild(nuevaTarea);

    const editarBtn = nuevaTarea.querySelector(".editar-btn");
    const eliminarBtn = nuevaTarea.querySelector(".eliminar-btn");
    const guardarBtn = nuevaTarea.querySelector(".guardar-btn");

    editarBtn.addEventListener("click", editarTarea);
    eliminarBtn.addEventListener("click", eliminarTarea);
    guardarBtn.addEventListener("click", guardarTarea);
}

function editarTarea(event) {
    const tareaActual = event.target.closest(".fila-tarea");
    const tituloInput = tareaActual.querySelector(".new-titulo");
    const descripcionInput = tareaActual.querySelector(".new-descripcion");
    const editarBtn = tareaActual.querySelector(".editar-btn");

    editarBtn.addEventListener("click", () => {
        tituloInput.readOnly = false;
        descripcionInput.readOnly = false;
    });
    const guardarBtn = tareaActual.querySelector(".guardar-btn");
    guardarBtn.addEventListener("click", () => {
        const nuevoTitulo = tituloInput.value;
        const nuevaDescripcion = descripcionInput.value;
        // Resto de la lógica para guardar los valores en la BBDD

        tituloInput.value = nuevoTitulo;
        descripcionInput.value = nuevaDescripcion;

        tituloInput.readOnly = true;
        descripcionInput.readOnly = true;
    });
}

function eliminarTarea(event) {
    const tareaActual = event.target.closest(".fila-tarea");
    tareaContainer.removeChild(tareaActual);

    const tareasRestantes = tareaContainer.querySelectorAll(".fila-tarea");
    if (tareasRestantes.length === 0) {
        const divFondo = document.getElementById("empty");
        divFondo.style.display = "block";
    }
}

function filtrarTareas(event) {
    const filtro = event.target.getAttribute("data-filtro");

    tareaContainer.querySelectorAll(".fila-tarea").forEach(tarea => {
        tarea.style.display = "flex";

        if (filtro === "enProceso" && tarea.querySelector(".check:checked").value !== "procesando") {
            tarea.style.display = "none";
        } else if (filtro === "listas" && tarea.querySelector(".check:checked").value !== "listo") {
            tarea.style.display = "none";
        }
    });
}

agregarBtn.addEventListener("click", agregarTarea);

filtroBtns.forEach(btn => {
    btn.addEventListener("click", filtrarTareas);
});

function guardarTarea(event) {
    const tareaActual = event.target.closest(".fila-tarea");
    const tituloInput = tareaActual.querySelector(".new-titulo");
    const descripcionInput = tareaActual.querySelector(".new-descripcion");
    const estadoInput = tareaActual.querySelector(".check:checked");
    const tareas = [];
    const nuevaTarea = new Tarea (
        tituloInput.value,
        descripcionInput.value,
        estadoInput.value
    );

    tareas.push(nuevaTarea);
    
    tituloInput.readOnly = true;
    descripcionInput.readOnly = true;
}

function mostrarTareas() {
    tareaContainer.innerHTML = "";

    tareas.forEach(tarea =>{
        const nuevaTarea = document.createElement("div");
        nuevaTarea.classList.add("fila-tarea");
        nuevaTarea.innerHTML = `
        <div class="new-celda-titulo">
            <textarea class="new-titulo" type="text">${tarea.titulo}</textarea>
        </div>
        <div class="new-celda-descripcion">
            <textarea class="new-descripcion">${tarea.descripcion}</textarea>
        </div>
        <div class="new-estado">
            <span class="radio-container">
                <input type="radio" name="estado_${tareaCounter}" class="check" value="procesando">
                <input type="radio" name="estado_${tareaCounter}" class="check" value="listo">
            </span>
        </div>
        <div class="new-acciones">
            <button><img src="iconos/edit.png" alt="editar" class="editar-btn"></button>
            <button><img src="iconos/trash.png" alt="eliminar" class="eliminar-btn"></button>
            <button class="guardar-btn">Guardar</button>
        </div>
    `;

    tareaContainer.appendChild(nuevaTarea);

    const tituloInput = nuevaTarea.querySelector(".new-titulo");
    const descripcionInput = nuevaTarea.querySelector(".new-descripcion");
    const estadoInput = nuevaTarea.querySelector(".check");

    tituloInput.value = tarea.titulo;
    descripcionInput.value = tarea.descripcion;
    estadoInput.value = tarea.estado;
    });
}

mostrarTareas()