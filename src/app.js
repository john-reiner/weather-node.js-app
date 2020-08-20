const express = require('express')
const path = require('path')
const { request } = require('express')
const hbs = require('hbs')

const app = express()

// Paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


// setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'John Reiner'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: "John Andrew Reiner"
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'John Reiner',
        message: 'This pages is designed to help you out.'
    })
})

app.get('/weather', (req, res) => {
    res.send({
        forcast: 'Sunny',
        location: 'Keyport NJ'
    })
})

app.listen(3000, () => {
    console.log('server started on port 3000')
})