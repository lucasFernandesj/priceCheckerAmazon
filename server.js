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
const {getAllProducts , insertToDataBase} = require('./modules/databaseConnection')




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
    // db
    // .select().from('wishlist')
    // .then((data)=>{
    //     res.json(data)
    // })
    // .catch(err=>console.log(err))

    getAllProducts()
    .then((data)=>{
      res.json(data)
  })
  .catch(err=>console.log(err))
   
})

//route to update
app.get('/updated/:product_id' , (req , res)=>{

})





//POST request , insert to database
app.post('/posted' , (req , res)=>{
    // db('wishlist')
    // .insert({ product_name: req.body.productName, product_price: Number(req.body.productPrice), product_url: req.body.productURL })
    // .then(wishlist =>
    //     console.log(wishlist)
    //     )

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













app.listen(process.env.PORT, ()=>console.log(`hackathon2 on ${process.env.PORT}`))