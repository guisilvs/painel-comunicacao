import { caixaTexto } from './script.js'

const btnGerar = document.getElementById('btn-gerar');
const statusAI = document.getElementById('status-ia');
const selectTom = document.getElementById('tom-texto');

// cria uma função assincrona para verificar a disponibilidade da IA
async function inicializarIA() {
    console.log('IA em execução');

    try {
        // Verifica se existe a variável no navegador
        if (typeof LanguageModel === 'undefined') {
            console.log("IA indisponível neste navegador")
            statusAI.textContent = "IA não compatível neste dispositivo ou navegador";
            btnGerar.disabled = true;
            btnGerar.textContent = "Indisponível";
            caixaTexto.value = " ";
            caixaTexto.disabled = true;
            return;
        }




    } catch (erro) {
        console.error("Erro ao verificar IA:", erro);
        statusAI.textContent = "Ocorreu um erro ao verificar";
        btnGerar.disabled = true;
    }
}

inicializarIA();

console.log("exemplo")