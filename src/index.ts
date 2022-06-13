class Calculator {
  userInput: HTMLInputElement;
  formula: HTMLInputElement;
  inputs: NodeList;
  result: string;
  equalButton: HTMLButtonElement;

  constructor() {
    this.userInput = document.querySelector(".display")! as HTMLInputElement;
    this.formula = document.querySelector(".formula")! as HTMLInputElement;
    this.inputs = document.querySelectorAll(".input")! as NodeList;
    this.equalButton = document.querySelector(".equal")! as HTMLButtonElement;

    this.result = "";
    this.addNumber();
  }

  private addNumber() {
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

  private replaceOperation(str: string) {
    return str.replace(/÷/g, "/").replace(/×/g, "*");
  }
}

const calculator = new Calculator();
