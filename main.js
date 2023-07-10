const iphones = [
  {
    nombre: "iPhone 11 64 GB",
    precio: 600,
    imagen: "./img/iphone11_64gb.jpg"
  },
  {
    nombre: "iPhone 11 128 GB",
    precio: 650,
    imagen: "./img/iphone11_64gb.jpg"
  },
  {
    nombre: "iPhone 11 Pro 64 GB",
    precio: 900,
    imagen: "./img/iphone11pro_64gb.jpg"
  },
  {
    nombre: "iPhone 11 Pro 256 GB",
    precio: 1100,
    imagen: "./img/iphone11pro_64gb.jpg"
  },
  {
    nombre: "iPhone 12 64 GB",
    precio: 700,
    imagen: "./img/iphone12_64gb.jpg"
  },
  {
    nombre: "iPhone 12 128 GB",
    precio: 750,
    imagen: "./img/iphone12_64gb.jpg"
  },
  {
    nombre: "iPhone 12 Pro 128 GB",
    precio: 1000,
    imagen: "./img/iphone12pro_128gb.jpg"
  },
  {
    nombre: "iPhone 12 Pro 256 GB",
    precio: 1200,
    imagen: "./img/iphone12pro_128gb.jpg"
  },
  {
    nombre: "iPhone 13 128 GB",
    precio: 1300,
    imagen: "./img/iphone13_128gb.jpg"
  },
  {
    nombre: "iPhone 13 256 GB",
    precio: 1500,
    imagen: "./img/iphone13_128gb.jpg"
  }
];

function darBienvenida() {
  mostrarMensaje("¡Bienvenido! Elige una opción:");
  const btnMostrarProductos = document.getElementById("btnMostrarProductos");
  btnMostrarProductos.addEventListener("click", mostrariPhones);
  const btnBuscarPorNombre = document.getElementById("btnBuscarPorNombre");
  btnBuscarPorNombre.addEventListener("click", buscarPorNombre);
  const btnFiltrarPorPrecio = document.getElementById("btnFiltrarPorPrecio");
  btnFiltrarPorPrecio.addEventListener("click", filtrarPorPrecio);
  const btnMostrarHistorial = document.getElementById("btnMostrarHistorial");
  btnMostrarHistorial.addEventListener("click", mostrarHistorialCompras);
}

function mostrarMensaje(mensaje) {
  const contenedor = document.getElementById("contenedor");
  const parrafo = document.createElement("p");
  parrafo.textContent = mensaje;
  contenedor.appendChild(parrafo);
}

function mostrariPhones() {
  const contenedor = document.getElementById("contenedor");
  contenedor.innerHTML = "";

  mostrarMensaje("Elige una opción de iPhone:");

  iphones.forEach((iphone, index) => {
    const btniPhone = document.createElement("button");
    btniPhone.textContent = iphone.nombre + " - $" + iphone.precio;

    const imagen = document.createElement("img");
    imagen.src = iphone.imagen;
    imagen.alt = iphone.nombre;
    imagen.width = 200;
    imagen.height = 200;

    const divProducto = document.createElement("div");
    divProducto.appendChild(imagen);
    divProducto.appendChild(btniPhone);

    btniPhone.addEventListener("click", () => {
      preguntarFormaPago(iphone);
    });

    contenedor.appendChild(divProducto);
  });
}

function preguntarFormaPago(iphone) {
  const contenedor = document.getElementById("contenedor");
  contenedor.innerHTML = "";

  const btnEfectivo = document.createElement("button");
  btnEfectivo.textContent = "Pagar en Efectivo";
  btnEfectivo.addEventListener("click", () => {
    mostrarMontoFinal(iphone.precio, "Efectivo", iphone);
  });

  const btnTarjeta = document.createElement("button");
  btnTarjeta.textContent = "Pagar con Tarjeta";
  btnTarjeta.addEventListener("click", () => {
    mostrarMontoFinal(iphone.precio, "Tarjeta", iphone);
  });

  contenedor.appendChild(btnEfectivo);
  contenedor.appendChild(btnTarjeta);
}

function mostrarMontoFinal(montoFinal, formaPago, iphone) {
  const contenedor = document.getElementById("contenedor");
  contenedor.innerHTML = "";

  const formulario = document.createElement("form");

  const inputNombre = document.createElement("input");
  inputNombre.setAttribute("type", "text");
  inputNombre.setAttribute("placeholder", "Nombre");

  const inputApellido = document.createElement("input");
  inputApellido.setAttribute("type", "text");
  inputApellido.setAttribute("placeholder", "Apellido");

  const inputEmail = document.createElement("input");
  inputEmail.setAttribute("type", "email");
  inputEmail.setAttribute("placeholder", "Email");

  const inputTelefono = document.createElement("input");
  inputTelefono.setAttribute("type", "tel");
  inputTelefono.setAttribute("placeholder", "Teléfono");

  const btnConfirmar = document.createElement("button");
  btnConfirmar.textContent = "Confirmar Compra";
  btnConfirmar.addEventListener("click", () => {
    const nombre = inputNombre.value.trim();
    const apellido = inputApellido.value.trim();
    const email = inputEmail.value.trim();
    const telefono = inputTelefono.value.trim();

    if (nombre === "" || apellido === "" || email === "" || telefono === "") {
      mostrarMensaje("Por favor, complete todos los campos del formulario.");
      return;
    }

    const compra = {
      fecha: new Date().toLocaleDateString(),
      producto: iphone.nombre,
      precio: montoFinal,
      formaPago: formaPago,
      nombre: nombre,
      apellido: apellido,
      email: email,
      telefono: telefono
    };

    guardarCompraEnHistorial(compra);
    mostrarMensaje("¡Compra realizada con éxito!");

    Swal.fire({
      title: "¡Compra exitosa!",
      html: `El monto final a pagar es de $${montoFinal} con ${formaPago}.`,
      icon: "success"
    });
  });

  formulario.appendChild(inputNombre);
  formulario.appendChild(inputApellido);
  formulario.appendChild(inputEmail);
  formulario.appendChild(inputTelefono);
  formulario.appendChild(btnConfirmar);

  contenedor.appendChild(formulario);
}

