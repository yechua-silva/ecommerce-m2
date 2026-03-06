const obtenerCarrito = () => {
  return JSON.parse(localStorage.getItem("carrito")) || [];
};

const actualizarContador = () => {
  const contador = document.querySelector("#contador-carrito");
  if (!contador) return;
  contador.textContent = obtenerCarrito().length;
};

const guardarCarrito = (carrito) => {
  localStorage.setItem("carrito", JSON.stringify(carrito));
};
