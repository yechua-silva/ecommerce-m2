// contantes y variables
const btnVerProductos = document.querySelector("#btn-ver-productos");
const seccionPrductos = document.querySelector("main");
const btnCategorias = document.querySelectorAll("#filtro-categorias .nav-link");
const contenedor = document.querySelector("#contenedor-productos");
let productos;

fetch("assets/data/productos.json")
  .then((respuesta) => {
    return respuesta.json();
  })
  .then((data) => {
    productos = data.productos;
    renderizarProductos(data.productos);
  });

// funciones
const renderizarProductos = (lista = []) => {
  contenedor.innerHTML = "";
  console.log();

  lista.forEach((producto) => {
    contenedor.innerHTML += `
                <div class="col">
          <div class="card h-100">
            <div class="card-body">
              <h5 class="card-title">${producto.nombre}</h5>
              <p class="card-text">${producto.descripcion}</p>
              <p>$${producto.precio}</p>
            </div>
        //   </div>
        </div>`;
  });
};

btnVerProductos.addEventListener("click", () => {
  seccionPrductos.scrollIntoView({ behavior: "smooth" });
});

btnCategorias.forEach((boton) => {
  boton.addEventListener("click", () => {
    btnCategorias.forEach((btn) => btn.classList.remove("active"));

    boton.classList.add("active");

    const categoria = boton.dataset.categoria;
    console.log(categoria);
    console.log(productos);

    const categoriaPrd = productos.filter((producto) => {
      console.log(producto.categoria);
      console.log(categoria);

      return producto.categoria == categoria;
    });
    if (!categoriaPrd?.length) {
      console.log();

      renderizarProductos(productos);
    } else {
      renderizarProductos(categoriaPrd);
    }

    console.log(categoriaPrd);
  });
});
