const express = require('express');
const path = require('path');
const hbs = require('hbs');
const geocode = require('./utils/geocode.js');
const forecast = require('./utils/forecast.js');


// console.log(__dirname);
// console.log(path.join(__dirname, '../public'));

const app = express();
const port =  process.env.PORT || 3000; // first value is for heroku; if doesn't exist, use port 3000

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('view engine','hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('index', { // first arg is the view(hbs) file name, second arg is the object send to the page
        title: 'Weather',
        name: 'Chester Sim'
    });
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: "Chester Sim"
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: "Chester Sim"
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            errorMessage: 'No address was provided in the search term'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location}= {}) => {
        if(error){
            return res.send({
                errorMessage: error
            })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if(error){
                return res.send({
                    errorMessage: error
                })
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        });
        
    });

    // res.send({
    //     forecast: 'It is sunny',
    //     address: req.query.address
    // }); 
})

app.get('/products', (req, res) => {
    if(!req.query.search){
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query.search);
    res.send({
        products: []
    });
})

app.get("/help/*", (req, res) => {
    res.render('404', {
        title: '404',
        name: "Chester Sim",
        errorMessage: 'Help article not found'
    })
})

app.get('*', (req, res) => { // * is a wildcard, needs to be the last app.get request
    res.render('404', {
        title: '404',
        name: "Chester Sim",
        errorMessage: 'Page not found'
    })
})

app.listen(port, () => { // .listen starts up the app server
    console.log('Server is up on port ' + port);
}); 

// app.listen(3000, () => { // .listen starts up the app server
//     console.log('Server is up on port 3000.');
// }); 

// app.get('', (req, res) => {   // will not be run anymore since statement in line 12 will overwrite with index.html page
//     res.send('<h1>Weather<h1>');
// })

// app.get('/help', (req, res) => {
//     res.send([{
//         name: 'Chester'
//     }, { 
//         age: 22
//     }]);
// })


