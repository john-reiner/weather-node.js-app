const weatherForm = document.querySelector('form')
const searchTerm = document.querySelector('input')
const weatherDisplay = document.getElementById('weather-display')

const createWeatherDisplay = (data) => {
    // title
    let title = document.createElement('p')
    title.innerText = data.location
    weatherDisplay.innerText = ''

    let forecastData = document.createElement('div')
    forecastData.id = 'forecast'
    //image
    let image = document.createElement('img')
    image.src = data.forecast.weather_icons[0]
    // temp
    let temp = document.createElement('p')
    temp.innerText = data.forecast.feelslike + '°F'
    // table
    let table = document.createElement('table')
    table.id = 'forecast-info'
    // row 1
    let tableR1 = document.createElement('tr')
    let tableData1 = document.createElement('td')
    tableData1.innerText = 'Humidity:'
    let tableData2 = document.createElement('td')
    tableData2.innerText = data.forecast.humidity + '%'
    // row 2
    let tableR2 = document.createElement('tr')
    let tableData3 = document.createElement('td')
    tableData3.innerText = 'Wind:'
    let tableData4 = document.createElement('td')
    tableData4.innerText = data.forecast.wind_speed + 'MPH, ' + data.forecast.wind_dir
    // row 3
    let tableR3 = document.createElement('tr')
    let tableData5 = document.createElement('td')
    tableData5.innerText = 'UV Index:'
    let tableData6 = document.createElement('td')
    tableData6.innerText = data.forecast.uv_index
    table.append(tableR1, tableR2, tableR3)
    tableR1.append(tableData1, tableData2)
    tableR2.append(tableData3, tableData4)
    tableR3.append(tableData5, tableData6)
    forecastData.append(image, temp, table)
    weatherDisplay.append(title, forecastData)    
}

weatherForm.addEventListener('submit', (event) => {
    event.preventDefault()
    locationSearch = searchTerm.value

    weatherDisplay.innerText = 'loading...'

    fetch(`/weather?address=${locationSearch}`)
    .then(response => response.json())
    .then(data =>{
        if (data.error) {
            weatherDisplay.innerText = data.error
        } else {
            createWeatherDisplay(data)
            // messageOne.innerText = data.location
            // messageTwo.innerText = data.forecast
        }
    })
})