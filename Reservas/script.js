
const mesActual = document.getElementById("mesActual");
const diasCalendario = document.getElementById("diasCalendario");
const botonMesAnterior = document.getElementById("mesAnterior");
const botonMesSiguiente = document.getElementById("mesSiguiente");

const horas = document.querySelectorAll("#horas button");
const botonMenos = document.getElementById("menos");
const botonMas = document.getElementById("mas");
const cantidad = document.getElementById("cantidad");

const botonReservar = document.getElementById("botonReservar");
const confirmacion = document.getElementById("confirmacion");

// Fecha actual
const hoy = new Date();
hoy.setHours(0, 0, 0, 0);

let mes = hoy.getMonth();
let anio = hoy.getFullYear();

let fechaSeleccionada = null;
let horaSeleccionada = null;
let personas = 2;

// Nombres de los meses
const nombresMeses = [
    "Enero", "Febrero", "Marzo", "Abril",
    "Mayo", "Junio", "Julio", "Agosto",
    "Septiembre", "Octubre", "Noviembre", "Diciembre"
];

// Oculta la confirmación cuando se modifica la reserva
function ocultarConfirmacion() {
    confirmacion.style.display = "none";
    confirmacion.textContent = "";
}

// Generar el calendario
function generarCalendario() {
    mesActual.textContent = `${nombresMeses[mes]} ${anio}`;
    diasCalendario.innerHTML = "";

    // Día de la semana del primer día del mes
    // El calendario comienza en lunes
    const primerDia = new Date(anio, mes, 1).getDay();
    const espaciosIniciales = (primerDia + 6) % 7;

    // Número de días del mes
    const totalDias = new Date(anio, mes + 1, 0).getDate();

    // Espacios vacíos antes del día 1
    for (let i = 0; i < espaciosIniciales; i++) {
        const espacio = document.createElement("div");
        espacio.classList.add("vacio");
        diasCalendario.appendChild(espacio);
    }

    // Crear cada día
    for (let dia = 1; dia <= totalDias; dia++) {
        const botonDia = document.createElement("button");
        botonDia.type = "button";
        botonDia.textContent = dia;

        const fechaDia = new Date(anio, mes, dia);
        fechaDia.setHours(0, 0, 0, 0);

        // No permitir seleccionar días anteriores a hoy
        if (fechaDia < hoy) {
            botonDia.disabled = true;
            botonDia.classList.add("dia-pasado");
        }

        // Mantener marcado el día seleccionado
        if (
            fechaSeleccionada &&
            fechaDia.getTime() === fechaSeleccionada.getTime()
        ) {
            botonDia.classList.add("seleccionado");
        }

        botonDia.addEventListener("click", function () {
            fechaSeleccionada = new Date(anio, mes, dia);
            ocultarConfirmacion();
            generarCalendario();
        });

        diasCalendario.appendChild(botonDia);
    }
}

// Cambiar al mes anterior
botonMesAnterior.addEventListener("click", function () {
    mes--;

    if (mes < 0) {
        mes = 11;
        anio--;
    }

    generarCalendario();
});

// Cambiar al mes siguiente
botonMesSiguiente.addEventListener("click", function () {
    mes++;

    if (mes > 11) {
        mes = 0;
        anio++;
    }

    generarCalendario();
});

// Seleccionar una hora
horas.forEach(function (botonHora) {
    botonHora.addEventListener("click", function () {
        horas.forEach(function (boton) {
            boton.classList.remove("seleccionada");
        });

        botonHora.classList.add("seleccionada");
        horaSeleccionada = botonHora.textContent.trim();

        ocultarConfirmacion();
    });
});

// Actualizar el contador de personas
function actualizarPersonas() {
    cantidad.textContent = personas;

    botonMenos.disabled = personas <= 1;
    botonMas.disabled = personas >= 10;
}

// Restar personas
botonMenos.addEventListener("click", function () {
    if (personas > 1) {
        personas--;
        actualizarPersonas();
        ocultarConfirmacion();
    }
});

// Sumar personas
botonMas.addEventListener("click", function () {
    if (personas < 10) {
        personas++;
        actualizarPersonas();
        ocultarConfirmacion();
    }
});

// Confirmar la reserva
botonReservar.addEventListener("click", function () {
    if (!fechaSeleccionada || !horaSeleccionada) {
        confirmacion.textContent =
            "Por favor, selecciona una fecha y una hora.";
        confirmacion.style.display = "block";
        return;
    }

    const fechaTexto = fechaSeleccionada.toLocaleDateString("es-ES", {
        day: "numeric",
        month: "long",
        year: "numeric"
    });

    confirmacion.textContent =
        `¡Reserva preparada! Fecha: ${fechaTexto}. ` +
        `Hora: ${horaSeleccionada}. ` +
        `Personas: ${personas}.`;

    confirmacion.style.display = "block";
});

// Iniciar el calendario y el contador
generarCalendario();
actualizarPersonas();