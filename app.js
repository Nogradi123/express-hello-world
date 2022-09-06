
const express = require('express');
const app = express ();
const PORT = 3000;
const axios = require('axios');
// variables and declarations always at the top of the file 


// middleware always comes between declarations and routes 
// ============ MIDDLEWARE ==========

app.use(express.static('public'));      
// app.use(express.static('views'));
app.set("views", __dirname + "/views");
app.set("view engine", "hbs");

// ==================================

//routes are the 2nd to last element in your app.js
// ================== ROUTES ====================

app.get('/', (request, response, next) => {
    // this is how you display a file without hbs as a view engine
    // response.sendFile(__dirname + '/views/index.html')

        const pageName = 'Home Screen';
        const displayArray = ['Hats', 'Dogs', 'Reptiles', 'Phones', 'Cars'];

        const data = {
            pageName,
            content: displayArray,
            showContent: displayArray.length > 5
        }
    // this is how you render a file having a view engine like 'hbs'
    // have to render it in an object
    // response.render('index', {pageName, content: displayArray});
    response.render('index', data);

    // when your express side is an api only, then you just have to res.json the information
    // response.json({pageName, content: displayArray})

});

app.get('/about', (request, response, next) => {
    // response.sendFile(__dirname + '/views/about.html')
    axios.get('https://pokeapi.co/api/v2/pokemon').then(apiRes => {
        console.log({apiRes: apiRes.data.results})

        const data = {
            content: apiRes.data.results
        }
        response.render('about', data);
    }).catch(err => {
        console.log({err})
        next();
    })
    // response.render('about');
});

app.get('/contact', (request, response, next) => {
    // response.sendFile(__dirname + '/views/contact.html')
    response.render('contact');
});

// ================================================

app.listen(PORT || 3000, () => console.log(`My first app listening on port ${PORT}! `))