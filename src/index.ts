class Calculator {
  inputs: NodeList;
  operatorButtons: NodeList;
  userInput: HTMLInputElement;
  formula: HTMLInputElement;
  equalButton: HTMLButtonElement;
  acButton: HTMLButtonElement;
  decimalButton: HTMLButtonElement;
  deleteButton: HTMLButtonElement;
  zeroButton: HTMLButtonElement;
  doubleZeroButton: HTMLButtonElement;
  operations: string[];
  result: string;

  constructor() {
    this.inputs = document.querySelectorAll(".input")! as NodeList;
    this.operatorButtons = document.querySelectorAll(".operator")! as NodeList;
    this.userInput = document.querySelector(".display")! as HTMLInputElement;
    this.formula = document.querySelector(".formula")! as HTMLInputElement;
    this.equalButton = document.querySelector(".equal")! as HTMLButtonElement;
    this.deleteButton = document.querySelector(".delete")! as HTMLButtonElement;
    this.acButton = document.querySelector(".ac")! as HTMLButtonElement;

    this.decimalButton = document.querySelector(".decimal") as HTMLButtonElement;
    this.zeroButton = document.querySelector(".zeroButton") as HTMLButtonElement;
    this.doubleZeroButton = document.querySelector(".doubleZeroButton") as HTMLButtonElement;
    this.operations = ["+", "-", "÷", "×", "."];

    this.result = "";
    this.addListener();
  }

  // 所有按鈕事件
  private addListener() {
    // 1-9 數字按鈕
    this.inputs.forEach((item) => {
      item.addEventListener("click", () => {
        this.result += item.textContent;
        this.userInput.value = this.result;
      });
    });

    // 0 按鈕
    this.zeroButton.addEventListener("click", () => {
      if (!this.checkZeroCanClick(this.result)) return;

      this.result += "0";
      this.userInput.value = this.result;
    });

    // 00 按鈕
    this.doubleZeroButton.addEventListener("click", () => {
      if (!this.checkZeroCanClick(this.result)) return;
      if (this.result === "") return;

      this.result += "00";
      this.userInput.value = this.result;
    });

    // +-*/ 按鈕
    this.operatorButtons.forEach((item) => {
      item.addEventListener("click", () => {
        if (this.checkLastWord(this.result)) return;
        this.result += item.textContent;
        this.userInput.value = this.result;
      });
    });

    // 「=」按鈕
    this.equalButton.addEventListener("click", () => {
      // 沒有運算符號則返回
      if (!this.checkOperation(this.result)) return;
      if (this.checkLastWord(this.result)) return;

      this.formula.value = this.result;

      const calculatedResult = this.replaceOperation(this.result);
      this.userInput.value = eval(calculatedResult);
      this.result = eval(calculatedResult);
    });

    // 「.」按鈕
    this.decimalButton.addEventListener("click", () => {
      if (this.result === "") return;
      this.checkLastWord(this.result);
      if (this.checkLastWord(this.result)) return;
      if (this.checkHasDecimal(this.result)) return;

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
  private replaceOperation(str: string) {
    return str.replace(/÷/g, "/").replace(/×/g, "*");
  }

  // 確認有無運算符號
  private checkOperation(str: string): boolean {
    let result: boolean = false;
    for (let i = 0; i < str.length; i++) {
      if (this.operations.includes(str[i])) {
        result = true;
        break;
      }
    }

    return result;
  }

  // 確認「.」位置及數量
  private checkHasDecimal(str: string): boolean {
    let result: boolean = false;
    // 確認最後一個字是否為 「.」
    const lastWord: number = str.length - 1;
    if (str[lastWord] === ".") result = true;

    // 確認有沒有含「.」
    const arr: string[] = str.split(/[-+÷×]/);
    if (arr[arr.length - 1].includes(".")) result = true;

    return result;
  }

  // 檢查最後一個單字是否為 +-*/.
  private checkLastWord(str: string): boolean {
    let result: boolean = false;
    const lastWord: string = str[str.length - 1];
    if (this.operations.includes(lastWord)) result = true;

    return result;
  }

  // 確認 0 是否可按
  private checkZeroCanClick(str: string): boolean {
    let result: boolean = true;
    const arr: string[] = str.split(/[-+÷×]/);
    if (arr[arr.length - 1] === "0") result = false;

    return result;
  }

  // 重置
  private reset() {
    this.userInput.value = "0";
    this.formula.value = "0";
    this.result = "";
  }
}

const calculator = new Calculator();