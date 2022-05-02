fetch('http://localhost:3000/api')
.then(response => response.json())
.then((data)=>appendToDom(data))



function appendToDom(data){
 data.forEach((element)=>{
     let div = document.createElement('div')
     div.innerText = element.product_name
     document.querySelector('.container').appendChild(div)
 })
}