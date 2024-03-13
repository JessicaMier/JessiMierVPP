
let productos = [];
const URL = 'json/todo.json';

// Elementos del DOM
const divProductos = document.getElementById('divProductos');
const divContainerSearch = document.querySelector("div.container-search.container.fs-5.rounded");

// Crear campo de búsqueda
const inputBuscar = document.createElement("input");
inputBuscar.type = "search";
inputBuscar.id = "inputBuscar";
inputBuscar.placeholder = " Buscar Productos ";
inputBuscar.addEventListener("input", () => {
    let parametro = inputBuscar.value.trim().toUpperCase();
    let arrayFiltrado = productos.filter((producto) => producto.nombre.includes(parametro));
    cargarProductos(arrayFiltrado);
});
divContainerSearch.appendChild(inputBuscar);


// Función para crear tarjetas de productos
function crearCard(producto) {
    return `<div class="productos text-center pb-2 card rounded colorCard m-3" style="width: 16rem;">
                <img src="../img/${producto.img}" class="card-img-top imgCard" alt="...">
                <div class="card-body text-center">
                    <h5 class="card-title">${producto.nombre}</h5>
                    <p class="card-text fs-5 fw-bolder text-primary">Precio:$${producto.precio}</p>
                    <p class="card-text bodyCard">${producto.descripcion}</p>
                    <button id=${producto.id} class=" btn btn-dark container btn-agregar">Agregar</button>
                </div>
            </div>`;
}

// Agregar evento click a los botones "Agregar"
function agregarClickEnBotones() {
    const btnAgregar = document.querySelectorAll("button.btn-agregar");
    if (btnAgregar !== null) {
        btnAgregar.forEach((boton) => {
            boton.addEventListener('click', (e) => {
                agregarAlCarrito(e.target.id);
            });
        });
    }
}

// Cargar productos en el contenedor
function cargarProductos(arrayProductos) {
    divProductos.innerHTML = '';
    if (arrayProductos.length > 0) {
        arrayProductos.forEach(producto => {
            divProductos.innerHTML += crearCard(producto);
        });
    }
    agregarClickEnBotones();
}
 const  botonesCategorias = document.querySelectorAll('.botonCategoria')

 function cargarProductosPorCategorias (){
    botonesCategorias.forEach((boton)=>{
        boton.addEventListener('click', (e)=>{
            let categoria = e.target.id
            let productosCategorias= productos.filter((producto)=>producto.categoria === categoria);
            cargarProductos(productosCategorias)
            })
 })
 
} 

function obtenerProductos() {
    fetch(URL)
        .then((response) => response.json())
        .then((datos) => {
            productos.push(...datos);
            cargarProductos(productos); // Cargar productos al obtenerlos
             cargarProductosPorCategorias();
})
//lo que necesito es poblar con los productos filtrados en celulares.html, monitores.html, etc
}

obtenerProductos()