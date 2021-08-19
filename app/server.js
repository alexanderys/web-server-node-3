// The routes from the previous two labs are combined to a single web server here.

const express = require("express");
const app = express();

let state = 1;

// Home page
app.get('/', (req, res) => {
    res.send('Welcome to this web server!')
})

// Route 1
app.get('/random', (req, res) => {
    const tal = Math.floor(Math.random() * 1023) + 1;
    res.send({ number: tal });
})

// Route 2
app.get('/custom_random/:num', (req, res) => {
    const { num } = req.params;
    const tal = Math.floor(Math.random() * parseInt(num)) + 1;
    res.send({ number: tal });
})

// Route 3
app.get('/show_value', (req, res) => {
    res.send(`<p>Current value of state: ${state}<p>`);
})

// Route 4
app.get('/increase_value', (req, res) => {
    state++;
    res.send(`<p>State increased by 1<p>`);
})

// Route for invalid paths
app.get('*', (req, res) => {
    res.send('Invalid path');
})

// Runs the server
app.listen(3000, () => {
    console.log('Listening on port 3000');
})