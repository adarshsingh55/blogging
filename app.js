const express = require("express")
const app = express()
const mongoose = require("mongoose")
const articles = require('./models/article')
const articaleRouter = require("./routes/artical")// importing the router moudule 
const methodOverride =require("method-override")// to over rite method pf forms
const createDompurify = require("dompurify")
const {JSDOM } = require("jsdom")
const dompurify = createDompurify(new JSDOM().window)


const path = require('path')
const fs =require("fs")
const port = process.env.PORT || 80;

main().catch(err => console.log(err));
async function main() {
  await mongoose.connect('mongodb+srv://vaibhav:a12345d@vaibhav.kbcq1.mongodb.net/blog?retryWrites=true&w=majority');
}

app.use(express.urlencoded({extended :false}))
// useing the rourer // inartical the /start with /articals 
// express related stuff-------------------
app.use('/static' , express.static('static'))// seting static foder as static file
app.use(methodOverride('_method'))




// ejs related stuff------------------
app.set('view engine','ejs')// use  ejs as templet engin
app.set('views' , path.join(__dirname ,'views'))//giving the path of view



// end point-----------------------------

app.get("/" , async (req , res)=>{
  var artical = await articles.find().sort({date :'desc'})
    res.status(200).render("articles/index" , {articles: artical ,text :'hellow'})
  })
  
  
  app.use('/articles' , articaleRouter) 
  // start the server----------------------------
app.listen(port , ()=>{
    console.log(`this app;octipn start at port ${port}`);
})

