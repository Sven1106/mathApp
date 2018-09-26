import { CalculatePage } from './../calculate/calculate';
import { Component } from '@angular/core';
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions';
import { AlertController, NavController } from 'ionic-angular';
import { IMathType } from '../../app/shared/math/mathType';
import { MathService } from '../../app/shared/math/math.service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  mathTypes: IMathType[];
  keys: String[];
  input1: number;
  input2: number;
  hasSelected: boolean = false;;
  options: NativeTransitionOptions;
  arrayOne(n: number): any[] {
    return Array(n);
  }
  constructor(private alertCtrl: AlertController, private nativePageTransitions: NativePageTransitions, public navCtrl: NavController, private mathService: MathService) {
    this.hasSelected = this.mathService.getMathTypes.some(e => e.isSelected == true);
    this.options = {
      direction: 'left',
      duration: 400,
      slowdownfactor: -1,
      iosdelay:50
    }
    //console.log(this.hasSelected);
  }
  onChange(target: HTMLSelectElement) {
    switch (target.id) {
      case 'input1':
        this.mathService.input1 = parseInt(target.value, 10);
        if(this.mathService.input1 < this.mathService.input2)
          this.mathService.input2 = this.mathService.input1;
        break;
      case 'input2':
        this.mathService.input2 = parseInt(target.value, 10);
        if(this.mathService.input2 > this.mathService.input1)
          this.mathService.input1 = this.mathService.input2;
        break;
      default:
        break;
    }
  }

  ionViewWillLeave() {
    // this.nativePageTransitions.slide(this.options)   
   }

  onClick() {
    this.hasSelected = this.mathService.getMathTypes.some(e => e.isSelected == true);
    if(this.hasSelected){
      // this.nativePageTransitions.slide(this.options);
      this.navCtrl.setRoot(CalculatePage);
    }
    else{
      let alert = this.alertCtrl.create({
        title: 'Vælg regneart',
        subTitle: 'Du mangler at vælge en regneart',
        buttons: ['Dismiss']
      });
      alert.present();
    }
  }
}
