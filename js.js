const d = document
let Questions = {
    '¿Cuanto es 2+2?': [2, 3, 4, 5],
    '¿cuanto ganas?': [1000, 100, 200],
}
let lista = []
let $progressBar = d.querySelector('.progress-bar')

cont = 100

function timer() {
    $progressBar.style.width = `${cont}%`
    cont -= 1
    if (cont < 0) {
        clearInterval(init)
    }

}
const $containerTrivia = d.querySelector('.container-fluid')
const init = setInterval(timer, 100)
const RandomQuestion = Object.keys(Questions)[Math.floor(Math.random() * Object.keys(Questions).length)];
var txtSearch = RandomQuestion
const $answer = d.querySelectorAll('.answer')
for (var i = 0; i < (Questions[`${txtSearch}`]).length; i++) {
    let $div = d.createElement('div')
    $div.classList.add('answer')
    $div.textContent = Questions[`${txtSearch}`][i]
    $containerTrivia.appendChild($div)
}

const $questionText = d.getElementById('question')


$questionText.textContent = RandomQuestion

    // const randomElement = Questions[Math.floor(Math.random() * Questions.length)];

