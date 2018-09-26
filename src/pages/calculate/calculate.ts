
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
  equation;
  result;
  constructor(private nativePageTransitions: NativePageTransitions, public navCtrl: NavController, public navParams: NavParams, public mathService: MathService) {

  }
  ngOnInit() {

    let mathTypes: IMathType[] = this.mathService.getMathTypes.filter(e => e.isSelected == true).map(e => e);
    let randomMathType = mathTypes[this.helper.getRndInt(0, mathTypes.length - 1)];

    this.firstVarible = this.getRndInputInt(this.mathService.input1);
    this.secondVariable = this.getRndInputInt(this.mathService.input2);

    switch (randomMathType.title) {
      case 'Addition':
        this.equation = this.firstVarible + ' ' + randomMathType.operator + ' ' + this.secondVariable;
        this.result = this.firstVarible + this.secondVariable;
        break;
      case 'Multiplication':
        this.equation = this.firstVarible + ' ' + randomMathType.operator + ' ' + this.secondVariable;
        this.result = this.firstVarible * this.secondVariable;
        break;

      case 'Subtraction':
        if (this.secondVariable > this.firstVarible) {
          this.equation = this.secondVariable + ' ' + randomMathType.operator + ' ' + this.firstVarible;
          this.result = this.firstVarible - this.secondVariable;

        }
        else {
          this.equation = this.firstVarible + ' ' + randomMathType.operator + ' ' + this.secondVariable;
          this.result = this.firstVarible - this.secondVariable;

        }
        break;

      case 'Division':
        this.getDivisionValuesFromDigits(this.mathService.input1, this.mathService.input2);
        this.equation = this.firstVarible + ' ' + randomMathType.operator + ' ' + this.secondVariable;
        this.result = this.firstVarible / this.secondVariable;
        break;
      default:
        alert('Incorrect mathType was provided');
        break;
    }

  }
  goBack() {
    // let options: NativeTransitionOptions = {
    //   direction: 'right',
    //   duration: 400,
    //   slowdownfactor: -1,
    //   iosdelay: 50
    // }
    // this.nativePageTransitions.slide(options);
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
    let result = this.helper.getRndInt(resultRange.smallest != 1 ? resultRange.smallest : 2, resultRange.biggest)
    let nummerator = denominator * result; // select random number in the valueRange
    this.firstVarible = nummerator;
    this.secondVariable = denominator;
  }

  checkIfCorrect(e){
   // e.preventDefault();
    // if(){

    // }
    console.log(e)
  }
}
