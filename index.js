document.addEventListener("DOMContentLoaded", function () {
  var display = document.getElementById("view")
  var buttons = document.querySelectorAll(".btn, .btn-op, .btn-eq")
  var expression = ""

  buttons.forEach(function (button) {
    button.addEventListener("click", function () {
      var btnValue = this.textContent

      if (btnValue === "C") {
        expression = ""
      } else if (btnValue === "⌫") {
        expression = expression.slice(0, -1)
      } else if (btnValue === "=") {
        try {
          expression = evaluateExpression(expression)
        } catch (error) {
          expression = "Error"
        }
      } else {
        expression += btnValue
      }
      display.textContent = expression
    })
  })

  function evaluateExpression(expression) {
    var result = 0
    var currentNumber = ""
    var operator = "+"

    for (var i = 0; i < expression.length; i++) {
      var char = expression[i]

      if ("+-x÷√^".includes(char)) {
        if (currentNumber !== "") {
          result = calculate(result, parseFloat(currentNumber), operator)
          currentNumber = ""
        }
        operator = char
      } else if (char === "!") {
        if (currentNumber !== "") {
          result = calculate(result, parseFloat(currentNumber), operator)
          currentNumber = ""
        }
        operator = char
      } else {
        currentNumber += char
      }
    }

    if (currentNumber !== "") {
      result = calculate(result, parseFloat(currentNumber), operator)
    }

    return result
  }

  function calculate(num1, num2, operator) {
    switch (operator) {
      case "+":
        return num1 + num2
      case "-":
        return num1 - num2
      case "x":
        return num1 * num2
      case "√":
        return Math.sqrt(num2)
      case "!":
        return factorialize(num2)
      case "^":
        return Math.pow(num1, num2)
      case "÷":
        if (num2 === 0) {
          throw new Error("Division by zero")
        }
        return num1 / num2
      default:
        return 0
    }
  }

  function factorialize(num) {
    if (num < 0) return -1
    else if (num === 0) return 1
    else {
      return num * factorialize(num - 1)
    }
  }
})
