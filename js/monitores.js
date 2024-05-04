// URL del archivo JSON de productos

let productos = [];
const URL = '../json/todo.json';

// Elemento donde se mostrarán los productos
const divProductos = document.getElementById('divProductos');

// Función para crear tarjetas de productos
function crearCard(producto) {
    return `<div class="productos text-center pb-2 card rounded colorCard m-3" style="width: 16rem;">
                <img src="../img/${producto.img}" class="card-img-top imgCard" alt="...">
                <div class="card-body text-center">
                    <h5 class="card-title">${producto.nombre}</h5>
                    <p class="card-text fs-5 fw-bolder text-primary">Precio:$${producto.precio}</p>
                    <p class="card-text bodyCard">${producto.descripcion}</p>
                    <button id=${producto.id} class=" btn btn-dark container btn-agregar-monitores">Agregar</button>
                </div>
            </div>`;
}

// Agregar evento click a los botones "Agregar"
function agregarClickEnBotones(selector) {
    const btnAgregar = document.querySelectorAll(selector);
    if (btnAgregar !== null) {
        btnAgregar.forEach((boton) => {
            boton.addEventListener('click', (e) => {
                agregarAlCarrito(e.target.id);
            });
        });
    }
}

// Función para cargar productos de la categoría "Celulares"
function cargarProductosMonitores() {
    fetch(URL)
        .then((response) => response.json())
        .then((productos) => {
            const productosMonitores = productos.filter(producto => producto.categoria === 'monitores');
            cargarProductos(productosMonitores);
        })
        .catch((error) => console.error('Error al cargar productos:', error));
}

// Función para cargar productos en el contenedor
function cargarProductos(arrayProductos) {
    divProductos.innerHTML = '';
    if (arrayProductos.length > 0) {
        arrayProductos.forEach(producto => {
            divProductos.innerHTML += crearCard(producto);
        });
    }
    agregarClickEnBotones("button.btn-agregar-monitores");
}

// Cargar productos de la categoría "Celulares" al cargar la página
cargarProductosMonitores();
