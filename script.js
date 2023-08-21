const agregarBtn = document.getElementById("agregar");
const filtroBtns = document.querySelectorAll(".filtro-btn");
const tareaContainer = document.querySelector(".tareas");
let tareaCounter = 1;

function agregarTarea() {
    tareaCounter++;

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
    const guardarBtn = nuevaTarea.querySelector(".guardar-btn")

    editarBtn.addEventListener("click", editarTarea);
    eliminarBtn.addEventListener("click", eliminarTarea);
}

function editarTarea(event) {
    const tareaActual = event.target.closest(".fila-tarea");
    const tituloInput = tareaActual.querySelector(".new-titulo");
    const descripcionInput = tareaActual.querySelector(".new-descripcion");
    const guardarBtn = tareaActual.querySelector(".guardar-btn");

    guardarBtn.addEventListener("click", () => {
        const nuevoTitulo = tituloInput.value;
        const nuevaDescripcion = descripcionInput.value;
    });
}

function eliminarTarea(event) {
    const tareaActual = event.target.closest(".fila-tarea");
    tareaContainer.removeChild(tareaActual);
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