function guardarCompraEnHistorial(compra) {
  const historialCompras = obtenerHistorialCompras();
  historialCompras.push(compra);
  localStorage.setItem("historialCompras", JSON.stringify(historialCompras));
}

function obtenerHistorialCompras() {
  const historialComprasJSON = localStorage.getItem("historialCompras");
  if (historialComprasJSON) {
    return JSON.parse(historialComprasJSON);
  } else {
    return [];
  }
}

function mostrarHistorialCompras() {
  const contenedor = document.getElementById("contenedor");
  contenedor.innerHTML = "";

  const historialCompras = obtenerHistorialCompras();
  if (historialCompras.length === 0) {
    mostrarMensaje("No hay compras en el historial.");
    return;
  }

  mostrarMensaje("Historial de Compras:");

  historialCompras.forEach((compra) => {
    const parrafo = document.createElement("p");
    parrafo.textContent = `
      Fecha: ${compra.fecha}
      Producto: ${compra.producto}
      Precio: $${compra.precio}
      Forma de Pago: ${compra.formaPago}
      Nombre: ${compra.nombre}
      Apellido: ${compra.apellido}
      Email: ${compra.email}
      Teléfono: ${compra.telefono}
    `;
    contenedor.appendChild(parrafo);
  });
}

function buscarPorNombre() {
  const contenedor = document.getElementById("contenedor");
  contenedor.innerHTML = "";

  const inputNombre = document.createElement("input");
  inputNombre.setAttribute("type", "text");
  inputNombre.setAttribute("placeholder", "Ingrese el nombre del iPhone");

  const btnBuscar = document.createElement("button");
  btnBuscar.textContent = "Buscar";
  btnBuscar.addEventListener("click", () => {
    const nombre = inputNombre.value.trim();
    if (nombre === "") {
      mostrarMensaje("Por favor, ingrese el nombre del iPhone.");
      return;
    }

    const resultado = iphones.filter((iphone) => iphone.nombre.toLowerCase() === nombre.toLowerCase());

    if (resultado.length === 0) {
      mostrarMensaje("No se encontraron iPhones con ese nombre.");
      return;
    }

    mostrarMensaje("Resultado de búsqueda:");

    resultado.forEach((iphone) => {
      const btniPhone = document.createElement("button");
      btniPhone.textContent = iphone.nombre + " - $" + iphone.precio;

      const imagen = document.createElement("img");
      imagen.src = iphone.imagen;
      imagen.alt = iphone.nombre;
      imagen.width = 200;
      imagen.height = 200;

      const divProducto = document.createElement("div");
      divProducto.appendChild(imagen);
      divProducto.appendChild(btniPhone);

      btniPhone.addEventListener("click", () => {
        preguntarFormaPago(iphone);
      });

      contenedor.appendChild(divProducto);
    });
  });

  contenedor.appendChild(inputNombre);
  contenedor.appendChild(btnBuscar);
}

function filtrarPorPrecio() {
  const contenedor = document.getElementById("contenedor");
  contenedor.innerHTML = "";

  const inputPrecioMin = document.createElement("input");
  inputPrecioMin.setAttribute("type", "number");
  inputPrecioMin.setAttribute("placeholder", "Precio Mínimo");

  const inputPrecioMax = document.createElement("input");
  inputPrecioMax.setAttribute("type", "number");
  inputPrecioMax.setAttribute("placeholder", "Precio Máximo");

  const btnFiltrar = document.createElement("button");
  btnFiltrar.textContent = "Filtrar";
  btnFiltrar.addEventListener("click", () => {
    const precioMin = parseInt(inputPrecioMin.value);
    const precioMax = parseInt(inputPrecioMax.value);

    if (isNaN(precioMin) || isNaN(precioMax)) {
      mostrarMensaje("Por favor, ingrese valores numéricos para los precios.");
      return;
    }

    if (precioMin >= precioMax) {
      mostrarMensaje("El precio mínimo debe ser menor al precio máximo.");
      return;
    }

    const resultado = iphones.filter((iphone) => iphone.precio >= precioMin && iphone.precio <= precioMax);

    if (resultado.length === 0) {
      mostrarMensaje("No se encontraron iPhones en ese rango de precios.");
      return;
    }

    mostrarMensaje("Resultado de filtrado por precio:");

    resultado.forEach((iphone) => {
      const btniPhone = document.createElement("button");
      btniPhone.textContent = iphone.nombre + " - $" + iphone.precio;

      const imagen = document.createElement("img");
      imagen.src = iphone.imagen;
      imagen.alt = iphone.nombre;
      imagen.width = 200;
      imagen.height = 200;

      const divProducto = document.createElement("div");
      divProducto.appendChild(imagen);
      divProducto.appendChild(btniPhone);

      btniPhone.addEventListener("click", () => {
        preguntarFormaPago(iphone);
      });

      contenedor.appendChild(divProducto);
    });
  });

  contenedor.appendChild(inputPrecioMin);
  contenedor.appendChild(inputPrecioMax);
  contenedor.appendChild(btnFiltrar);
}

darBienvenida();
