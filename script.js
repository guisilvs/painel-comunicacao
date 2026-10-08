const caixaTexto = document.getElementById('entrada');
const contador = document.getElementById('contador');
const btnCopiar = document.getElementById('btn-copiar');
const btnLimpar = document.getElementById('btn-limpar');

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
caixaTexto.addEventListener('input', function () {
    atualizarContador();

    //armazena o texto digitado na memória local
    localStorage.setItem('rascunho', caixaTexto.value);
});

//Copiar texto
btnCopiar.addEventListener('click', function () {
    //copiar para área de tranferencia do windows/android
    if (caixaTexto.value) {
        navigator.clipboard.writeText(caixaTexto.value).then(function () {
            //feedback visual
            btnCopiar.textContent = "Copiado"
            btnCopiar.style.backgroundColor = "#d4ffde";

        });
    } else {
        btnCopiar.textContent = "Nada para copiar...";
        btnCopiar.style.backgroundColor = "#f6fbde";
    };

    setTimeout(function(){
        btnCopiar.textContent = "Copiar Texto";
        btnCopiar.style.backgroundColor = "";
    }, 2000);
});

//limpa a caixa de texto e memória
btnLimpar.addEventListener('click', function(){
    caixaTexto.value = "";
    atualizarContador();
    localStorage.removeItem('rascunho');

    caixaTexto.focus(); //devolve o foco para a caixa de texto
})