import express, { Request, Response } from 'express';
import { CalculatingFunction, InchesToCm, CmtoInches, AXplusB, Figure } from './calc';

const app = express();
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

let calculatingFunction: CalculatingFunction | null = null;

app.get('/', (req: Request, res: Response) => {
    res.render('index', { conversionType: 'inchesToCm', result: null, figure: null });
});

app.post('/', (req: Request, res: Response) => {
    const conversionType = req.body.conversionType;
    let result: { inputValue: number; inputUnit: string; outputValue: number; outputUnit: string } | null = null;
    let figure: Figure | null = null;

    if (conversionType === 'inchesToCm') {
        calculatingFunction = new InchesToCm();
        const inches = parseFloat(req.body.inputValue);
        if (!isNaN(inches)) {
            const cm = calculatingFunction.calculate(inches);
            result = {
                inputValue: inches,
                inputUnit: calculatingFunction.inputUnit(),
                outputValue: cm,
                outputUnit: calculatingFunction.outputUnit(),
            };
            figure = new Figure(calculatingFunction);
        }
    } else if (conversionType === 'cmToInches') {
        calculatingFunction = new CmtoInches();
        const cm = parseFloat(req.body.inputValue);
        if (!isNaN(cm)) {
            const inches = calculatingFunction.calculate(cm);
            result = {
                inputValue: cm,
                inputUnit: calculatingFunction.inputUnit(),
                outputValue: inches,
                outputUnit: calculatingFunction.outputUnit(),
            };
            figure = new Figure(calculatingFunction);
        }
    } else if (conversionType === 'axPlusB') {
        const coefficient = parseFloat(req.body.coefficient);
        const intercept = parseFloat(req.body.intercept);
        const inputUnitType = req.body.inputUnitType;
        const outputUnitType = req.body.outputUnitType;

        if (!isNaN(coefficient) && !isNaN(intercept)) {
            calculatingFunction = new AXplusB(coefficient, intercept, inputUnitType, outputUnitType);
            const x = parseFloat(req.body.inputValue);
            if (!isNaN(x)) {
                const y = calculatingFunction.calculate(x);
                result = {
                    inputValue: x,
                    inputUnit: inputUnitType,
                    outputValue: y,
                    outputUnit: outputUnitType,
                };
                figure = new Figure(calculatingFunction);
            }
        }
    }

    res.render('index', { conversionType, result, figure });
});

app.listen(3000, () => {
    console.log('Server started on port 3000');
});