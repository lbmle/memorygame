const ID_BOTAO_JOGAR = "jogar"
const ID_CONTADOR = "contador"
const ID_FIM = "fim"
const ID_CONTEUDO = "conteudo"
const ID_MENSAGEM = "mensagem"
const CLASSE_INATIVO = "transparente"
let startTimer
let segundos

class Tela {

    static atualizarIcones(itens) {
        const codigoHtml = Tela.gerarStringHTMLPelaImagem(itens)
        Tela.alterarConteudoHTML(codigoHtml)
    }

    static gerarStringHTMLPelaImagem(data) {
        return data.map(Tela.obterCodigoHtml).join('')
    }
    static obterCodigoHtml(item) {

        return `   
            <span   onclick="window.verificarClique('${item.id}', '${item.nome}')">
                <img name="${item.nome}" src="${item.img}" class="icone" alt="${item.nome}" />
            </span>  
        `
    }

    static alterarConteudoHTML(codigoHtml) {
        const conteudo = document.getElementById(ID_CONTEUDO)
        conteudo.innerHTML = codigoHtml
    }

    static mostrarContagemRegressiva(str, tm) {
        document.getElementById(ID_BOTAO_JOGAR).classList.add(CLASSE_INATIVO)
        let tempoInicio = tm
        const identificadorNoTexto = "$$contagem"
        const textoPadrao = `${str} ${identificadorNoTexto} segundos...`
        const elementoMensagem = document.getElementById(ID_MENSAGEM)
        const atualizarTexto = _ => { (elementoMensagem.innerHTML = textoPadrao.replace(identificadorNoTexto, tempoInicio--)) }
        atualizarTexto()
        const idIntervalo = setInterval(atualizarTexto, 1000);
        return idIntervalo
    }

    static iniciarContador() {
        const elementoContador = document.getElementById(ID_CONTADOR)
        const addSecond = _ => (elementoContador.innerHTML = segundos++)
        addSecond()
        startTimer = setInterval(addSecond, 1000);
    }

    static mudarFim(tm) {
        const elementoFim = document.getElementById(ID_FIM)
        elementoFim.innerHTML = tm
    }

    static pararContador(str) {
        clearInterval(startTimer)
        document.getElementById(ID_MENSAGEM).innerHTML = str
        document.getElementById(ID_BOTAO_JOGAR).classList.remove(CLASSE_INATIVO)
    }

    static zerarContador() {
        const elementoContador = document.getElementById(ID_CONTADOR)
        elementoContador.innerHTML = 0
    }

    static limparContagemRegressiva(idContador) {
        clearInterval(idContador)
        document.getElementById(ID_MENSAGEM).innerHTML = "________ Tempo ___ Limite"
    }

    static configurarBotaoJogar(funcaoOnclick) {
        const btnJogar = document.getElementById(ID_BOTAO_JOGAR)
        btnJogar.onclick = funcaoOnclick

    }

    static configurarClique(funcaoOnclick) {
        window.verificarClique = funcaoOnclick
    }
}

