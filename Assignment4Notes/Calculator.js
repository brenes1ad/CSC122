class Calculator{
    add(num1, num2){
        return num1 + num2;
    }
    subtract(num1, num2){
        return num1 - num2
    }
    multiply(num1, num2, ){
        return num1 * num2;
    }
    divide(num1, num2){
        if (num2 == 0){
            console.log("Undefined: Cannot divide by 0!")
            return -1
        }
        return num1 / num2;
    }
}

let calc = new Calculator()
console.log(calc.add(1,2))
console.log(calc.divide(1, 2))
console.log(calc.multiply(1,2))
console.log(calc.subtract(1,2))

