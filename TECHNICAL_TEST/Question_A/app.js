console.log("CONECTADO")

function verificarSuperposicion() {
    const x1 = parseInt(document.getElementById("x1").value);
    const x2 = parseInt(document.getElementById("x2").value);
    const x3 = parseInt(document.getElementById("x3").value);
    const x4 = parseInt(document.getElementById("x4").value);

    if (!isNaN(x1) && !isNaN(x2) && !isNaN(x3) && !isNaN(x4)) {
        const superpuestas = x1 <= x4 && x2 >= x3;

        if (superpuestas) {
            document.getElementById("resultado").textContent = "Las líneas se superponen.";
        } else {
            document.getElementById("resultado").textContent = "Las líneas no se superponen.";
        }
    } else {
        document.getElementById("resultado").textContent = "Ingresa valores numéricos válidos en todos los campos.";
    }
}

document.getElementById("verificarButton").addEventListener("click", verificarSuperposicion);