class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement
        this.currentOperandTextElement = currentOperandTextElement
        this.clear()
      }

    clear() {
        /*empty out previos, current and operation*/
        this.currentOperand = ''
        this.previousOperand = ''
        this.operation = undefined
      }
    

    delete() {
        /*slice from string starting from the end of the string*/
        this.currentOperand = this.currentOperand.toString().slice(0, -1)
    }

    appendNumber (number) {
        // check if number is period and we already have a period => return 
        if (number === '.' && this.currentOperand.includes('.')) return
        // make currentOperand a string to prevent numbers beeing added
        this.currentOperand = this.currentOperand.toString() + number.toString()
    }

    chooseOperation(operation) {
        // if there is no current operand => return
        if (this.currentOperand === '') return
        // If there is already a current operand, compute them 
        if (this.currentOperand !== '') {
            this.compute()
        }
        this.operation = operation
        this.previousOperand = this.currentOperand
        this.currentOperand = ''
    }

    compute () {
        let computation
        /* make prev and current numbers*/
        const prev = parseFloat(this.previousOperand)
        const current = parseFloat(this.currentOperand)
        // if there is no current or previous number => return
        if (isNaN(current) || isNaN(prev)) return
        switch (this.operation) {
            case '+':
              computation = prev + current
              break
            case '-':
              computation = prev - current
              break
            case '*':
              computation = prev * current
              break
            case '÷':
              computation = prev / current
              break
            default:
              return
          }
          this.currentOperand = computation
          this.operation = undefined
          this.previousOperand = ''
    }

    updateDisplay() {
        this.currentOperandTextElement.innerText = this.currentOperand
        this.previousOperandTextElement.innerText = this.previousOperand
        if (this.operation != null) {
            this.previousOperandTextElement.innerText = this.previousOperand + this.operation
        }
    }
}

const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const previousOperandTextElement = document.querySelector('[data-previous-operand]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
      calculator.appendNumber(button.innerText)
      calculator.updateDisplay()
    })
  })

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
      calculator.chooseOperation(button.innerText)
      calculator.updateDisplay()
    })
  })
  
  equalsButton.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()
  })

allClearButton.addEventListener('click', () => {
    calculator.clear()
    calculator.updateDisplay()
})

deleteButton.addEventListener('click', () => {
    calculator.delete()
    calculator.updateDisplay()
})