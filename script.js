const caixaTexto = document.getElementById('entrada');
const contador = document.getElementById('contador');

caixaTexto.addEventListener('input', function(){

    const caracteres = caixaTexto.value.length;
    contador.textContent = `${caracteres} caracteres`;
});