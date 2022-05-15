export function timer() {
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
        clearInterval(init)
    }

}