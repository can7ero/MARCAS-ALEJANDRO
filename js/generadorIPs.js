function actualizarIP(direccion) {
    document.getElementById("ip").textContent = direccion;
}

function mostrarDireccionRed() {
    actualizarIP("192.168.1.0");
}

function mostrarPuertaEnlace() {
    actualizarIP("192.168.1.1");
}

function generarIP() {
    var numero = Math.floor(Math.random() * 253) + 2;
    actualizarIP("192.168.1." + numero);
}

function mostrarBroadcast() {
    actualizarIP("192.168.1.255");
}

function mostrarMascara() {
    actualizarIP("255.255.255.0");
}
