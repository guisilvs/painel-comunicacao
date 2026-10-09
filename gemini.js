import {
    caixaTexto,
    indisponibilizarServico,
    disponibilizarServico,
    atualizarContador,
    btnGerar,
    selectTom
} from './script.js'

const statusAI = document.getElementById('status-ia');

// cria uma função assincrona para verificar a disponibilidade da IA
async function inicializarIA() {
    console.log('IA em execução');

    try {
        // Verifica se existe a variável no navegador
        if (typeof LanguageModel === 'undefined') {
            console.log("IA indisponível neste navegador")
            statusAI.textContent = "IA não compatível neste dispositivo ou navegador";
            indisponibilizarServico();
            return;
        }

        //armazena o status de disponibilidade do serviço
        const disponibilidade = await LanguageModel.availability()

        if (disponibilidade === 'no') {
            console.log("Hardware incompatível com IA local")
            indisponibilizarServico();
            return;
        }

        if (disponibilidade === 'downloading') {
            statusAI.textContent = "Navagedor instalando modelo de IA local..."
            indisponibilizarServico();
        } else {
            statusAI.textContent = "";
            disponibilizarServico();
        }


    } catch (erro) {
        console.error("Erro ao verificar IA:", erro);
        statusAI.textContent = "Ocorreu um erro ao verificar";
        indisponibilizarServico();
    }
}

//inicializa de forma assincrona o modelo de IA
inicializarIA();

btnGerar.addEventListener('click', async function () {
    //backup armazena o texto original
    localStorage.setItem('original', caixaTexto.value);

    //valida o tamanho de texto suficiente
    if (atualizarContador() < 5) {
        statusAI.textContent = "Tamanho insuficiente";

        setTimeout(function () {
            statusAI.textContent = ""
        }, 2000);
        return
    }
    console.log("foi hehe");
});
