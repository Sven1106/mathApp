
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
  constructor(private nativePageTransitions: NativePageTransitions, public navCtrl: NavController, public navParams: NavParams, public mathService: MathService) {

  }
  ngOnInit() {

    let mathTypes: IMathType[] = this.mathService.getMathTypes.filter(e => e.isSelected == true).map(e => e);
    let randomMathType = mathTypes[this.randomJs.integer(0, mathTypes.length - 1)];

    let rndInt1 = this.getRndInputInt(this.mathService.input1);
    let rndInt2 = this.getRndInputInt(this.mathService.input2);
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
        console.log(rndInt1 + ' ' + randomMathType.operator + ' ' + rndInt2);
        break;

      case 'Subtraction':
        if (rndInt2 > rndInt1) {
          console.log(rndInt2 + ' ' + randomMathType.operator + ' ' + rndInt1);
        }
        else {
          console.log(rndInt1 + ' ' + randomMathType.operator + ' ' + rndInt2);
        }
        break;

      case 'Division':
        console.log(this.isPrime(rndInt2));
        console.log(rndInt1 + '/' + rndInt2)
        // if (rndInt2 > rndInt1) {
        //   this.getNearestDivisible(rndInt2, rndInt1);
        // }
        // else {
        //   this.getNearestDivisible(rndInt1, rndInt2);
        // }
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
    return this.randomJs.integer(inputRange.smallest, inputRange.biggest);
  }

  getNearestDivisible(x, y) {
    if (true) {
      let remainder = x % y;
      if (remainder > y * 0.5) {
        console.log('Recalculate: ' + x + '/' + y);
        this.getNearestDivisible(x, y - 1);
      }
      else {
        return console.log(x - remainder + '/' + y);
      }
    }
    else {

    }

  }
  isPrime(num) {
    for (var i = 2; i < num; i++)
      if (num % i === 0) return false;
    return num !== 1 && num !== 0;
  }
}
