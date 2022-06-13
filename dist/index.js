"use strict";
class Calculator {
    constructor() {
        this.userInput = document.querySelector(".display");
        this.formula = document.querySelector(".formula");
        this.inputs = document.querySelectorAll(".input");
        this.equalButton = document.querySelector(".equal");
        this.result = "";
        this.addNumber();
    }
    addNumber() {
        this.inputs.forEach((item) => {
            item.addEventListener("click", () => {
                this.result += item.textContent;
                this.userInput.value = this.result;
            });
        });
        this.equalButton.addEventListener("click", () => {
            this.formula.value = this.result;
            const result = this.replaceOperation(this.result);
            this.userInput.value = eval(result);
        });
    }
    replaceOperation(str) {
        return str.replace(/÷/g, "/").replace(/×/g, "*");
    }
}
const calculator = new Calculator();
