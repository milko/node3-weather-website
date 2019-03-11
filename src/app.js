const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const templatesPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup Handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', templatesPath)
hbs.registerPartials(partialsPath)

// Setup static html pages directory
app.use(express.static(publicDirectoryPath))

app.get('', (request, response) => {
    response.render('index', {
        title: "Weather",
        name: "Milko Škofič"
    })
})

app.get('/help', (request, response) => {
    response.render('help', {
        title: "Help",
        message: "This is a help message",
        name: "Milko Škofič"
    })
})

app.get('/about', (request, response) => {
    response.render('about', {
        title: "About",
        name: "Milko Škofič"
    })
})

app.get('/weather', (request, response) => {
    if(! request.query.address) {
        return response.send({
            error: "Missing address."
        })
    }

    geocode(request.query.address, (error, { location, latitude, longitude } = {}) => {
        if(error) {
            return response.send({ error })
        }
    
        forecast(latitude, longitude, (error, forecastData) => {
            if(error) {
                return response.send({ error })
            }

            response.send({
                location,
                forecast: forecastData,
                address: request.query.address
            })
        })
    })
})

app.get('/products', (request, response) => {
    if(! request.query.search) {
        return response.send({
            error: "You must provide a search term."
        })
    }

    console.log(request.query)
    response.send({
        products: []
    })
})

app.get('/help/*', (request, response) => {
    response.render('404', {
        title: "Help",
        message: "The help article was not found.",
        name: "Milko Škofič"
    })
})

app.get('*', (request, response) => {
    response.render('404', {
        title: "404",
        message: "Page not found.",
        name: "Milko Škofič"
    })
})

app.listen(port, () => {
    console.log(`Server is up on port ${port}.`)
})
