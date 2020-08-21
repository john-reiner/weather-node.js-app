const express = require('express')
const path = require('path')
const { request } = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

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

    if(req.query.address) {

        geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
            if (error) {
                res.send({error})
            } else {
                forecast(latitude, longitude, (error, forecastData) => {
                    if (error) {
                        return console.log(error)
                    }
                    res.send({
                        forecast: forecastData,
                        location: location
                    })
                })                
            }
        })
    } else {
        res.send({
            error: 'You must provide an address'
        })
    }
})

app.get('/products', (req, res) => {

    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query.search)

    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'John Reiner',
        errorMessage: 'Help article not found.'
    })
})


app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'John Reiner',
        errorMessage: 'Page not found.'
    })
})

app.listen(port, () => {
    console.log('server started on port 3000')
})