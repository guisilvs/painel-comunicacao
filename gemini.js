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
    console.log('Verificação em andamento...');

    try {
        // Verifica se existe a variável no navegador
        if (typeof LanguageModel === 'undefined') {
            console.log("IA indisponível neste navegador")
            statusAI.textContent = "IA não compatível neste navegador";
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
            console.log("IA compatível e disponível")
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
        console.log("Tentando gerar o texto")
        const tomEscolhido = selectTom.options[selectTom.selectedIndex].text;
        const systemPrompt = `Você é um editor de comunicação corporativa especialista. Sua única função é reescrever, 
        corrigir e aprimorar o texto fornecido pelo usuário, aplicando rigorosamente o seguinte tom: ${tomEscolhido}. 
        Siga estas diretrizes estritas: retorne única e exclusivamente o texto reescrito. É terminantemente proibido incluir 
        saudações iniciais, confirmações, explicações ou aspas delimitando a resposta; o primeiro caractere da sua saída 
        deve ser diretamente o texto final. Você é o revisor e não o destinatário da mensagem, portanto, nunca altere a pessoa 
        gramatical do discurso, não responda à mensagem do usuário e não inverta o emissor. Respeite rigorosamente a formatação e a 
        intenção originais: se a entrada estiver entre parênteses, a saída deve estar entre parênteses; se for um e-mail, 
        mantenha o formato de e-mail, sendo permitido adicionar quebras de parágrafos e assinaturas 
        cordiais de encerramento para melhorar a legibilidade. É estritamente proibido utilizar emojis de 
        qualquer tipo ou formato, mesmo que o tom escolhido seja amigável. Melhore a fluidez e a gramática sem 
        adicionar informações inventadas que fujam do escopo original. Seu processamento falhará se houver qualquer palavra,
         aviso ou caractere na sua resposta que não seja parte integrante do texto final reescrito.`

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
