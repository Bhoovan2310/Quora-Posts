const express = require("express");
const app = express();
const port = 8080;

const path = require("path");
const { v4: uuidv4 } = require('uuid');
const methodOverride = require('method-override');

app.use(express.urlencoded({extended : true}));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride('_method'));



// array of post
let posts = [
    {
        id : uuidv4(),
        username : "Anshu Pathak",
        content : "I m learning REACT"
    },
    {
        id : uuidv4(),
        username : "Sharad Pal",
        content : "Hard work is important to achieve success"
    },
    {
        id : uuidv4(),
        username : "Uday Narayan",
        content : "I m NOOB"
    },
];

app.get('/posts', (req, res) => {
    res.render("index.ejs", { posts });
})

app.get('/posts/new', (req, res) => {
    res.render("new.ejs");
})

app.post('/posts', (req, res) => {
    // console.log(req.body);
    let { username, content} = req.body;
    let id = uuidv4();
    posts.push({id , username, content});
    console.log(`${username} created a new post.`);
    res.redirect('/posts');
})

app.get('/posts/:id', (req, res) => {
    let {id} = req.params;
    let post = posts.find((p) => id === p.id);
    // console.log(post);
    res.render("show.ejs", {post});
})

app.patch('/posts/:id', (req, res) => {
    let {id} = req.params;
    let newContent = req.body.content;
    let post = posts.find((p) => id === p.id);
    post.content = newContent;
    console.log(`${post.username}'s post edited`);
    res.redirect('/posts');
})

app.get('/posts/:id/edit', (req, res) => {
    let {id} = req.params;
    let post = posts.find((p) => id === p.id);
    res.render("edit.ejs", { post });
})

app.delete('/posts/:id', (req, res) => {
    let {id} = req.params;
    posts = posts.filter((p) => id != p.id);
    console.log("post deleted");
    res.redirect('/posts');
} )


app.listen(port, () => {
    console.log(`listening to port : ${port}`)
})

