const container = document.querySelector('.container')
const result = document.querySelector('#resultado')
const formBtn = document.querySelector('#formulario')

window.addEventListener('load', () => {
    formBtn.addEventListener('submit', weatherSearch)
})

function weatherSearch(e) {
    e.preventDefault()

    //Validar Formulario
    const city = document.querySelector('#ciudad').value
    const country = document.querySelector('#pais').value

    if (city === '' || country === '') {
        showError("Ambos campos son obligatorios")
        return
    }

    //Consultar la API
    readAPI(city, country)
}


function showError(message) {

    const alert = document.querySelector('.bg-red-100') // busca una alerta con esa clase y si no existe la creamos

    if (!alert) { // para que no se cree varias veces
        const alert = document.createElement('div')
        alert.classList.add('bg-red-100', 'border-red-400', 'text-red-700', 'px-4', 'py-3', 'rounded', 'max-w-md', 'mx-auto', 'mt-6', 'text-center')
        alert.innerHTML = `
        <strong class="font-bold">Error!</strong>
        <span class="block">${message}</span>
    `
        container.appendChild(alert)

        setTimeout(() => {
            alert.remove()
        }, 5000)
    }

}

function readAPI(city, country) {
    const appId = '68a81b9bf592e011d594a444de16b64f';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${appId}`
    Spinner()
    fetch(url)
        .then(response => {
            return response.json()
        })
        .then(data => {
            clearHTML() // esta función es para que limpie el HTML de la anterior consulta
            if (data.cod === "404") {
                showError('Ciudad no encontrada')
                return
            }
            //Imprimir en HTML
            showWeather(data)
        })
        .catch(error => {
            console.log(error)
        })
}

function showWeather(data) {
    const { name, main: { temp, temp_max, temp_min } } = data // esto es una destructuración en profundidad a dos niveles (hacer console de data)

    const Tnow = kelvinToCent(temp)
    const Tmin = kelvinToCent(temp_min)
    const Tmax = kelvinToCent(temp_max)

    const cityName = document.createElement('p')
    cityName.textContent = (`Clima en ${name}`)
    cityName.classList.add('font-bold', 'text-3xl')


    const TempNow = document.createElement('p')
    TempNow.innerHTML = `Actual: ${Tnow} &#8451`
    TempNow.classList.add('font-bold', 'text-6xl')

    const TempMax = document.createElement('p')
    TempMax.innerHTML = `Máxima: ${Tmax} &#8451 `
    TempMax.classList.add('text-xl')

    const TempMin = document.createElement('p')
    TempMin.innerHTML = `Mínima: ${Tmin} &#8451 `
    TempMin.classList.add('text-xl')


    const resultDiv = document.createElement('div')
    resultDiv.classList.add('text-center', 'text-white')
    resultDiv.appendChild(cityName)
    resultDiv.appendChild(TempNow)
    resultDiv.appendChild(TempMax)
    resultDiv.appendChild(TempMin)

    result.appendChild(resultDiv)
}

function kelvinToCent(grados) {
    return (grados - 273.15).toFixed(1)
}

function clearHTML() {
    while (result.firstChild) {
        result.removeChild(result.firstChild)
    }
}

function Spinner() {
    clearHTML()
    const divSpinner = document.createElement('div')
    divSpinner.classList.add('sk.fadding-circle')

    divSpinner.innerHTML = `
        <div class="sk-circle1 sk-circle"></div>
        <div class="sk-circle2 sk-circle"></div>
        <div class="sk-circle3 sk-circle"></div>
        <div class="sk-circle4 sk-circle"></div>
        <div class="sk-circle5 sk-circle"></div>
        <div class="sk-circle6 sk-circle"></div>
        <div class="sk-circle7 sk-circle"></div>
        <div class="sk-circle8 sk-circle"></div>
        <div class="sk-circle9 sk-circle"></div>
        <div class="sk-circle10 sk-circle"></div>
        <div class="sk-circle11 sk-circle"></div>
        <div class="sk-circle12 sk-circle"></div>
    `
    result.appendChild(divSpinner)
}