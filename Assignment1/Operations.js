
//Problem 1
let P1 = 30
let P2 = 50
let P3= 40

console.log((0.4*P1) + (0.4*P2) + (0.2*P3))

function weightGrade(P1, P2, P3){
    return ((0.4*P1) + (0.4*P2) + (0.2*P3))
}
console.log(weightGrade(30,50,40))


//Problem 2
let  tempCel = 2
let tempFar = (tempCel * (9/5) + 32)
console.log(tempFar)

function celToFar(cel){
    return(cel * (9/5) + 32)
}
console.log(celToFar(2))

//Problem 3
let weightPounds = 120
let weightKilo = weightPounds / 2.205
console.log(weightKilo)

function poundsToKilo(pounds){
    return pounds / 2.205
}
console.log(poundsToKilo(120))

//Problem 4
let feet = 3
let inches = 8
let meters = (feet * 0.3048) + (inches * 0.0254)
console.log(meters)

function imperialToMetric(feet, inches){
    return ((feet * 0.3048) + (inches * 0.0254))
}
console.log(imperialToMetric(3, 8))

//Problem 5
let weight = 100 //in pounds
let height = 120 //in inches
let bmi = weight / (height*height) * 703 //Imperial
console.log(bmi)

function bmiCalc(weight, height){
    //weight in pounds, height in inches
    return (weight / (height*height) * 703) //Multiply by 703 to use imperial units
}
console.log(bmiCalc(100, 120))