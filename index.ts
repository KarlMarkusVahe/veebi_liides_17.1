import express from 'express';
import { Request, Response } from 'express';
import path from 'path';
import { CalculatingFunction, InchesToCm, CmtoInches, AXplusB} from './calc';

const app = express();
const port = 3000;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));

app.get('/', (req: Request, res: Response) => {
    res.render('index', { conversionType: 'inchesToCm', result: null });
});

app.post('/', (req: Request, res: Response) => {
    const { conversionType, inches, cm, a, b } = req.body;

    let calculatingFunction: CalculatingFunction | null = null;

    if (conversionType === 'inchesToCm') {
        calculatingFunction = new InchesToCm();
    } else if (conversionType === 'cmToInches') {
        calculatingFunction = new CmtoInches();
    } else if (conversionType === 'axPlusB') {
        const coeficient = parseFloat(a);
        const intercept = parseFloat(b);
        calculatingFunction = new AXplusB(coeficient, intercept, 'x', 'y');
    }

    let result = null;
    if (calculatingFunction) {
        let inputValue: number | null = null;
        let outputValue: number | null = null;

        if (conversionType === 'inchesToCm') {
            inputValue = parseFloat(inches);
            if (!isNaN(inputValue)) {
                outputValue = calculatingFunction.calculate(inputValue);
            }
        } else if (conversionType === 'cmToInches') {
            inputValue = parseFloat(cm);
            if (!isNaN(inputValue)) {
                outputValue = calculatingFunction.calculate(inputValue);
            }
        } else if (conversionType === 'axPlusB') {
            inputValue = parseFloat(a);
            if (!isNaN(inputValue)) {
                outputValue = calculatingFunction.calculate(inputValue);
            }
        }

        if (inputValue !== null && outputValue !== null) {
            result = { inputValue, outputValue };
        }
    }

    res.render('index', {
        conversionType,
        result,
        inchesToCmInputUnit: calculatingFunction?.inputUnit() || '',
        inchesToCmOutputUnit: calculatingFunction?.outputUnit() || '',
        cmToInchesInputUnit: calculatingFunction?.inputUnit() || '',
        cmToInchesOutputUnit: calculatingFunction?.outputUnit() || '',
        axPlusBInputUnit: calculatingFunction?.inputUnit() || '',
        axPlusBOutputUnit: calculatingFunction?.outputUnit() || '',
        a,
        b,
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});