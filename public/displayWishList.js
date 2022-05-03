let newPrice;
let arr =[]

fetch('http://localhost:3000/api')
.then(response => response.json())
.then((data)=>appendToDom(data))

function addInput(e){
    let id =e.path[0].id
    let input = document.createElement('input')
    console.log(id)
    document.getElementsByClassName(`${id}`)[0].append(input)
}

function appendToDom(data){
 data.forEach((element)=>{
     let div = document.createElement('div')
     div.setAttribute('class' , `${element.product_id}`)
     let h2 =document.createElement('h2')
     h2.innerText = element.product_name
    let p = document.createElement('p')
    p.innerText = `Maximum price you are willing to pay:${element.product_price}$`
    let changePriceBtn = document.createElement('button')
    changePriceBtn.setAttribute('id' , `${element.product_id}`)
    changePriceBtn.innerText = 'Change price'
    changePriceBtn.addEventListener('click' , addInput)
    let a = document.createElement('a')
    a.append(changePriceBtn)
    
    
    let deleteBtn = document.createElement('button')
    
    deleteBtn.innerText = 'Remove item '


     div.append(h2 , p , a , deleteBtn)
     arr.push(div)
     console.log(arr)
     document.querySelector('.container').appendChild(div)
 })
}