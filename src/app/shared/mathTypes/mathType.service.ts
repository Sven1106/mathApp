import { IGroupMathType } from './mathType';

export class MathTypeService {
    input1: number = 1;
    input2: number = 1;
    getMathTypes: IGroupMathType = {
        Addition: {
            text: '+',
            operator: '+',
            isSelected: false
        },
        Subtraction: {
            text: '-',
            operator: '-',
            isSelected: false
        },
        Multiplication: {
            text: '×',
            operator: '*',
            isSelected: false
        },
        Division: {
            text: '÷',
            operator: '/',
            isSelected: false
        }
    };
}
