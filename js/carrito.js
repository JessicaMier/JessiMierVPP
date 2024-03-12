
const totalElement =document.getElementById('totalCarrito');

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
            let productoEncontrado =  productos.find((producto) => producto.id === parseInt(productoId))
            if (productoEncontrado !== undefined) {
                carritoProductos.push(productoEncontrado)
                almacenarCarrito()
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
    const btnEliminar = document.querySelectorAll('button.btnEliminar');   
    btnEliminar.forEach(boton => {
        boton.addEventListener('click', () => {
            const productoId = boton.dataset.productoId;
            eliminarDelCarrito(productoId);
         
            
        });
    });
    
    document.addEventListener('DOMContentLoaded', function() {
    actualizarTotalDeCarrito();
     
    
});
