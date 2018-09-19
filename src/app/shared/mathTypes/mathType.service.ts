import { IMathType } from './mathType';

export class MathTypeService {
    input1: number = 1;
    input2: number = 1;
    maxDiget: number = 5;
    getMathTypes: IMathType[] = [
        {
            title: 'Addition',
            text: '+',
            operator: '+',
            isSelected: false
        },
        {
            title: 'Subtraction',
            text: '-',
            operator: '-',
            isSelected: false
        },
        {

            title: 'Multiplication',
            text: '×',
            operator: '*',
            isSelected: false
        },
        {
            title: 'Division',
            text: '÷',
            operator: '/',
            isSelected: false
        }
    ]
}
