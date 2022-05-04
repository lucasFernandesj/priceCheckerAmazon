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

  const updateProduct=(id,priceToUpdate)=>{
    return db('wishlist')
    .where('product_id' , `${id}`)
    .update({
        product_price:`${priceToUpdate}`
    })
  }
  

//delete
const deleteProduct = (id) => {
    return db('wishlist')
    .del()
    .where({product_id:id})
    .returning('*')
  }

  module.exports={
    getAllProducts,
    insertToDataBase,
    updateProduct,
    deleteProduct
  }
