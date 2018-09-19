export interface IGroupMathType {
  [key: string]: IMathType;
}
export interface IMathType {
  text: string;
  operator: string;
  isSelected: boolean;
}

//#region MathType as Enum
export enum MathTypeBlah {
  Addition = '+',
  Subtraction = '-',
  Multiplication = '×',
  Division = '÷'
}
export namespace MathTypeBlah {
  export function keys() {
    return Object.keys(MathTypeBlah).filter((type) => isNaN(<any>type) && type !== 'values' && type !== 'keys');
  }
  export function values() {
    return keys().map(key => MathTypeBlah[key as any]);
  }
}
//#endregion
