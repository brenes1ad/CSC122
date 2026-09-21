class Guy{
    constructor(name, cash){
        this.name = name;
        this.cash = cash;
    }
    getCash(){
        return this.cash;
    }
    getName(){
        return this.name;
    }

    giveCash(amount){
        if(amount > this.cash){
            console.log(`${this.name} says: You don't have that much cash to give away! You only have ${this.cash} dollars`);
            return 0
        }
        if (amount < 0){
            console.log(`${this.name} says: Invalid amount to give!`)
            return 0
        }
        this.cash -= amount
        return amount
    }

    takeCash(amount){
        if (amount < 0){
            console.log(`${this.name} says: Invalid amount to take a cash!`)
            return 0
        }
        this.cash += amount
    }

}

let bobert = new Guy("Bobert", 100)
let ronald = new Guy("Ronald", 300)

console.log("Starting Cash: ")
console.log(bobert.getName(), ": ", bobert.getCash())
console.log(ronald.getName(), ": ", ronald.getCash())

//Bobert Takes 50 from Donald
bobert.takeCash(ronald.giveCash(50))
console.log("After Transaction ")
console.log(bobert.getName(), ': ', bobert.getCash())
console.log(ronald.getName(), ': ', ronald.getCash())