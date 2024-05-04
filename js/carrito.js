const totalElement = document.getElementById('totalCarrito');

//console.log(totalElement); // Verificar si totalElement es null o si contiene el elemento

const sumarPreciosCarrito = () => {
    let total = 0;
    carritoProductos.forEach(producto => {
        total += producto.precio;
    });
    return total;
};

const actualizarTotalDeCarrito = () => {
    if (totalElement) {
        const totalCarrito = sumarPreciosCarrito();
        totalElement.innerHTML = `Total del carrito: $${totalCarrito.toFixed(2)}`;
    } else {
        console.error('El elemento totalCarrito no se encontró en el DOM.');
    }
}


const almacenarCarrito = () => {
    if (carritoProductos.length > 0) {
        localStorage.setItem('carritoProductos', JSON.stringify(carritoProductos))
    }
}

const recuperarCarrito = () => {
    if (localStorage.getItem('carritoProductos')) {
        return JSON.parse(localStorage.getItem('carritoProductos'))
    } else {
        return []
    }
}

let carritoProductos = recuperarCarrito()

const agregarAlCarrito = (productoId) => {
    if (productoId > 0) {
        let productoEncontrado = productos.find((producto) => producto.id === parseInt(productoId));
        if (productoEncontrado !== undefined) {
            // Verificar si el producto ya está en el carrito
            const productoExistente = carritoProductos.find((producto) => producto.id === parseInt(productoId));
            if (!productoExistente) {
                carritoProductos.push(productoEncontrado);
                almacenarCarrito();
            }
        }
    }
}


const eliminarDelCarrito = (productoId) => {
    const indice = carritoProductos.findIndex(producto => producto.id === parseInt(productoId));
    if (indice !== -1) {
        carritoProductos.splice(indice, 1);
        almacenarCarrito();
        actualizarTotalDeCarrito();

    }
}
document.addEventListener('DOMContentLoaded', function () {
    actualizarTotalDeCarrito();


});
const btnEliminar = document.querySelectorAll('button.btn-eliminar');
btnEliminar.forEach(boton => {
    boton.addEventListener('click', () => {
        const productoId = boton.dataset.productoId;
        eliminarDelCarrito(productoId);


    });
});

