import { Component } from '@angular/core';
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
  arrayOne(n: number): any[] {
    return Array(n);
  }
  constructor(public navCtrl: NavController, private mathTypeService: MathTypeService) {
    
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
    // console.log(this.input1);
    // console.log(this.input2);
    console.log(this.mathTypeService);
  }
}
