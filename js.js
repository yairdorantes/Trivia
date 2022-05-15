import Questions from './Questions.js'
const d = document
var init,
    currentStreak = 0
let $progressBar = d.querySelector('.progress-bar')
var $colorBarra = d.querySelector('.bg-success'),
    cont = 100,
    askedQuestions = [];

var fail = false,
    finished = false
const word = 'CoRrEcTaNsWeR',
    $currentStreak = d.getElementById('streak'),
    $containerTrivia = d.querySelector('.container-fluid')


d.addEventListener('DOMContentLoaded', CreateTrivia)

function share(currentStreak) {
    var $a = d.createElement('a')
    var $imgWP = d.createElement('img');
    $imgWP.src = './assets/whatsapp.png'
    $a.href = `https://api.whatsapp.com/send?text=%20https://triviamix.000webhostapp.com/Trivia/index.html%20¡Tuve%20una%20racha%20de:%20${currentStreak}!%20¿Me superarás?`
    $a.style.textDecoration = 'none';
    //  $a.style.fontFamily = "Oswald, sans-serif;"
    $a.textContent = 'Comparte tu última racha :)'
    d.querySelector('.enlace').appendChild($a)
    $a.appendChild($imgWP)
    $a.style.position = 'fixed'
    $a.style.color = 'green'
}

function clean() {

    d.getElementById('question').innerHTML = ''
    let Respuestas = d.querySelectorAll('.answer')
    Respuestas.forEach(e => {
        let questionReplace = e
        parent = questionReplace.parentNode
        parent.removeChild(questionReplace)
    })
    fail = false
    finished = false
    cont = 115
    CreateTrivia()
}
function stopInterval(init) {
    clearInterval(init);
}
function colorProgress() {

    if (cont <= 40 && cont > 20) {
        $colorBarra.classList.remove('bg-warning')
        $colorBarra.classList.add('bg-success')
    }
    if (cont <= 20) {
        $colorBarra.classList.remove('bg-danger')
        $colorBarra.classList.add('bg-success')
    }
    if (cont <= 0) {
        $colorBarra.classList.remove('bg-danger')
        $colorBarra.classList.remove('bg-warning')
        $colorBarra.classList.add('bg-success')
    }
}
function CreateTrivia() {
    function timer() {
        $progressBar.style.width = `${cont}%`
        cont -= 1

        if (cont === 40) {
            $colorBarra.classList.remove('bg-success')
            $colorBarra.classList.add('bg-warning')

        }
        if (cont === 20) {
            $colorBarra.classList.remove('bg-warning')
            $colorBarra.classList.add('bg-danger')
        }
        if (cont < 0) {
            finished = true
            $currentStreak.innerHTML = `Racha:0⚡`
            currentStreak = 0

            clearInterval(init)
            setTimeout(() => correctAnswer.classList.add('succes'), 1000)
            setTimeout(() => colorProgress, 1000)

            setTimeout(() => clean(), 2000)
            const correctAnswer = d.getElementById('correct-answer')
            $colorBarra.classList.remove('bg-danger')
            $colorBarra.classList.add('bg-success')
            $currentStreak.classList.add('losed-streak')
            setTimeout(() => $currentStreak.classList.remove('losed-streak'), 1000)
        }

    }

    var randomPlace = []
    init = setInterval(timer, 100)
    var RandomQuestion = Object.keys(Questions)[Math.floor(Math.random() * Object.keys(Questions).length)];
    while (askedQuestions.includes(RandomQuestion)) {
        // console.log('lol')
        RandomQuestion = Object.keys(Questions)[Math.floor(Math.random() * Object.keys(Questions).length)];
        if (!askedQuestions.includes(RandomQuestion)) break;

        if (askedQuestions.length == Object.keys(Questions).length) {
            askedQuestions = [];
            break;
        };

    }
    askedQuestions.push(RandomQuestion)
    //  console.log(askedQuestions)
    var txtSearch = RandomQuestion
    const getValues = Questions[`${txtSearch}`]



    for (var i = 0; i < getValues.length; i++) {
        let $div = d.createElement('div')
        $div.classList.add('answer')
        $div.classList.add('display-6')
        if (getValues[i].includes(word)) {
            let correctAnswerText = getValues[i].replace(word, '')
            $div.innerHTML = `<div class='xd'>${correctAnswerText}</div>`
            $div.id = 'correct-answer'
        } else {
            $div.innerHTML = `<div class='xd'>${getValues[i]}</div>`
        }
        randomPlace.push($div)
    }
    randomPlace.sort(function () {
        return Math.random() - 0.5
    })
    randomPlace.forEach(e => {
        $containerTrivia.appendChild(e)
    })

    const $questionText = d.getElementById('question')
    $questionText.textContent = RandomQuestion

    const incorrectAnswers = d.querySelectorAll('.xd')

    d.addEventListener('click', event => {
        if (!fail == true && !finished == true) {
            const correctAnswer = d.getElementById('correct-answer')
            if (event.target.matches(`#correct-answer *`)) {
                correctAnswer.classList.add('succes')

                finished = true
                currentStreak++;
                $currentStreak.innerHTML = `Racha:${currentStreak}⚡`

                setTimeout(() => stopInterval(init), 10)
                setTimeout(() => clean(), 3000)
                setTimeout(() => colorProgress(), 2000)

                $currentStreak.classList.add('streak-win')
                setTimeout(() => $currentStreak.classList.remove('streak-win'), 1000)


            }
            incorrectAnswers.forEach(e => {
                if (event.target == e) {
                    if (!event.target.matches(`#correct-answer *`)) {
                        event.target.parentNode.classList.add('fail')
                        event.target.classList.add('fail')
                        fail = true
                        setTimeout(() => correctAnswer.classList.add('succes'), 2000)

                        cont = 0
                        $currentStreak.innerHTML = `Racha:0⚡`
                        if (d.querySelector('a')) {
                            let enlace = d.querySelector('a')
                            let parenLink = enlace.parentNode
                            parenLink.removeChild(enlace)
                            share(currentStreak)
                        } else {
                            share(currentStreak)
                        }

                        currentStreak = 0
                        //  setTimeout(() => clean(), 5000)
                        setTimeout(() => colorProgress(), 1000)
                        $currentStreak.classList.add('losed-streak')
                        setTimeout(() => $currentStreak.classList.remove('losed-streak'), 1000)
                    }
                }
            })
        }

    })

}


