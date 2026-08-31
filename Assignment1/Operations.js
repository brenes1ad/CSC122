
//Problem 1
var P1 = 30
var P2 = 50
var P3= 40

console.log((0.4*P1) + (0.4*P2) + (0.2*P3))

function weightGrade(P1, P2, P3){
    return ((0.4*P1) + (0.4*P2) + (0.2*P3))
}
console.log(weightGrade(30,50,40))


//Problem 2
var tempCel = 2
var tempFar = (tempCel * (9/5) + 32)
console.log(tempFar)

function celToFar(cel){
    return(cel * (9/5) + 32)
}
console.log(celToFar(2))

//Problem 3
var weightPounds = 120
var weightKilo = weightPounds / 2.205
console.log(weightKilo)

function poundsToKilo(pounds){
    return pounds / 2.205
}
console.log(poundsToKilo(120))

//Problem 4
var feet = 3
var inches = 8
var meters = (feet * 0.3048) + (inches * 0.0254)
console.log(meters)

function imperialToMetric(feet, inches){
    return ((feet * 0.3048) + (inches * 0.0254))
}
console.log(imperialToMetric(3, 8))

//Problem 5
var weight = 100 //in pounds
var height = 120 //in inches
var bmi = weight / (height*height) * 703
console.log(bmi)

function bmiCalc(weight, height){
    return (weight / (height*height) * 703)
}
console.log(bmiCalc(100, 120))