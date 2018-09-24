export class Helper {
    public getRndInt(min: number, max: number) { // NOT RANDOM ENOUGH!! https://hackernoon.com/how-does-javascripts-math-random-generate-random-numbers-ef0de6a20131 Returns a random integer between min (inclusive) and max (inclusive)
        return Math.floor(Math.random() * (max - min + 1) + min);
        
    }

    public getDigitRange(digit) { // Returns an object of the smallest and biggest numbers of a digit
        return {
            smallest: Math.pow(10, (digit - 1)),
            biggest: Math.pow(10, digit) - 1
        }
    }
}