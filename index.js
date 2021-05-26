const express = require('express');
const app = express();
const posts = require('./posts.json')
const fs = require('fs')

app.use(express.json())
app.use(express.urlencoded())


app.get('/posts', (req,res) =>{
    return res.json(posts)
})

app.post('/posts', (req,res) =>{
    console.log(req.body.newPost)

    posts.push(req.body.newPost);
    let stringedData = JSON.stringify(posts, null,2)
    fs.writeFile('posts.json', stringedData , function(err){
        if(err){
            return res.status(500).json({ message: err})
        }
    })
    return res.status(200).json({message: " new posts created"})
})

app.get("/posts/:id" , (req,res) =>{
    let id = req.params.id;
   let foundPost = posts.find(post =>{
        return String(post.id) === id
    })
    if(foundPost){
        return res.status(200).json({ post : foundPost})
    }else{
        res.status(404).json({ message: "post not found"})
    }
    
})

app.put("/posts/:id" , (req,res) =>{
    let id = req.params.id;
    let foundPost = posts.find(post =>{
        return String(post.id) === id
    })
    // { title: "title", body: "body"}
    let updatedPost = req.body.updatedPost
    console.log(updatedPost.title)
    console.log(updatedPost.body)

    foundPost.title = updatedPost.title;
    foundPost.body = updatedPost.body;

    for(let i = 0; i < posts.length; i++){
        let currentPost = posts[i];
        if(currentPost.id == id){
            posts[i] = foundPost
        }
    }    
    let stringedData = JSON.stringify(posts, null,2)
    fs.writeFile('posts.json', stringedData , function(err){
        if(err){
            return res.status(500).json({ message: err})
        }
    })
    return res.status(200).json({message: " Post updated"})
})

app.listen(3000, function(){
    console.log(`server is up and running`)
})