
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { NativeTransitionOptions, NativePageTransitions } from '@ionic-native/native-page-transitions';
import { HomePage } from '../home/home';
import { Helper } from '../../app/shared/math/helper';
import { MathService } from '../../app/shared/math/math.service';
import { IMathType } from '../../app/shared/math/mathType';

@Component({
  selector: 'page-calculate',
  templateUrl: 'calculate.html',
})
export class CalculatePage {
  helper = new Helper();
  blah: number = 0;
  firstVarible;
  secondVariable;
  randomMathType: IMathType;
  equation = {
    text: '',
    result: 0
  };
  inputAnswer: string = '';
  mathTypes: IMathType[];
  error: boolean = false;
  errorMsg: string = 'Prøv igen \uD83D\uDE0A'
  constructor(private nativePageTransitions: NativePageTransitions, public navCtrl: NavController, public navParams: NavParams, public mathService: MathService) {

  }
  ngOnInit() {
    this.getNewEquation();
  }
  goBack() {
    let options: NativeTransitionOptions = {
      direction: 'right',
      duration: 400,
      slowdownfactor: -1,
      iosdelay: 50
    }
    this.nativePageTransitions.slide(options);
    this.navCtrl.setRoot(HomePage);
  }

  getRndInputInt(input) {
    let inputRange = this.helper.getDigitRange(input);
    return this.helper.getRndInt(inputRange.smallest, inputRange.biggest);
  }

  getDivisionValuesFromDigits(biggestVal, smallestVal) {
    let nummeratorRange = this.helper.getDigitRange(biggestVal);
    let denominatorRange = this.helper.getDigitRange(smallestVal);
    let denominator = (biggestVal != smallestVal ? this.helper.getRndInt(denominatorRange.smallest, denominatorRange.biggest)
      : this.helper.getRndInt(denominatorRange.smallest, Math.floor(denominatorRange.biggest / 2)));
    let resultRange = {
      smallest: ((nummeratorRange.smallest + (denominator - (nummeratorRange.smallest % denominator))) / denominator),
      biggest: Math.floor(nummeratorRange.biggest / denominator)
    };
    this.equation.result = this.helper.getRndInt(resultRange.smallest != 1 ? resultRange.smallest : 2, resultRange.biggest)
    let nummerator = denominator * this.equation.result; // select random number in the valueRange
    this.firstVarible = nummerator;
    this.secondVariable = denominator;
  }
  getNewEquation() {
    this.inputAnswer = '';
    this.error = false;
    console.log(this.error);
    this.mathTypes = this.mathService.getMathTypes.filter(e => e.isSelected == true).map(e => e);
    this.randomMathType = this.mathTypes[this.helper.getRndInt(0, this.mathTypes.length - 1)];

    this.firstVarible = this.getRndInputInt(this.mathService.input1);
    this.secondVariable = this.getRndInputInt(this.mathService.input2);

    switch (this.randomMathType.title) {
      case 'Addition':
        this.equation.text = this.firstVarible + ' ' + this.randomMathType.text + ' ' + this.secondVariable;
        this.equation.result = this.firstVarible + this.secondVariable;
        break;
      case 'Multiplication':
        this.equation.text = this.firstVarible + ' ' + this.randomMathType.text + ' ' + this.secondVariable;
        this.equation.result = this.firstVarible * this.secondVariable;
        break;

      case 'Subtraction':
        if (this.secondVariable > this.firstVarible) {
          this.equation.text = this.secondVariable + ' ' + this.randomMathType.text + ' ' + this.firstVarible;
          this.equation.result = this.secondVariable - this.firstVarible;

        }
        else {
          this.equation.text = this.firstVarible + ' ' + this.randomMathType.text + ' ' + this.secondVariable;
          this.equation.result = this.firstVarible - this.secondVariable;

        }
        break;

      case 'Division':
        this.getDivisionValuesFromDigits(this.mathService.input1, this.mathService.input2);
        this.equation.text = this.firstVarible + ' ' + this.randomMathType.text + ' ' + this.secondVariable;
        this.equation.result = this.firstVarible / this.secondVariable;
        break;
      default:
        alert('Incorrect mathType was provided');
        break;
    }
  }
  checkIfCorrect() {
    // console.log(this.equation.text);
    // console.log(this.equation.result);
    if (this.equation.result == parseInt(this.inputAnswer, 10)) {
      this.getNewEquation();
    }
    else {
      this.error = true;
      console.log(this.error);
    }
  }
  addValue(e: HTMLButtonElement) {
    this.inputAnswer = this.inputAnswer.substring(0, this.inputAnswer.length - 1);
    console.log(this.inputAnswer);
  }
  here() {
    console.log('here');
  }
}
