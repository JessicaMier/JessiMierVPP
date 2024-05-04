const tbody = document.querySelector('.tbody');
const btnComprar = document.querySelector('button.btn.btn-dark#btnComprar');

// Función para retornar el HTML de una fila de la tabla
const retornarTablaHTML = (producto, index) => {
    return `<tr data-index="${index}">
                <td class="text-center align-middle"><img class="imgTab" src="../img/${producto.img}"</td>
                <td class="text-center align-middle fw-bold">${producto.nombre}</td>
                <td class="text-center align-middle fw-bold">${producto.precio}</td>
                <td class="text-center align-middle fw-bold mb-3 mt-3"><button class="btn-eliminar btn btn-secondary btn-lg"><i class="bi bi-trash"></i></button></td>
            </tr>`; 
};

// Función para eliminar un producto del carrito
const eliminarProducto = (index) => {
    carritoProductos.splice(index, 1);
    actualizarLocalStorage();
    renderizarTabla();
};

// Función para actualizar el localStorage con el carrito actualizado
const actualizarLocalStorage = () => {
    localStorage.setItem('carritoProductos', JSON.stringify(carritoProductos));
};

// Función para cargar el carrito desde el localStorage al cargar la página
const cargarCarritoDesdeLocalStorage = () => {
    const carritoGuardado = localStorage.getItem('carritoProductos');
    if (carritoGuardado) {
        carritoProductos = JSON.parse(carritoGuardado);
    }
};

// Función para renderizar la tabla de productos
const renderizarTabla = () => {
    if (carritoProductos.length > 0) {
        tbody.innerHTML = '';
        carritoProductos.forEach((producto, index) => {
            tbody.innerHTML += retornarTablaHTML(producto, index);
        });
        
        // Agregar evento de clic a los botones de eliminar
        const btnsEliminar = document.querySelectorAll('.btn-eliminar');
        btnsEliminar.forEach((btn, index) => {
            btn.addEventListener('click', () => {
                eliminarProducto(index);
                actualizarTotalDeCarrito()
            });
        });
    } else {
        tbody.innerHTML = '<tr><td class="text-center fw-bold">No hay productos en el carrito</td></tr>';
    }
};

// Renderizar la tabla al cargar la página
cargarCarritoDesdeLocalStorage();
renderizarTabla();

// Evento de clic para el botón "Comprar"
btnComprar.addEventListener('click', () => {
    alert('¡Muchas gracias por su compra!');
    localStorage.removeItem('carritoProductos');
    carritoProductos = [];
    renderizarTabla();
    actualizarTotalDeCarrito()
});
