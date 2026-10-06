const caixaTexto = document.getElementById('entrada');
const contador = document.getElementById('contador');
const btnCopiar = document.getElementById('btn-copiar');

//Função para atualizara o contador
function atualizarContador() {
    const caracteres = caixaTexto.value.length;
    contador.textContent = `${caracteres} caracteres`;
};

//Recuperação de texto digitado
const backupRascunho = localStorage.getItem('rascunho');

if (backupRascunho) {
    caixaTexto.value = backupRascunho;
    atualizarContador();
}

//Usuário digitando
caixaTexto.addEventListener('input', function(){

    
});