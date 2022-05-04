let newPrice;
let arr =[]

fetch('http://localhost:3000/api')
.then(response => response.json())
.then((data)=>appendToDom(data))

function addUpdateform(e){
    // console.log(e)
    if(document.getElementById(`updateForm${e.path[0].id}`) !==null){
       return
    }
    let id =e.path[0].id
    //creating form
    let formDiv = document.createElement('div')
    // form.setAttribute('action' , '/updated')
    // formDiv.setAttribute('method' , 'get')
    formDiv.setAttribute('class' , 'form-update')
    formDiv.setAttribute('id' , `updateForm${e.path[0].id}`)
    //creating input
    let input = document.createElement('input')
    input.setAttribute('type' , 'number')
    input.setAttribute('name' , 'updatedPrice')
    input.setAttribute('placeholder' , 'Enter new desired price')
    input.setAttribute('class' , `input-update-price-${e.path[0].id}`)
    input.setAttribute('data' , `input-update-price-${e.path[0].id}`)
    input.setAttribute('name' , 'priceToUpdate')
    //creating input submit
    let inputSubmit = document.createElement('button')
    // inputSubmit.setAttribute('type' , 'submit')
    inputSubmit.innerText = 'Update desired price'
    // inputSubmit.setAttribute('value' , 'Update desired price')
    inputSubmit.addEventListener('click', updatePrice)
    formDiv.append(input , inputSubmit)
    document.getElementsByClassName(`${id}`)[0].append(formDiv)
}



function appendToDom(data){
 data.forEach((element)=>{
     let div = document.createElement('div')
     div.setAttribute('class' , `${element.product_id}`)
     let h2 =document.createElement('h2')
     h2.innerText = element.product_name
    let p = document.createElement('p')
    p.innerText = `Maximum price you are willing to pay:${element.product_price}$`
    let updatePriceBtn = document.createElement('button')
    updatePriceBtn.setAttribute('id' , `${element.product_id}`)
    updatePriceBtn.innerText = 'Change price'
    updatePriceBtn.addEventListener('click' , addUpdateform)
    let a = document.createElement('a')
    a.append(updatePriceBtn)
    
    
    let deleteBtn = document.createElement('button')
    deleteBtn.setAttribute('data' , `remove-${element.product_id}`)
    deleteBtn.innerText = 'Remove item '
    deleteBtn.addEventListener('click' , deletep)

     div.append(h2 , p , a , deleteBtn)
     arr.push(div)
     
     document.querySelector('.container').appendChild(div)
 })
}


let priceToUpdate;
function updatePrice(){
    priceToUpdate = this.previousElementSibling.value //new price
    let thisData = this.previousElementSibling.getAttribute('data')
    let thisDataArr = thisData.split('-')
    let id = thisDataArr[thisDataArr.length-1]   // product id on database
    fetch(`http://localhost:3000/api/${id}/${priceToUpdate}` ,{
        method:'PUT'
    })
    .then((res)=>res.json())
    .then((product)=>console.log(product))
    .catch((err)=>console.log(err))
    
}

function deletep(){
   let id = this.getAttribute('data').split('-')[1]
    fetch(`http://localhost:3000/api/product/${id}`,{
      method:'DELETE'
    })
    .then(res => res.json())
    .then(product=>{
      console.log(product);
      alert('delete ')
    })
    .catch(err=>{
      console.log(err);
    })
  }
