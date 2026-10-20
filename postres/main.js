// 1. Buscamos en el HTML el contenedor donde vamos a pintar los postres
const contenedor = document.getElementById("contenedor-postres");

// 2. Función que pide los datos al archivo data.json
function cargarPostres() {
  fetch("data.json")
    .then(function (respuesta) {
      // 3. Convertimos la respuesta en un array de JavaScript
      return respuesta.json();
    })
    .then(function (postres) {
      // 4. Recorremos los postres y pintamos cada uno en el HTML
      postres.forEach(function (postre) {
        contenedor.innerHTML += `
          <div class="tarjeta-postre">
            <h2>${postre.nombre}</h2>
            <span><img src="${postre.imagen}" alt="${postre.nombre}"></span>
          </div>
        `;
      });
    })
    .catch(function (error) {
      // 5. Si algo falla, lo mostramos en la consola
      console.error("Error al cargar los postres:", error);
    });
}

// 6. Llamamos a la función para que se ejecute
cargarPostres();