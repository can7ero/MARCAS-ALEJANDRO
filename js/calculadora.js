const pantalla = document.getElementById("pantalla");
const teclas = document.querySelector(".teclas");

let numeroActual = "0";
let numeroAnterior = null;
let operador = null;
let nuevoNumero = true;
let hayError = false;

function mostrarNumero() {
  pantalla.textContent = numeroActual;
}

function limpiar() {
  numeroActual = "0";
  numeroAnterior = null;
  operador = null;
  nuevoNumero = true;
  hayError = false;
  mostrarNumero();
}

function escribirNumero(numero) {
  if (hayError) {
    limpiar();
  }

  if (nuevoNumero) {
    numeroActual = numero === "." ? "0." : numero;
    nuevoNumero = false;
  } else if (numero === "." && !numeroActual.includes(".")) {
    numeroActual += ".";
  } else if (numero !== ".") {
    numeroActual = numeroActual === "0" ? numero : numeroActual + numero;
  }

  mostrarNumero();
}

function calcular() {
  if (operador === null) return;

  const primero = numeroAnterior;
  const segundo = Number(numeroActual);
  let resultado;

  if (operador === "+") resultado = primero + segundo;
  if (operador === "-") resultado = primero - segundo;
  if (operador === "*") resultado = primero * segundo;
  if (operador === "/") {
    if (segundo === 0) {
      pantalla.textContent = "No se puede dividir entre 0";
      hayError = true;
      numeroAnterior = null;
      operador = null;
      nuevoNumero = true;
      return;
    }
    resultado = primero / segundo;
  }

  if (!Number.isFinite(resultado)) {
    pantalla.textContent = "Número demasiado grande";
    hayError = true;
    numeroAnterior = null;
    operador = null;
    nuevoNumero = true;
    return;
  }

  numeroActual = String(Math.round(resultado * 10000000000) / 10000000000);
  numeroAnterior = null;
  operador = null;
  nuevoNumero = true;
  mostrarNumero();
}

function pulsarTecla(tecla) {
  if (tecla.dataset.numero !== undefined) {
    escribirNumero(tecla.dataset.numero);
  } else if (tecla.dataset.operador) {
    if (hayError) limpiar();
    if (operador && !nuevoNumero) calcular();
    numeroAnterior = Number(numeroActual);
    operador = tecla.dataset.operador;
    nuevoNumero = true;
  } else if (tecla.dataset.accion === "igual") {
    calcular();
  } else if (tecla.dataset.accion === "limpiar") {
    limpiar();
  } else if (tecla.dataset.accion === "borrar") {
    if (hayError) {
      limpiar();
    } else if (!nuevoNumero) {
      numeroActual = numeroActual.length > 1 ? numeroActual.slice(0, -1) : "0";
      mostrarNumero();
    }
  }
}

teclas.addEventListener("click", function (evento) {
  if (evento.target.matches("button")) {
    pulsarTecla(evento.target);
  }
});

document.addEventListener("keydown", function (evento) {
  if (evento.target.closest("a, button, input, textarea, select")) return;

  const tecla = evento.key;
  let selector = "";

  if ((tecla >= "0" && tecla <= "9") || tecla === ".") {
    selector = `[data-numero="${tecla}"]`;
  } else if (tecla === "Enter" || tecla === "=") {
    selector = '[data-accion="igual"]';
  } else if (tecla === "Escape") {
    selector = '[data-accion="limpiar"]';
  } else if (tecla === "Backspace") {
    selector = '[data-accion="borrar"]';
  } else if (["+", "-", "*", "/"].includes(tecla)) {
    selector = `[data-operador="${tecla}"]`;
  }

  if (selector) {
    evento.preventDefault();
    pulsarTecla(teclas.querySelector(selector));
  }
});
