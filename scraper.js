const fetch = require('node-fetch');
const puppeteer = require('puppeteer')
const nodemailer = require('nodemailer')

let priceNowNumber;

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
            
              let browser = await puppeteer.launch({ headless:true })
        let page = await browser.newPage()
        await page.setDefaultNavigationTimeout(0);
        await page.goto(data[i].product_url)
        let element = await page.waitForSelector('.apexPriceToPay')
        let priceNowStr = await element.evaluate(el => el.textContent);
        let priceNowStrArr=priceNowStr.split('$')
         priceNowNumber = Number(priceNowStrArr[1])

        
        // console.log(priceInt < data[i].product_price)
        if( data[i].product_price > priceNowNumber ){
            console.log('entered if , going to the send email function')
            sendEmail(data[i])
        }
        await browser.close();
        }
      
     
}


function sendEmail(element){
    console.log('inside email function')
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
    const emailSubject = `The ${element.product_name} that you wanted is available for ${priceNowNumber}$ `
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
            console.log('****-ERROR IN EMAIL FUNCTION*****')
            console.log(error)
            return
        }
        console.log('*****Success***** ' + info.response)
    })

}




 module.exports = fetchAPI

//cron jobs should evoque fetchAPI() every few hours..