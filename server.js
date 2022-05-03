const express = require('express');
const app = express()
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'));
app.set('view engine', 'ejs');
const fetch = require('node-fetch');
const scrapeData = require('./puppeteer')
let db = require('knex')({
    client: 'pg',
    version: '7.2',
    connection: {
      host : '127.0.0.1',
      user : 'hackathon',
      password : '1234',
      database : 'hackathon2'
    }
  });




//Read from dataBase and create the API
app.get('/api' , (req , res)=>{
    db
    .select().from('wishlist')
    .then((data)=>{
        res.json(data)
    })
    .catch(err=>console.log(err))
   
})



//POST request , insert to database
app.post('/posted' , (req , res)=>{
    db('wishlist')
    .insert({ product_name: req.body.productName, product_price: Number(req.body.productPrice), product_url: req.body.productURL })
    .then(wishlist =>
        console.log(wishlist)
        )
        
        res.render(__dirname + '/views/posted.ejs' , { params: req.body })

})




console.log(scrapeData)






//testing changes







app.listen(3000, ()=>console.log('hackathon2 on 3000'))