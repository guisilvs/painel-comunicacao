import { caixaTexto } from './script.js'

const btnGerar = document.getElementById('btn-gerar');
const statusAI = document.getElementById('status-ia');
const selectTom = document.getElementById('tom-texto');

async function inicializarIA() {
    try {
        console.log('em execução');
        if (typeof LanguageModel === 'undefined') {
            statusAI.textContent = "Prompt API não detectada neste navegador.";
            btnGerar.disabled = true;
            return;
        }


    } catch (erro) {
        console.error("Erro ao verificar IA:", erro);
        statusAI.textContent = "⚠️ Erro ao acessar o LanguageModel.";
        btnGerar.disabled = true;
    }
}

inicializarIA();