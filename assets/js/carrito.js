actualizarContador();

const carrito = obtenerCarrito();

const renderizarCarrito = () => {
  const lista = document.querySelector("#lista-carrito");

  if (carrito.length === 0) {
    lista.innerHTML = `<p class="text-center">Tu carrito está vacío</p>`;
    return;
  }

  carrito.forEach((producto, index) => {
    lista.innerHTML = "";

    if (carrito.length === 0) {
      lista.innerHTML = `<p class="text-center">Tu carrito está vacío</p>`;
      return;
    }
    carrito.forEach((producto, index) => {
      lista.innerHTML += `
      <div class="card mb-3">
        <div class="card-body d-flex justify-content-between align-items-center">
          <div>
            <h5 class="card-title">${producto.nombre}</h5>
            <p class="mb-0">$${producto.precio}</p>
          </div>
          <button class="btn btn-danger btn-sm" onclick="eliminarProducto(${index})">
            <i class="bi bi-trash"></i>
          </button>
        </div>
      </div>`;
    });
  });
};

const calcularTotal = () => {
  const total = carrito.reduce((acc, prod) => {
    return acc + prod.precio;
  }, 0);

  document.querySelector("#total-carrito").textContent = `$${total}`;
};

const eliminarProducto = (index) => {
  carrito.splice(index, 1);
  guardarCarrito();
  renderizarCarrito();
  calcularTotal();
  actualizarContador();
};

renderizarCarrito();
calcularTotal();
