document.addEventListener('DOMContentLoaded', function () {
    const tablaTareas = document.getElementById('tabla-tareas');
    const tbody = tablaTareas.querySelector('tbody');
    const tituloInput = document.getElementById('titulo');
    const descripcionTextarea = document.getElementById('descripcion');
    const agregarBtn = document.getElementById('agregar');
    const filtros = document.querySelectorAll('.filtro-btn');

    agregarBtn.addEventListener('click', agregarTarea);

    function agregarTarea() {
        const titulo = tituloInput.value;
        const descripcion = descripcionTextarea.value;
        if (titulo && descripcion) {
            const newRow = document.createElement('tr');
            newRow.innerHTML = `
                <td>${titulo}</td>
                <td>${descripcion}</td>
                <td>Pendiente</td>
                <td class="acciones">
                    <button class="editar-btn">&#9998;</button>
                    <button class="eliminar-btn">&#128465;</button>
                </td>
            `;
            tbody.appendChild(newRow);
            tituloInput.value = '';
            descripcionTextarea.value = '';
        }
    }

    // Filtrar tareas
    filtros.forEach(filtro => {
        filtro.addEventListener('click', () => {
            const filtroSeleccionado = filtro.getAttribute('data-filtro');
            const filas = Array.from(tbody.getElementsByTagName('tr'));
            filas.forEach(fila => {
                fila.style.display = 'table-row';
                if (filtroSeleccionado !== 'todos') {
                    const estado = fila.querySelector('td:nth-child(3)').textContent;
                    if (estado.toLowerCase() !== filtroSeleccionado) {
                        fila.style.display = 'none';
                    }
                }
            });
        });
    });

    tbody.addEventListener('click', e => {
        if (e.target.classList.contains('eliminar-btn')) {
            const fila = e.target.closest('tr');
            fila.remove();
        }
        if (e.target.classList.contains('editar-btn')) {
            const fila = e.target.closest('tr');
            const titulo = fila.querySelector('td:nth-child(1)').textContent;
            const descripcion = fila.querySelector('td:nth-child(2)').textContent;
            tituloInput.value = titulo;
            descripcionTextarea.value = descripcion;
            fila.remove();
        }
    });
});

