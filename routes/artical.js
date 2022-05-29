const express = require("express")
const articles = require("../models/article")
const router = express.Router()
router.use('../static' , express.static('static'))
router.get('favicon.ico' ,(req ,res)=>{
    res.status(204).end()
})

router.get('/new', (req ,res ) =>{
res.render('articles/new' ,{ article : new articles() })
})

router.get('/edit/:id', async (req ,res ) =>{
let article =await articles.findById(req.params.id)
res.render('articles/new' ,{ article : article })
})
router.get('/show', (req ,res ) =>{
res.render('/articles/new' ,{ article : new articles() })
})
router.get('/:slug', async (req ,res ) =>{
let article = await articles.findOne({ slug : req.params.slug})
if (article == null) {
    res.render('/')
}else{
res.render('articles/show', {article : article})
// res.send(article.params.id)
}
})  


router.post('/', async (req ,res,next ) =>{
   req.article = new articles()
   next()
}, saveArticleAndRedirect('new'))

router.delete('/:id' ,async (req ,res)=>{
    await articles.findByIdAndDelete(req.params.id)
    res.redirect("/")
})
router.put('/:id', async (req ,res,next ) =>{
    req.article = await articles.findById(req.params.id)
    next()
 }, saveArticleAndRedirect('edit'))
function saveArticleAndRedirect(path) {
   return async (req ,res)=>{
        let article = req.article
            article.title = req.body.title
            article.description = req.body.description
            article.markdown = req.body.markdown
            try {
               article = await article.save()
               console.log(article.id);
               res.redirect(`/articles/${article.slug}`)
            } catch (e) {
                console.log(e);
                res.render(`articles/${path}`,{article : article})
            } 
    }
}
module.exports =router   