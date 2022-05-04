const knex = require('knex');
const dotenv = require('dotenv');
dotenv.config()



let db = require('knex')({
    client:  process.env.DB_CLIENT,
    version: process.env.DB_version,
    connection: {
      host : process.env.DB_HOST ,
      user : process.env.DB_USER,
      password : process.env.DB_PASSWORD,
      database : process.env.DB_DATABASE
    }
  });


  const  getAllProducts =()=>{
    return db('wishlist')
    .select().from('wishlist')
  }

  const insertToDataBase =()=>{
   return db('wishlist')
   
    
  }
  



  module.exports={
    getAllProducts,
    insertToDataBase
  }
