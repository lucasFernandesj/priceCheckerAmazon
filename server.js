const express = require('express');
const app = express()
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'));
app.set('view engine', 'ejs');
const fetch = require('node-fetch');
const fetchAPI = require('./scraper')
var cron = require('node-cron');
const nodemailer = require('nodemailer')
const dotenv = require('dotenv')
dotenv.config()
const {getProduct , getAllProducts , insertToDataBase, updateProduct , deleteProduct} = require('./modules/databaseConnection')




// let db = require('knex')({
//     client: 'pg',
//     version: '7.2',
//     connection: {
//       host : '127.0.0.1',
//       user : 'hackathon',
//       password : '1234',
//       database : 'hackathon2'
//     }
//   });




//Read from dataBase and create the API
app.get('/api' , (req , res)=>{
    getAllProducts()
    .then((data)=>{
      res.json(data)
  })
  .catch(err=>console.log(err))
   
})

//route to update
app.get('/api/:id/:priceToUpdate' , (req , res)=>{
    
    console.log('id: '+req.params.id)
    console.log('priceToUpdate: '+req.params.priceToUpdate)
    let id = Number(req.params.id)
    let priceToUpdate = Number(req.params.priceToUpdate)
    updateProduct(id , priceToUpdate)
    .then(data=>{
      res.json(data)
    })
    .catch(err => {
      console.log(err);
      res.json({message:err.message})
    })
})


//DELETE product
app.delete('/api/product/:id',(req,res)=>{
  deleteProduct(req.params.id)
  .then(data=>{
    res.json(data);
  })
  .catch(err => {
    console.log(err);
    res.json({message:err.message})
  })
});


//POST request , insert to database
app.post('/posted' , (req , res)=>{
  insertToDataBase()
  .insert({ product_name: req.body.productName, product_price: Number(req.body.productPrice), product_url: req.body.productURL })
  .then(wishlist =>
    console.log(wishlist)
    )
    .catch(err=>console.log(err))
        
        res.render(__dirname + '/views/posted.ejs' , { params: req.body })

})

//* 14 * * * Evoque function every minute past 14:00 , every day
//Evoque the fetchAPI function every day at 15:00
// cron.schedule('* 15 * * *', () => {
//   fetchAPI()
//   console.log('running a task every minute');
// });



//READ get one product
app.get('/api/:id',(req,res) => {
  getProduct(req.params.id)
  .then(product=>{
    res.json(product);
  })
  .catch(err => {
    console.log(err);
    res.json({message:err.message})
  })
});









app.listen(process.env.PORT, ()=>console.log(`hackathon2 on ${process.env.PORT}`))