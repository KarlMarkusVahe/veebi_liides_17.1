interface CalculatingFunction{
    calculate(x: number):number;
    inputUnit():string;
    outputUnit():string;
}

class InchesToCm implements CalculatingFunction{
    calculate(inches: number):number{
        return inches*2.54;
    }
    inputUnit(): string {
        return "in";
    }
    outputUnit(): string{
        return "cm";
    }
}

class CmtoInches implements CalculatingFunction{
    calculate(x: number): number {
        return x/2.54;
    }
    inputUnit(): string {
        return "in";
    }
    outputUnit(): string{
        return "cm";
    }
}

class AXplusB implements CalculatingFunction{
    constructor(protected coeficient:number, protected intercept:number,
                protected inputUnitType:string , protected outputUnitType:string){}
    calculate(x:number):number{
        return this.coeficient*x+this.intercept;
    }
    inputUnit():string{return this.inputUnitType;}
    outputUnit():string{return this.outputUnitType;}
}


class Figure {
    constructor(protected calculator: CalculatingFunction) {
    }

    generatePoints(): { x: number; y: number; width: number; height: number }[] {
        const points: { x: number; y: number; width: number; height: number }[] = [];

        for (let i = 0; i < 25; i++) {
            const x = 10 * i;
            const y = 300 - 10 * this.calculator.calculate(i);
            const width = 3;
            const height = 3;
            points.push({x, y, width, height});
        }

        return points;
    }
}

export {CalculatingFunction, InchesToCm, CmtoInches, AXplusB, Figure};