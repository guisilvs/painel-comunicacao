![CAPA](/docs/ComunicaPlus.png)
# Comunica Plus: Refinamento Corporativo com IA Local

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Gemini Nano](https://img.shields.io/badge/Gemini_Nano-8E75B2?style=for-the-badge&logo=google&logoColor=white)

Uma aplicação web client-side projetada para otimizar e refinar e-mails e anotações corporativas. O diferencial arquitetônico deste projeto é o processamento **100% local e offline**, garantindo a segurança dos dados da empresa ao rodar o modelo fundacional diretamente no navegador do usuário via **Prompt API**.



##  Objetivo e Impacto

Projeto construído para demonstrar domínio prático em:
- Desenvolvimento Front-end puro (Vanilla JS, CSS Flexbox).
- Manipulação assíncrona de DOM e gerenciamento de estado (Loading, Streaming).
- Persistência de dados locais com `localStorage`.
- Implementação de Inteligência Artificial nativa do navegador (AI on Web).
- Boas práticas de acessibilidade (A11y) e UI/UX.



## Arquitetura: Inteligência Artificial Local (Prompt API)

Este projeto utiliza a **Prompt API** para rodar o modelo **Gemini Nano** diretamente no Google Chrome do usuário, sem necessidade de servidores em nuvem ou chaves de API externas. 

**Vantagens da abordagem:**
1.  **Privacidade Zero-Trust:** O texto digitado nunca sai da máquina do usuário.
2.  **Zero Latência de Rede:** Processamento offline após o download do modelo.
3. **Custo Zero de Nuvem:** A computação é delegada ao hardware do cliente.

### Requisitos Mínimos (Google Chrome)
Como trata-se de uma tecnologia experimental, o Chrome do usuário deve atender aos seguintes critérios de hardware para que a IA local (Gemini Nano) funcione:
- **Espaço em disco:** Mínimo de 22 GB livres (o modelo em si ocupa ~4 GB, mas o Chrome exige a folga para gestão).
- **RAM e Processamento:** 16 GB de RAM e processador com 4 núcleos (ou GPU com mais de 4 GB de VRAM).



## Como executar o projeto localmente
![CAPA](/docs/inicial.png)

Por ser um projeto de arquitetura *Client-Side* pura, não há necessidade de instalação de dependências pesadas (`node_modules`).

### 1. Clonar o repositório
```bash
git clone https://github.com/SEU_USUARIO_AQUI/painel-comunicacao.git
cd painel-comunicacao
```

### 2. Ativar a IA Local no seu Chrome
Para testar a geração de texto via IA, você precisa ativar as *flags* experimentais do navegador:
1. Abra o Google Chrome.
2. Digite na barra de endereços: `chrome://flags/`
3. Busque por **Prompt API** e ative (mude para *Enabled*).
4. Reinicie o navegador.

### 3. Rodar a aplicação
Basta abrir o arquivo principal no navegador ou usar o Live Server (VS Code):
```bash
# No Windows
start index.html
```

*Ao abrir pela primeira vez, acompanhe o status na interface: a IA fará o download do modelo localmente caso ainda não esteja em cache.*



## Funcionalidades
- **Auto-Save:** Rascunhos salvos automaticamente em tempo real na memória do navegador.
- **Múltiplos Tons:** Conversão de texto para tom 'Profissional', 'Direto' ou 'Amigável'.
- **Streaming de IA:** O texto de saída é gerado e "digitado" progressivamente na tela (Feedback em tempo real).
- **Copiar para clipboard:** Utilitário prático para área de transferência rápida.
- **Acessibilidade:** Interface auditada para contraste de cores e tags ARIA, garantindo usabilidade por leitores de tela.