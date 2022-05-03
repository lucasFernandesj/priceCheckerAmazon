const fetch = require('node-fetch');
const puppeteer = require('puppeteer')

let productPriceNow;

function fetchAPI(){
    fetch('http://localhost:3000/api')
    .then((res)=>res.json())
    .then((data)=>scrapeData(data))
    
    
}


async function scrapeData(data){
    if(data.lenght === 0){
        return
    }
    console.log('inside the scrape function')
        for(let i = 0 ; i <data.length; i++ ){
              let browser = await puppeteer.launch({ headless:false })
        let page = await browser.newPage()
        await page.goto(data[i].product_url)
        let element = await page.waitForSelector('.apexPriceToPay')
        let priceNow = await element.evaluate(el => el.textContent);
        let priceInt = Number(priceNow)
        productPriceNow = priceNow
        if(priceInt <= data[i].product_price){
            sendEmail(data[i])
        }
        }
      
     
}


function sendEmail(element){
var today = new Date();
var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
var dateTime = date+' '+time;

    const transporter = nodemailer.createTransport({
        host: "smtp-mail.outlook.com",
        auth: {
            user: 'fernandesLucasLab@outlook.com',
            pass: 'Mysecurepassword',
        },
    })
    const emailSubject = `The ${element.product_name} that you wanted is available for ${productPriceNow}$ `
    const emailBody = `Hello user, the ${element.product_name} that you were 
    interested in is costing less than ${element.product_price}$ at ${dateTime}.
    Go to :
    ${element.product_url}
    to buy it
    `
    
    const options = {
        from: 'fernandesLucasLab@outlook.com',
        to: 'fernandes.lucas.jo@gmail.com',
        subject: emailSubject,
        text: emailBody
    }
    
    transporter.sendMail(options, function (error, info) {
        if (error) {
            console.log(error)
            return
        }
        console.log('Success ' + info.response)
    })

}




 module.exports = fetchAPI

//cron jobs should evoque fetchAPI() every few hours..