// contantes y variables
const btnVerProductos = document.querySelector("#btn-ver-productos");
const seccionPrductos = document.querySelector("main");
const btnCategorias = document.querySelectorAll("#filtro-categorias .nav-link");
const contenedor = document.querySelector("#contenedor-productos");
let productos = [];
let carrito = obtenerCarrito() || [];

actualizarContador();

if (contenedor) {
  fetch("assets/data/productos.json")
    .then((respuesta) => {
      return respuesta.json();
    })
    .then((data) => {
      productos = data.productos;
      renderizarProductos(data.productos);
      actualizarContador();
    });
}

// funciones

const addCarrito = (id) => {
  const producto = productos.find((p) => p.id === id);
  carrito.push(producto);
  guardarCarrito(carrito);
  actualizarContador();
};

const renderizarProductos = (lista = []) => {
  contenedor.innerHTML = "";

  lista.forEach((producto) => {
    contenedor.innerHTML += `
    <div class="col">
      <div class="card h-100">
        <div class="card-body">
<img src="https://loremflickr.com/400/200/fitness,gym?lock=${producto.id}" 
     class="card-img-top" alt="${producto.nombre}">
            <h5 class="card-title">${producto.nombre}</h5>
          <p class="card-text">${producto.descripcion}</p>
          <p>$${producto.precio}</p>
        </div>
        <button
          class="btn btn-primary btn-sm m-2"
            onclick="addCarrito(${producto.id})"
        >
          Agregar al carrito
        </button>
      </div>
    </div>`;
  });
};

if (btnVerProductos) {
  btnVerProductos.addEventListener("click", () => {
    seccionPrductos.scrollIntoView({ behavior: "smooth" });
  });
}

btnCategorias.forEach((boton) => {
  boton.addEventListener("click", () => {
    btnCategorias.forEach((btn) => btn.classList.remove("active"));

    boton.classList.add("active");

    const categoria = boton.dataset.categoria;

    if (categoria === "todos") {
      renderizarProductos(productos);
    } else {
      const filtrados = productos.filter((p) => p.categoria === categoria);
      renderizarProductos(filtrados);
    }
  });
});
