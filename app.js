const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded());

app.get('/', (req, res)=>{
    fs.readFile('username.text', (err, data)=>{
        if(err)
        {
            console.log(err);
            data = 'No chat exists'
        }

        res.send(
            `${data}<form action = '/' method = 'POST' onsubmit = 'document.getElementById('username').value'>
            <input type = 'text' name = 'message' id = 'message' placeholder = 'message'>
            <input type = 'hidden' name = 'username' id = 'username'>
            <br>
            <button type = 'submit'>send</button>
            </form>`
        )
    })
    
})
app.post('/', (req, res) => {
    console.log(req.body.username);
    console.log(req.body.message);
    fs.writeFile('username.text', `${req.body.username}: ${req.body.message}`,{flag: 'a'}, (err ) =>
        err ? console.log(err): res.redirect('/')
    );
})

app.get('/login', (req, res) => {
    res.send(
        `<form action = "/login" method = "POST" onsubmit = "localStorage.setItem('username', document.getElementById('username').value)">
        <input type = 'text' name = 'username' id = 'username' placeholder = 'username'>
        <br>
        <button type = 'submit'>send</button>
        </form>`
    )
})
app.post('/login', (req, res) => {
    console.log(req.body.username);
    fs.writeFile('username.text', `${req.body.username}`,{flag: 'a'}, (err ) =>
        err ? console.log(err): res.redirect('/')
    );
    
})
app.listen(3000)

