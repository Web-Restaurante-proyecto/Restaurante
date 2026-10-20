    async function cargarPlatos() {
      const galeria = document.getElementById("galeria-platos");

      try {
        const respuesta = await fetch("imagenes.json");
        if (!respuesta.ok) {
          throw new Error("No se pudo leer imagenes.json");
        }

        const datos = await respuesta.json();
        galeria.innerHTML = "";

        datos.platos.forEach((plato) => {
          const tarjeta = document.createElement("article");
          tarjeta.className = "dish-card";

          const fotoWrap = document.createElement("div");
          fotoWrap.className = "photo-wrap";

          const imagen = document.createElement("img");
          imagen.src = plato.imagen;
          imagen.alt = plato.alt;
          imagen.loading = "lazy";

          const numero = document.createElement("span");
          numero.className = "dish-number";
          numero.textContent = plato.numero;

          const info = document.createElement("div");
          info.className = "dish-info";

          const categoria = document.createElement("p");
          categoria.className = "dish-category";
          categoria.textContent = plato.categoria;

          const titulo = document.createElement("h2");
          titulo.textContent = plato.titulo;

          const marca = document.createElement("span");
          marca.className = "dish-mark";
          marca.setAttribute("aria-hidden", "true");
          marca.textContent = "↗";

          fotoWrap.append(imagen, numero);
          info.append(categoria, titulo, marca);
          tarjeta.append(fotoWrap, info);
          galeria.appendChild(tarjeta);
        });
      } catch (error) {
        galeria.innerHTML = '<p class="loading-message">No se pudieron cargar los platos. Abre esta página con Live Server y comprueba que imagenes.json esté en la misma carpeta que principales.html.</p>';
        console.error(error);
      }
    }

    cargarPlatos();