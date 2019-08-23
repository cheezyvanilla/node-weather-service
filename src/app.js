const express = require('express')
const path = require('path')
const hbs = require('hbs')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

const app = express()

const port = process.env.PORT || 3000

//define paths for express engine
const publicDir = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//setup handlebars engine
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)
//setup static directory to serve
app.use(express.static(publicDir))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        body: 'Use this website to get your forecast',
        name: 'Ziath'
    })
})

app.get('/help', (req, res) =>{
    res.render('help', {
        title: 'Help Page',
        msg:'what are you looking for?',
        name: 'Ziath'
    })
})

app.get('/about', (req, res) => {
    res.render('about',{
        title: 'About Me',
        name: 'Ziath'
    })
})

app.get('/weather', (req,res) =>{
    if(!req.query.address){
        return res.send({
            error: 'you must provide an address term'
        })
    
    } else{
        geocode(req.query.address,(error, geoData) => {
        if (error) {
            return res.send({error}) }
        
        forecast(geoData.latitude,geoData.longitude,(error, forecastData) => {
            if (error) {
                return res.send({error})
            }
            res.send({
                location: geoData.location,
                address: req.query.address,
                forecast: forecastData
            })
        })
    })
    
    }
    
})

app.get('/help/*', (req, res) => {
    res.render('404',{
        name: 'Ziath',
        msg: 'help article not found',
        title: '404'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        name: 'Ziath',
        msg: 'page not found',
        title: '404'
    })
})


app.listen(port, () =>{
    console.log('Server is up listening to port'+ port)
})