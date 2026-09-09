//Problem 1
function taxCalc(income) {
    if (income <= 0) return 0;

    if (income <= 48475) {
        return income * 0.12;
    } else if (income <= 197300) {
        return income * 0.24;
    } else if (income <= 250525) {
        return income * 0.32;
    } else {
        return income * 0.37;
    }
}
console.log(taxCalc(500000))


//Problem 2
function bmiTable(weight, height) {
    //weight in pounds, height in inches
    let bmi = (weight / (height * height) * 703) //Multiply by 703 to use imperial units

    if(bmi < 18.5){
        return `bmi: ${bmi}: underweight`
    } else if (bmi >= 18.5 && bmi < 24.9){
        return`bmi: ${bmi}: Healthy Weight`
    } else if (bmi >= 24.9 && bmi < 29.9){
        return`bmi: ${bmi}: Overweight`
    } else{
        return`bmi: ${bmi}: Obese`
    }
}
console.log(bmiTable(170, 71))

//Problem 3
import * as readline from 'node:readline/promises'
const rl = readline.createInterface({input: process.stdin, output: process.stdout})
async function babysFirstCalc(){
    const num1 = await rl.question("Please enter your first number")
    const num2 = await rl.question("Please enter your second number")
    const operator = await rl.question("Please enter '+', '-', '*', '/' or '^'")
}


//Problem 4
let intList = [12,412,6,7,2,56,876,64,897,5]
function maxIndex(list){
    let index = null
    let maxNum = list[0]
    for (let i = 0; i < list.length; i++) {
        if (list[i] > maxNum){
            index = i
        }
    }
    return index
}
console.log(maxIndex(intList))

//Problem 7
function countryCalc(aPop, aPercent, bPop, bPercent){    //import percentages as integer value
    if (aPop > bPop){
        return 0
    }
    if (aPercent < bPercent){
        return -1
    }
    const aMult = 1 + (aPercent/100)
    const bMult = 1 + (bPercent/100)
    let years = 0
    while (aPop < bPop){
        aPop *= aMult
        bPop *= bMult
        years++
    }
    return years
}
console.log(countryCalc(80000, 3, 200000, 1.5))
