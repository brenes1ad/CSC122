//Problem 1



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