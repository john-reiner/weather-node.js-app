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

    if(req.query.address) {
        res.send({
            forcast: 'Sunny',
            location: req.query.address
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

app.listen(3000, () => {
    console.log('server started on port 3000')
})