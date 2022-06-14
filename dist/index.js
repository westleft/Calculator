"use strict";
class Calculator {
    constructor() {
        this.inputs = document.querySelectorAll(".input");
        this.operatorButtons = document.querySelectorAll(".operator");
        this.userInput = document.querySelector(".display");
        this.formula = document.querySelector(".formula");
        this.equalButton = document.querySelector(".equal");
        this.deleteButton = document.querySelector(".delete");
        this.acButton = document.querySelector(".ac");
        this.decimalButton = document.querySelector(".decimal");
        this.zeroButton = document.querySelector(".zeroButton");
        this.doubleZeroButton = document.querySelector(".doubleZeroButton");
        this.operations = ["+", "-", "÷", "×", "."];
        this.result = "";
        this.addListener();
    }
    // 所有按鈕事件
    addListener() {
        // 1-9 數字按鈕
        this.inputs.forEach((item) => {
            item.addEventListener("click", () => {
                this.result += item.textContent;
                this.userInput.value = this.result;
            });
        });
        // 0 按鈕
        this.zeroButton.addEventListener("click", () => {
            if (!this.checkZeroCanClick(this.result))
                return;
            this.result += "0";
            this.userInput.value = this.result;
        });
        // 00 按鈕
        this.doubleZeroButton.addEventListener("click", () => {
            if (!this.checkZeroCanClick(this.result))
                return;
            if (this.result === "")
                return;
            this.result += "00";
            this.userInput.value = this.result;
        });
        // +-*/ 按鈕
        this.operatorButtons.forEach((item) => {
            item.addEventListener("click", () => {
                if (this.checkLastWord(this.result))
                    return;
                this.result += item.textContent;
                this.userInput.value = this.result;
            });
        });
        // 「=」按鈕
        this.equalButton.addEventListener("click", () => {
            // 沒有運算符號則返回
            if (!this.checkOperation(this.result))
                return;
            if (this.checkLastWord(this.result))
                return;
            this.formula.value = this.result;
            const calculatedResult = this.replaceOperation(this.result);
            this.userInput.value = eval(calculatedResult);
            this.result = eval(calculatedResult);
        });
        // 「.」按鈕
        this.decimalButton.addEventListener("click", () => {
            if (this.result === "")
                return;
            this.checkLastWord(this.result);
            if (this.checkLastWord(this.result))
                return;
            if (this.checkHasDecimal(this.result))
                return;
            this.result += ".";
            this.userInput.value = this.result;
        });
        // 刪除按鈕
        this.deleteButton.addEventListener("click", () => {
            this.result = this.result.slice(0, -1);
            this.userInput.value = this.result;
        });
        // 重置按鈕
        this.acButton.addEventListener("click", () => {
            this.reset();
        });
    }
    // 替換乘除符號
    replaceOperation(str) {
        return str.replace(/÷/g, "/").replace(/×/g, "*");
    }
    // 確認有無運算符號
    checkOperation(str) {
        let result = false;
        for (let i = 0; i < str.length; i++) {
            if (this.operations.includes(str[i])) {
                result = true;
                break;
            }
        }
        return result;
    }
    // 確認「.」位置及數量
    checkHasDecimal(str) {
        let result = false;
        // 確認最後一個字是否為 「.」
        const lastWord = str.length - 1;
        if (str[lastWord] === ".")
            result = true;
        // 確認有沒有含「.」
        const arr = str.split(/[-+÷×]/);
        if (arr[arr.length - 1].includes("."))
            result = true;
        return result;
    }
    // 檢查最後一個單字是否為 +-*/.
    checkLastWord(str) {
        let result = false;
        const lastWord = str[str.length - 1];
        if (this.operations.includes(lastWord))
            result = true;
        return result;
    }
    // 確認 0 是否可按
    checkZeroCanClick(str) {
        let result = true;
        const arr = str.split(/[-+÷×]/);
        if (arr[arr.length - 1] === "0")
            result = false;
        return result;
    }
    // 重置
    reset() {
        this.userInput.value = "0";
        this.formula.value = "0";
        this.result = "";
    }
}
const calculator = new Calculator();
