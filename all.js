const num = document.querySelectorAll('.num')
const operator = document.querySelectorAll('.operator')

let display = document.querySelector('.display')
let displayResult = '' //所有的數字(計算用)

let displayOperator = document.querySelector('.displayOperator')//顯示用(上方)

// 數字
num.forEach(function (item) {
    item.addEventListener('click', function (e) {

        if(e.target.textContent === '0' && display.textContent === '0'){
            console.log('sdsd');
            return
        }

        if (display.textContent === '0') {
            display.textContent = ''
            display.textContent += e.target.textContent
        } else {
            display.textContent += e.target.textContent
        }

        if (display.textContent === '0.') {
            display.textContent += e.target.textContent
        }

        //防止數字前面出現00
        if (e.target.textContent === '00') {
            console.log(displayResult);
            if (display.textContent === '00') {
                display.textContent = '0'
                return
            }
        }

        displayResult += e.target.textContent
        checkDisplayLength()
    })
})

// 運算符號
operator.forEach(function (item) {
    item.addEventListener('click', function (e) {
        //避免運算符號重複
        let lastNum = displayResult[displayResult.length - 1];
        if (lastNum == '+' || lastNum == '-' || lastNum == '×' || lastNum == '÷') {
            let arr = displayResult.split('')
            arr.pop()
            arr.push(e.target.textContent)
            displayResult = arr.join('')
            displayOperator.textContent = displayResult
            return
        }

        displayResult += e.target.innerText
        display.textContent = '0'
        displayOperator.textContent = displayResult
    })
})

// 全部清空
document.querySelector('.ac').addEventListener('click', () => {
    displayResult = '';
    display.textContent = '0'
    displayOperator.textContent = '0'
    display.style.fontSize = `56px`
})

// ⌫按鈕
document.querySelector('.delete').addEventListener('click', () => {
    let arr = displayResult.split('')
    arr.pop()
    displayResult = arr.join('');
    display.textContent = displayResult
})

// =按鈕
document.querySelector('.equal').addEventListener('click', () => {
    let Result = displayResult.replace('×', '*').replace('÷', '/')
    Result = eval(Result)

    display.textContent = separator(Result)
    displayOperator.textContent = displayResult
})

// 小數點按鈕
document.querySelector('.decimal').addEventListener('click', (e) => {
    if (display.textContent.includes('.')) {
        return
    }
    displayResult += e.target.textContent
    display.textContent += e.target.textContent
})


// 避免破版
function checkDisplayLength() {
    if (display.textContent.length >= 8 && display.textContent.length < 16) {
        display.style.fontSize = `${56 * 0.8}px`
    } else if (display.textContent.length >= 16) {
        display.style.fontSize = `${56 * 0.3}px`
    }
}


function separator(numb) {
    var str = numb.toString().split(".");
    str[0] = str[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return str.join(".");
}