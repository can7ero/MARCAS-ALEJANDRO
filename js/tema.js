let modoOscuro = localStorage.getItem("tema-web") === "oscuro";
const botonTema = document.createElement("button");

botonTema.className = "theme-toggle";
botonTema.type = "button";
document.body.append(botonTema);

function actualizarTema() {
  document.body.dataset.tema = modoOscuro ? "oscuro" : "claro";
  botonTema.textContent = modoOscuro ? "☀️ Modo claro" : "🌙 Modo oscuro";
  botonTema.setAttribute("aria-pressed", modoOscuro);
}

actualizarTema();

botonTema.addEventListener("click", function () {
  alert("Se va a cambiar el color de la página.");
  modoOscuro = !modoOscuro;
  actualizarTema();
  localStorage.setItem("tema-web", modoOscuro ? "oscuro" : "claro");
});
