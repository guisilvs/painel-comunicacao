const caixaTexto = document.getElementById('entrada');
const contador = document.getElementById('contador');
const btnCopiar = document.getElementById('btn-copiar');
const btnGerar = document.getElementById('btn-gerar');
const btnLimpar = document.getElementById('btn-limpar');
const selectTom = document.getElementById('tom-texto');

export { caixaTexto, btnGerar, selectTom };

//Função para atualizara o contador
export function atualizarContador() {
    const caracteres = caixaTexto.value.length;
    contador.textContent = `${caracteres} caracteres`;
    return(caracteres);
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

export function indisponibilizarServico() {
    btnGerar.disabled = true;
    btnGerar.textContent = "Indisponível";
    //caixaTexto.value = "";
    caixaTexto.placeholder = ""
    caixaTexto.disabled = true;
    
    selectTom.disabled = true;
    btnCopiar.disabled = true;
    btnLimpar.disabled = true;
}

export function disponibilizarServico() {
    btnGerar.disabled = false;
    btnGerar.textContent = "Gerar com IA";
    //caixaTexto.value = "";
    caixaTexto.placeholder = "Digite aqui..."
    caixaTexto.disabled = false;
    
    selectTom.disabled = false;
    btnCopiar.disabled = false;
    btnLimpar.disabled = false;
}