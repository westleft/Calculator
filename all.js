const calculator = document.querySelector('.calculator'); //整台計算機
const btn = document.querySelectorAll('button'); 

let display = document.querySelector('.display')
let displayResult = '';


btn.forEach(function(item){
    item.addEventListener('click',function(e){
        displayResult += e.target.innerText
        display.textContent = displayResult
        console.log(item.textContent);
    })
})


document.querySelector('.ac').addEventListener('click',(e)=>{
    display.textContent = '0'
})


document.querySelector('.delete').addEventListener('click',(e)=>{
    let arr = displayResult.split('')
    arr.pop()
    displayResult = arr.join('');
    console.log(arr);
})