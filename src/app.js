const express = require('express')

const app = express()

app.get('', (req, res) =>{
    res.send('Hello express!')
})

app.get('/help', (req, res) => {
    res.send('Help Page')
})

app.get('/about', (req, res) =>{
    res.send('About Page')
})

app.get('/weather', (req, res) => {
    res.send('This is the Weather')
})

app.listen(3000, () => {
    console.log('server started on port 3000')
})