import { CalculatePage } from './../calculate/calculate';
import { Component } from '@angular/core';
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions';
import { NavController } from 'ionic-angular';
import { IMathType } from '../../app/shared/mathTypes/mathType';
import { MathTypeService } from '../../app/shared/mathTypes/mathType.service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  mathTypes: IMathType[];
  keys: String[];
  input1: number;
  input2: number;
  options: NativeTransitionOptions;
  arrayOne(n: number): any[] {
    return Array(n);
  }
  constructor(private nativePageTransitions: NativePageTransitions, public navCtrl: NavController, private mathTypeService: MathTypeService) {
     this.options = {
      direction: 'left',
      duration: 400,
      slowdownfactor: -1,
      iosdelay:50
    }
  }
  onChange(target: HTMLSelectElement) {
    switch (target.id) {
      case 'input1':
        this.mathTypeService.input1 = parseInt(target.value, 10);
        break;
      case 'input2':
        this.mathTypeService.input2 = parseInt(target.value, 10);
        break;
      default:
        break;
    }
  }

  ionViewWillLeave() {
    this.nativePageTransitions.slide(this.options)   
   }

  onClick() {
    this.nativePageTransitions.slide(this.options);
    this.navCtrl.setRoot(CalculatePage);
  }
}
