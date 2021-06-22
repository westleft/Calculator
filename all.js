const calculator = document.querySelector('.calculator'); //整台計算機

const num = document.querySelectorAll('.num')
const operator = document.querySelectorAll('.operator')

let display = document.querySelector('.display')
let displayResult = '' //所有的數字(計算用)

let displayOperator = document.querySelector('.displayOperator')//顯示用(上方)

num.forEach(function(item){
    item.addEventListener('click',function(e){
        displayResult += e.target.textContent
        if(display.textContent == 0){
            display.textContent = ''
            display.textContent += e.target.textContent
        }else{
            display.textContent += e.target.textContent
        }   
        console.log(displayResult);
    })
})

operator.forEach(function(item){
    item.addEventListener('click',function(e){
        displayResult += e.target.innerText   
        display.textContent = '0'
        displayOperator.textContent = displayResult
        console.log(displayOperator.textContent);
    })
})


document.querySelector('.ac').addEventListener('click',()=>{
    displayResult = '';
    display.textContent = '0'
    displayOperator.textContent = '0'
})

document.querySelector('.delete').addEventListener('click',(e)=>{
    let arr = displayResult.split('')
    arr.pop()
    displayResult = arr.join('');
    display.textContent = displayResult
})

document.querySelector('.equal').addEventListener('click',()=>{
    let Result = displayResult.replace('×','*').replace('÷','/')
    Result = eval(Result)

    display.textContent = Result
    displayOperator.textContent = displayResult
})