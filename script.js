// ==========================
// CALENDARIO
// ==========================

const mesActual = document.getElementById("mesActual");
const diasCalendario = document.getElementById("diasCalendario");

const mesAnterior = document.getElementById("mesAnterior");
const mesSiguiente = document.getElementById("mesSiguiente");

const nombresMeses = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre"
];

let fechaActual = new Date();

let mes = fechaActual.getMonth();
let año = fechaActual.getFullYear();

let diaSeleccionado = null;
let horaSeleccionada = null;


// Crear calendario
function crearCalendario() {

    // Limpiar calendario
    diasCalendario.innerHTML = "";

    // Mostrar mes y año
    mesActual.textContent = nombresMeses[mes] + " " + año;

    // Primer día del mes
    let primerDia = new Date(año, mes, 1);

    // Día de la semana
    let diaSemana = primerDia.getDay();

    // Convertir domingo 0 a 7
    if (diaSemana === 0) {
        diaSemana = 7;
    }

    // Número de días del mes
    let numeroDias = new Date(año, mes + 1, 0).getDate();


    // Espacios antes del día 1
    for (let i = 1; i < diaSemana; i++) {

        let espacio = document.createElement("div");

        espacio.classList.add("vacio");

        diasCalendario.appendChild(espacio);
    }


    // Crear días
    for (let dia = 1; dia <= numeroDias; dia++) {

        let boton = document.createElement("button");

        boton.textContent = dia;

        boton.type = "button";


        boton.addEventListener("click", function () {

            // Quitar selección anterior
            let dias = document.querySelectorAll(
                ".dias-calendario button"
            );

            dias.forEach(function (dia) {
                dia.classList.remove("seleccionado");
            });


            // Marcar día
            boton.classList.add("seleccionado");

            diaSeleccionado = dia;

            console.log(
                "Día seleccionado:",
                diaSeleccionado,
                nombresMeses[mes],
                año
            );

        });


        diasCalendario.appendChild(boton);
    }
}


// Botón mes anterior
mesAnterior.addEventListener("click", function () {

    mes--;

    if (mes < 0) {
        mes = 11;
        año--;
    }

    crearCalendario();
});


// Botón mes siguiente
mesSiguiente.addEventListener("click", function () {

    mes++;

    if (mes > 11) {
        mes = 0;
        año++;
    }

    crearCalendario();
});


// Crear calendario al cargar
crearCalendario();


// ==========================
// HORARIOS
// ==========================

const botonesHora = document.querySelectorAll(".horas button");


botonesHora.forEach(function (boton) {

    boton.addEventListener("click", function () {

        // Quitar selección anterior
        botonesHora.forEach(function (hora) {
            hora.classList.remove("seleccionada");
        });


        // Seleccionar hora
        boton.classList.add("seleccionada");

        horaSeleccionada = boton.textContent;

        console.log("Hora seleccionada:", horaSeleccionada);

    });

});


// ==========================
// PERSONAS
// ==========================

const botonMenos = document.getElementById("menos");
const botonMas = document.getElementById("mas");
const cantidad = document.getElementById("cantidad");

let numeroPersonas = 2;


// Restar persona
botonMenos.addEventListener("click", function () {

    if (numeroPersonas > 1) {

        numeroPersonas--;

        cantidad.textContent = numeroPersonas;

    }

});


// Añadir persona
botonMas.addEventListener("click", function () {

    if (numeroPersonas < 10) {

        numeroPersonas++;

        cantidad.textContent = numeroPersonas;

    }

});


// ==========================
// RESERVA
// ==========================

const botonReservar = document.getElementById("botonReservar");
const confirmacion = document.getElementById("confirmacion");


botonReservar.addEventListener("click", function () {

    // Comprobar día
    if (diaSeleccionado === null) {

        alert("Selecciona un día.");

        return;
    }


    // Comprobar hora
    if (horaSeleccionada === null) {

        alert("Selecciona una hora.");

        return;
    }


    // Mostrar confirmación
    confirmacion.style.display = "block";

    confirmacion.textContent =
        "Reserva confirmada: " +
        diaSeleccionado + " de " +
        nombresMeses[mes] + " de " +
        año + " a las " +
        horaSeleccionada +
        " para " +
        numeroPersonas +
        " personas.";

});