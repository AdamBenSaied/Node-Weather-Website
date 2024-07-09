const weather_form = document.querySelector('form')
const search = document.querySelector('input')
const firstResult = document.querySelector('#FirstResult')
const secondResult = document.querySelector('#SecondResult')



weather_form.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value
    firstResult.textContent = 'Loading...'
    secondResult.textContent = ''
    fetch('http://localhost:3001/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                firstResult.textContent = data.error
            } else {
                firstResult.textContent = data.location
                secondResult.textContent = data.forecast
            }
        })
    })


})