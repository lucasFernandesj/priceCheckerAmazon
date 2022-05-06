document.querySelector('.about').addEventListener('mouseover' ,()=>{
    document.querySelector('.aboutTxt').classList.remove('hidden')
})


document.querySelector('.about').addEventListener('mouseout' , ()=>{
    document.querySelector('.aboutTxt').classList.add('hidden')
})

