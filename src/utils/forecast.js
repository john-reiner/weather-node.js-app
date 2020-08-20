const request = require('request')

const forecast = (latitude, longitude, callback) => {

    url = `http://api.weatherstack.com/current?access_key=79a76f2346853bce29476e23b04cc23a&query=${latitude},${longitude}&units=f`

    request({url, json: true}, (error, response) => {

        const {error: err, current} = response.body

        if (error) {
            callback("Error! Unable to connect to weather service at this time.", undefined)
        } else if (err) {
            callback("Error! Unable to find location.", undefined)
        } else {
            callback(undefined, current.weather_descriptions[0] + ` It is currently ${current.temperature} degrees out. It feels like ${current.feelslike} degrees out.`)
        }
    })
}

module.exports = forecast