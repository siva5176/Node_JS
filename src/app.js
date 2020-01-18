const path = require('path')
const express = require('express')
const hbs = require('hbs');
const locationapi = require('../utils/geolocations');
const weather = require('../utils/weather');
const app = express()
const publicDirectoryPath = path.join(__dirname, '../public')
const viewaPath = path.join(__dirname, '../templates/views');
const hbsPartialsPath = path.join(__dirname, '../templates/partials');

 app.set('view engine', 'hbs');
 app.set('views', viewaPath);
app.use(express.static(publicDirectoryPath));
hbs.registerPartials(hbsPartialsPath);

app.get('', (req, res) => {
   // res.send('about.html');
    res.render('index', {
        title: 'Weather',
        name: 'Shiva'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Shiva'
    })
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        name: 'Shiva kumar'
    })
})
app.get('/help/*', (req, res) => {
    res.render('error404', {
        name:'shiva',
        title: 'Help Page not found'
    });
})

app.get('/products', (req, res) => {
    console.log(req.query);
    res.send({
        product:'products'
    });
});
app.get('/weather', (req, resp) => {
    if (!req.query.address) {
        res.send({error:'Address must be provided'});
    } else {
         locationapi(req.query.address, (error, res) => {
            if (error) {
                resp.send({error: 'Address not found'})
            } else {
                weather(res.longitude, res.latitude, (error, response={}) => {
                    if (error) {
                        resp.send({error: 'Location not found'})
                    } else {
                        resp.send({ 
                            forecast: response.message,
                            location: res.place_name,

                        });
                    }
                })
            }
        })
        // res.send({address: 'address you provided is '+ req.query.address});
    }
})

app.get('*', (req, res) => {
    res.render('error404', {
        name:'shiva',
        title: '404'
    });
})

// app.get('/help', (req, res) => {
//     res.render('help', {
//         helpText: 'This is some helpful text.'
//     })
// })

// app.get('/weather', (req, res) => {
//     res.send({
//         forecast: 'It is snowing',
//         location: 'Philadelphia'
//     })
// })

app.listen(4200, () => {
    console.log('Server is up on port 3000.')
})