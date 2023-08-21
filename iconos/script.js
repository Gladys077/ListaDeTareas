const agregarBtn = document.getElementById("agregar");
const filtroBtns = document.querySelectorAll(".filtro-btn");
const tareaContainer = document.querySelector(".tareas");
let tareaCounter = 0;

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
                <input type="radio" name="estado" class="check" value="procesando">
                <input type="radio" name="estado"  class="check" value="listo">
            </span>
        </div>

        <div class="new-acciones">    
            <button><img src="editar.png" alt="editar" class="iconos"></button>
            <button><img src="eliminar.png" alt="eliminar" class="iconos"></button>
            <button class="guardar">Guardar</button>
        </div>
    `;

    tareaContainer.appendChild(nuevaTarea);

    const editarBtn = nuevaTarea.querySelector(".editar-btn");
    const eliminarBtn = nuevaTarea.querySelector(".eliminar-btn");
    const guardarBtn = nuevaTarea.querySelector(".guardar-btn")

    editarBtn.addEventListener("click", editarTarea);
    editarBtn.addEventListener("click", eliminarTarea);
}