const html = document.querySelector('html')
const modosBt = document.querySelectorAll('.app__card-button')
const banner = document.querySelector('.app__image')
const titulo = document.querySelector('.app__title')
const startBt = document.querySelector('#alternar-musica')
const musica = new Audio ('/sons/luna-rise-part-one.mp3')

musica.loop = true

function alterarBotao(i) {
    modosBt[i].classList.add('active')
}

function alterarContexto(contexto) {
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
    alterarContexto('foco')
    alterarBotao(0)
})

modosBt[1].addEventListener('click', () => {
    alterarContexto('descanso-curto')
    alterarBotao(1)
})

modosBt[2].addEventListener('click', () => {
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

