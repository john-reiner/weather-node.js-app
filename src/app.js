const express = require('express')
const path = require('path')

const app = express()

const publicDirectoryPath = path.join(__dirname, '../public')

app.use(express.static(publicDirectoryPath))

app.get('/weather', (req, res) => {
    res.send({
        forcast: 'Sunny',
        location: 'Keyport NJ'
    })
})

app.listen(3000, () => {
    console.log('server started on port 3000')
})