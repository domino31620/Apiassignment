const express = require('express');
const app = express();
const users = require('./users.json')
const fs = require('fs')

app.use(express.json())
app.use(express.urlencoded())
app.get('/',function(req,res){
    res.send('hello world')
})

app.post('/', function(req,res){
    res.send(' This is a post request')
})

app.get('/users', (req,res) =>{
    return res.json([users])
})

app.post('/users', (req,res) =>{
    console.log(req.body.newUser)

    users.push(req.body.newUser);
    let stringedData = JSON.stringify(users, null,2)
    fs.writeFile('users.json', stringedData , function(err){
        if(err){
            return res.status(500).json({ message: err})
        }
    })
    return res.status(200).json({message: " new users created"})
})

// app.get("/users:id" , (req,res) =>{
//     console.log(req.params.id)
// })

app.listen(3000, function(){
    console.log(`server is up and running`)
})