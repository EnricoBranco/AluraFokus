const html = document.querySelector('html')
const modosBt = document.querySelectorAll('.app__card-button')
const banner = document.querySelector('.app__image')
const titulo = document.querySelector('.app__title')
const startBt = document.querySelector('#alternar-musica')
const comecarBt = document.querySelector('#start-pause')
const tempoNaTela = document.querySelector('#timer')
const musica = new Audio ('sons/luna-rise-part-one.mp3')
const playAudio = new Audio('sons/play.wav')
const pauseAudio = new Audio('sons/pause.mp3')
const fimAudio = new Audio('sons/beep.mp3')

let intervaloId
let segundosDec = 1500

musica.loop = true

function alterarBotao(i) {
    modosBt[i].classList.add('active')
}

function alterarContexto(contexto) {
    mostrarTempo()
    html.setAttribute('data-contexto', contexto)
    banner.setAttribute('src', `/imagens/${contexto}.png`)
    modosBt.forEach(function(elemento) {
        elemento.classList.remove('active')
    })

    switch(contexto) {
        case"foco":
            titulo.innerHTML = `Otimize sua produtividade,<br>
            <strong class="app__title-strong">mergulhe no que importa.</strong>`
            break;
        case"descanso-curto":
            titulo.innerHTML = `Que tal dar uma respirada?<br>
            <strong class="app__title-strong">Faça uma pausa curta.</strong>`
            break;
        case"descanso-longo":
            titulo.innerHTML = `Hora de voltar a superfície,<br>
            <strong class="app__title-strong">Faça uma pausa longa.</strong>`
            break;
    }
}

modosBt[0].addEventListener('click', () => {
    segundosDec = 1500;
    alterarContexto('foco')
    alterarBotao(0)
})

modosBt[1].addEventListener('click', () => {
    segundosDec = 300;
    alterarContexto('descanso-curto')
    alterarBotao(1)
})

modosBt[2].addEventListener('click', () => {
    segundosDec = 900;
    alterarContexto('descanso-longo')
    alterarBotao(2)
})

startBt.addEventListener('change', () => {
    if (musica.paused) {
        musica.play()
    }
    else {
        musica.pause()
    }
})

const contagemRegressiva = () => {
    if (segundosDec <= 0) {
        fimAudio.play()
        alert('acabou o tempo')
        zerar()
        return
    }
    segundosDec -= 1
    mostrarTempo()
}

comecarBt.addEventListener('click', () => {
    if (intervaloId) {
        console.log(intervaloId)
        zerar()
        return
    }else {
        console.log(intervaloId)
        playAudio.play()
        intervaloId = setInterval(contagemRegressiva, 1000)
        comecarBt.childNodes[3].textContent = 'Pause'
        comecarBt.childNodes[1].setAttribute('src', 'imagens/pause.png')
    }
})

function zerar() {
    clearInterval(intervaloId)
    comecarBt.childNodes[3].textContent = 'Começar'
    comecarBt.childNodes[1].setAttribute('src', 'imagens/play_arrow.png')
    intervaloId = null
    pauseAudio.play()
}

function mostrarTempo() {
    const tempo = new Date(segundosDec * 1000)
    const tempoFormatado = tempo.toLocaleTimeString('pt-br', {minute: '2-digit', second: '2-digit'})
    tempoNaTela.innerHTML = `${tempoFormatado}`
}

mostrarTempo()
