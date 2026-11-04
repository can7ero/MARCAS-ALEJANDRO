const botonTema = document.createElement("button");
botonTema.className = "theme-toggle";
botonTema.type = "button";
botonTema.setAttribute("aria-pressed", "false");
document.body.append(botonTema);

function aplicarTema(tema) {
  const oscuro = tema === "oscuro";
  document.body.dataset.tema = oscuro ? "oscuro" : "claro";
  botonTema.textContent = oscuro ? "☀️ Modo claro" : "🌙 Modo oscuro";
  botonTema.setAttribute("aria-pressed", String(oscuro));
}

let temaGuardado = null;
try {
  temaGuardado = localStorage.getItem("tema-web");
} catch (error) {
  console.warn("No se pudo leer la preferencia del tema.", error);
}

aplicarTema(temaGuardado === "oscuro" ? "oscuro" : "claro");

botonTema.addEventListener("click", function () {
  const tema = document.body.dataset.tema === "oscuro" ? "claro" : "oscuro";
  aplicarTema(tema);

  try {
    localStorage.setItem("tema-web", tema);
  } catch (error) {
    console.warn("No se pudo guardar la preferencia del tema.", error);
  }
});
