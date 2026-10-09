
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

const hoy = new Date();
hoy.setHours(0, 0, 0, 0);

let mes = hoy.getMonth();
let anio = hoy.getFullYear();

let fechaSeleccionada = null;
let horaSeleccionada = null;
let personas = 2;

const nombresMeses = [
    "Enero", "Febrero", "Marzo", "Abril",
    "Mayo", "Junio", "Julio", "Agosto",
    "Septiembre", "Octubre", "Noviembre", "Diciembre"
];

function ocultarConfirmacion() {
    confirmacion.style.display = "none";
    confirmacion.textContent = "";
}

function generarCalendario() {
    mesActual.textContent = `${nombresMeses[mes]} ${anio}`;
    diasCalendario.innerHTML = "";

    const primerDia = new Date(anio, mes, 1).getDay();
    const espaciosIniciales = (primerDia + 6) % 7;

    const totalDias = new Date(anio, mes + 1, 0).getDate();

    for (let i = 0; i < espaciosIniciales; i++) {
        const espacio = document.createElement("div");
        espacio.classList.add("vacio");
        diasCalendario.appendChild(espacio);
    }

    for (let dia = 1; dia <= totalDias; dia++) {
        const botonDia = document.createElement("button");
        botonDia.type = "button";
        botonDia.textContent = dia;

        const fechaDia = new Date(anio, mes, dia);
        fechaDia.setHours(0, 0, 0, 0);

        if (fechaDia < hoy) {
            botonDia.disabled = true;
            botonDia.classList.add("dia-pasado");
        }

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

botonMesAnterior.addEventListener("click", function () {
    mes--;

    if (mes < 0) {
        mes = 11;
        anio--;
    }

    generarCalendario();
});

botonMesSiguiente.addEventListener("click", function () {
    mes++;

    if (mes > 11) {
        mes = 0;
        anio++;
    }

    generarCalendario();
});

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

function actualizarPersonas() {
    cantidad.textContent = personas;

    botonMenos.disabled = personas <= 1;
    botonMas.disabled = personas >= 10;
}


botonMenos.addEventListener("click", function () {
    if (personas > 1) {
        personas--;
        actualizarPersonas();
        ocultarConfirmacion();
    }
});


botonMas.addEventListener("click", function () {
    if (personas < 10) {
        personas++;
        actualizarPersonas();
        ocultarConfirmacion();
    }
});


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

generarCalendario();
actualizarPersonas();