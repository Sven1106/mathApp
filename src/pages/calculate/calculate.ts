
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { NativeTransitionOptions, NativePageTransitions } from '@ionic-native/native-page-transitions';
import { HomePage } from '../home/home';
import { Helper } from '../../app/shared/math/helper';
import { MathService } from '../../app/shared/math/math.service';
import { IMathType } from '../../app/shared/math/mathType';
import * as RandomJs from 'random-js';

@Component({
  selector: 'page-calculate',
  templateUrl: 'calculate.html',
})
export class CalculatePage {
  helper = new Helper();
  randomJs = new RandomJs();
  blah: number = 0;
  rndInt1;
  rndInt2;
  constructor(private nativePageTransitions: NativePageTransitions, public navCtrl: NavController, public navParams: NavParams, public mathService: MathService) {

  }
  ngOnInit() {

    let mathTypes: IMathType[] = this.mathService.getMathTypes.filter(e => e.isSelected == true).map(e => e);
    let randomMathType = mathTypes[this.randomJs.integer(0, mathTypes.length - 1)];

    this.rndInt1 = this.getRndInputInt(this.mathService.input1);
    this.rndInt2 = this.getRndInputInt(this.mathService.input2);
    // let rnd = {
    //   input1: this.getRndInputInt(this.mathService.input1),
    //   input2: this.getRndInputInt(this.mathService.input2)
    // }

    // console.log(rnd);
    // console.log(rndInt1);
    // console.log(rndInt2);
    switch (randomMathType.title) {
      case 'Addition':
      case 'Multiplication':
        console.log(this.rndInt1 + ' ' + randomMathType.operator + ' ' + this.rndInt2);
        break;

      case 'Subtraction':
        if (this.rndInt2 > this.rndInt1) {
          console.log(this.rndInt2 + ' ' + randomMathType.operator + ' ' + this.rndInt1);
        }
        else {
          console.log(this.rndInt1 + ' ' + randomMathType.operator + ' ' + this.rndInt2);
        }
        break;

      case 'Division':
        if (this.rndInt2 > this.rndInt1) {
          this.getDivisionEquation(this.helper.getDigitRange(this.mathService.input2), this.rndInt1);
        }
        else {
          this.getDivisionEquation(this.helper.getDigitRange(this.mathService.input1), this.rndInt2);
        }
        break;
      default:
        alert('Incorrect mathType was provided');
        break;
    }

  }
  goBack() {
    let options: NativeTransitionOptions = {
      direction: 'right',
      duration: 400,
      slowdownfactor: -1,
      iosdelay: 50
    }
    // this.nativePageTransitions.slide(options);
    this.navCtrl.setRoot(HomePage);
  }

  getRndInputInt(input) {
    let inputRange = this.helper.getDigitRange(input);
    return this.helper.getRndInt(inputRange.smallest, inputRange.biggest);
  }

   getDivisionEquation(x, y){
    let nummeratorRange = x;
    let denominator = y; //Tæller
    let vRange = this.helper.getValRange(nummeratorRange.smallest, nummeratorRange.biggest, denominator);
    let value = this.helper.getRndInt(vRange.smallest, vRange.biggest)
    let nummerator = denominator * value; // select random number in the valueRange
    return console.log(nummerator + '/' + denominator);
  }

  isPrime(num) {
    for (var i = 2; i < num; i++)
      if (num % i === 0) return false;
    return num !== 1 && num !== 0;
  }
}
