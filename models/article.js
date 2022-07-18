const mongoose =require("mongoose")
const marked = require("marked")
// import { marked } from "marked"
const slugify =require("slugify")// to make slug out of title
const createDomPurify = require("dompurify")
const { JSDOM } = require("jsdom")
const dompurify = createDomPurify(new JSDOM().window)

const aritcleSchema = new mongoose.Schema({
title :{
    type:String ,
    required :true
},
description :{
type : String
},
date :{
    type : Date,
    default : Date.now
},
markdown:{
    type:String ,
    required :true
},
slug :{
    type:String,
    required:true ,
    // unique:true
},
sanitizedHtml :{
    type:String,
    required:true 
}
})
aritcleSchema.pre('validate' , function (next) {
    if (this.title) {
        this.slug = slugify(this.title ,{ lower:true ,strict :true})
    }
    if (this.markdown){
        this.sanitizedHtml = dompurify.sanitize(marked.parse(this.markdown))
    }
    next()
})

module.exports = mongoose.model('articles' ,aritcleSchema)