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

export {CalculatingFunction, InchesToCm, CmtoInches, AXplusB};