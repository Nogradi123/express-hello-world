const express = require('express');
const app = express ();
const PORT = 3000;
// variables and declarations always at the top of the file 


// middleware always comes between declarations and routes 
// ============ MIDDLEWARE ==========
app.use(express.static('public'));
app.use(express.static('views'));

//routes are the 2nd to last element in your app.js
// ================== ROUTES ====================

app.get('/', (request, response, next) => {
    response.sendFile(__dirname + '/views/index.html')
  
});

app.get('/about', (request, response, next) => {
    response.sendFile(__dirname + '/views/about.html')
    
});

app.get('/contact', (request, response, next) => {
    response.sendFile(__dirname + '/views/contact.html')
    
});

// ================================================

app.listen(PORT || 3000, () => console.log(`My first app listening on port ${PORT}! `))