import {
    caixaTexto,
    indisponibilizarServico,
    disponibilizarServico,
    atualizarContador,
    btnGerar,
    selectTom
} from './script.js'

let sessaoAI = null; //guarda a sessão ativa
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

        /* if (disponibilidade === 'downloading') {
            statusAI.textContent = "Navagedor instalando modelo de IA local..."
            indisponibilizarServico();
        } else {
            statusAI.textContent = "";
            disponibilizarServico();
        } */

        //significa que precisa do modelo
        if (disponibilidade === 'after-download' || disponibilidade === 'downloading') {
            statusAI.textContent = "Iniciando download do modelo de IA local (cerca de 4GB)...";
            indisponibilizarServico();

            //disparar o download e ouvir o progresso em tempo real
            try {
                sessaoAI = await LanguageModel.create({
                    monitor(m) {
                        m.addEventListener('downloadprogress', (e) => {
                            //calcula o percentual real do download e joga direto no seu painel de status
                            const progresso = (e.loaded / e.total * 100).toFixed(1);
                            statusAI.textContent = `Navegador instalando modelo de IA local... ${progresso}%`;
                        });
                    },
                });

                statusAI.textContent = "";
                disponibilizarServico();

            } catch (erroDownload) {
                console.error("Erro durante o download do modelo:", erroDownload);
                statusAI.textContent = "Falha ao baixar o modelo de IA.";
                indisponibilizarServico();
            }

        } else {
            // Se cair aqui, o usuário já tinha o modelo baixado no cache do Chrome
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
    const textoOriginal = caixaTexto.value;

    //backup armazena o texto original
    localStorage.setItem('original', textoOriginal);

    //valida o tamanho de texto suficiente
    if (atualizarContador() < 5) {
        statusAI.textContent = "Tamanho insuficiente";

        setTimeout(function () {
            statusAI.textContent = ""
        }, 2000);
        return
    }

    statusAI.textContent = "Gerando..."
    btnGerar.disabled = true;

    try {
        const tomEscolhido = selectTom.options[selectTom.selectedIndex].text;
        const systemPrompt = `Você é um assistente de comunicação corporativa especialista em refatorar textos. 
Reescreva a mensagem do usuário aplicando o tom: ${tomEscolhido}. 
Devolva APENAS o texto reescrito, sem introduções ou explicações.`

        if (!sessaoAI) {
            sessaoAI = await LanguageModel.create({
                initialPrompts: [{ role: 'system', content: systemPrompt }]
            });
        }

        //limpa a caixa de entrada para receber o texto da IA
        caixaTexto.value = "";

        const stream = sessaoAI.promptStreaming(textoOriginal);

        for await (const pedaco of stream) {
            caixaTexto.value += pedaco;
            atualizarContador();
        }

        statusAI.textContent = "Gerado com sucesso"

    } catch (erro) {
        console.error("Erro durante o processamento da IA", erro);
        statusAI.textContent = "Não foi possível gerar..."
    } finally {
        statusAI.textContent = "";
        btnGerar.disabled = false;
    }

});

// apaga a sessão caso altere o tom
selectTom.addEventListener('change', function () {
    if (sessaoAI) {
        console.log("Tom de voz alterado. Resetando a sessão da IA...");
        sessaoAI.destroy();
        sessaoAI = null; // Deixa null para o próximo clique criar uma sessão com o novo tom
    }
});
