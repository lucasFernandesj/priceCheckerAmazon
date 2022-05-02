const { json } = require("body-parser");

function fetch(){
   fetch('../fetchedData.json')
.then((data)=>JSON.parse(data))
.then((appendToDom(data))) 
}


function appendToDom(data){
    data.forEach((element)=>{
        let div = document.createElement('div')
        div.innerText = element.product_name
        document.body.appendChild(div)
    })
}

window.document.onload = fetch