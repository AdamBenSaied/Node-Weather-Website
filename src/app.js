const path = require('path')
const express = require('express')
const app = express()
const PORT = process.env.PORT || 3001;

//paths
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

const hbs = require('hbs')
const res = require("express/lib/response");
const req = require("express/lib/request");

//hbs engine and views and shit
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirectoryPath))

// require variables and shit
const forecast = require('./utils/forecast')
const geocode= require('./utils/geocode')


app.get('', (req, res) => {

    res.render('index', {
        title: 'weather',
        name: 'Adam'
    })
})

app.get('/about', (req, res) => {

    res.render('about', {
        title: 'About',
        name: 'Adam'
    })
})


app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'address is required'
        })
    }
        geocode(req.query.address, (error, {longitude,latitude,location}={}) => {
            if (error) {
                return res.send({
                    error: 'geocode error' + error
                })
            }
            forecast(longitude, latitude, (error, forecastData) => {
                if (error) {
                    return console.log(' Forecast Error', error)
                }
                res.send({
                    forecast: forecastData,
                    location,
                    address: req.query.address
                })
            })

        })


})


app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        message: 'This is a message',
        name: 'Adam'
    })

})


app.get('/help/*', (req, res) => {

    res.render('404', {
        message: 'Help article not found',
        name: 'Adam'

    })
})

app.get('*', (req, res) => {

    res.render('404', {
        message: 'Page not found',
        name: 'Adam'
    })
})

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})
