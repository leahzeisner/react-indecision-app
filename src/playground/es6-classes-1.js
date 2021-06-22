class Person {
    constructor(name = 'Anonymous', age = 0) {
        this.name = name;
        this.age = age;
    }

    getGreeting() {
        return `Hello, I am ${this.name}!`
    }

    getDescription() {
        return `${this.name} is ${this.age} years old.`
    }
}


class Student extends Person {
    constructor(name, age, major) {
        super(name, age);
        this.major = major;
    }

    hasMajor() {
        return !!this.major;
    }

    getDescription() {
        let description = super.getDescription()
        if (this.hasMajor()) {
            description = description.substring(0, description.length - 1)
            description += ` and is majoring in ${this.major}.`
        }
        return description;      
    }
}


class Traveler extends Person {
    constructor(name, age, homeLocation) {
        super(name, age);
        this.homeLocation = homeLocation;
    }

    getGreeting() {
        let greeting = super.getGreeting()

        if (this.homeLocation) {
            greeting += ` I'm visiting from ${this.homeLocation}.`
        }
        return greeting
    }
}

const me = new Student('Leah Zeisner', 19, "Computer Science")
console.log(me.getDescription())

const other = new Student()
console.log(other.getDescription())

const anonTraveler = new Traveler();
const traveler = new Traveler('Bob Smith', 32, "New York");

console.log(anonTraveler.getGreeting())
console.log(traveler.getGreeting())