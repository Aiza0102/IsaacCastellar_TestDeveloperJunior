document.addEventListener("DOMContentLoaded", function () {
    const version1Input = document.getElementById("version1");
    const version2Input = document.getElementById("version2");
    const resultadoElement = document.getElementById("resultado");
    const compararButton = document.getElementById("compararButton");

    compararButton.addEventListener("click", function () {
        const version1 = version1Input.value;
        const version2 = version2Input.value;

        const comparacion = compararVersiones(version1, version2);

        resultadoElement.textContent = comparacion;
    });

    function compararVersiones(version1, version2) {
        const partes1 = version1.split(".");
        const partes2 = version2.split(".");
        
        const maxLength = Math.max(partes1.length, partes2.length);
        
        for (let i = 0; i < maxLength; i++) {
            const num1 = parseInt(partes1[i]) || 0;
            const num2 = parseInt(partes2[i]) || 0;
            
            if (num1 < num2) {
                return `${version1} es menor que ${version2}`;
            } else if (num1 > num2) {
                return `${version1} es mayor que ${version2}`;
            }
        }
        
        return `${version1} es igual a ${version2}`;
    }
});