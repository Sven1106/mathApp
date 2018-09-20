import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NativeTransitionOptions, NativePageTransitions } from '@ionic-native/native-page-transitions';
import { HomePage } from '../home/home';
import { MathTypeService } from '../../app/shared/mathTypes/mathType.service';

/**
 * Generated class for the CalculatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-calculate',
  templateUrl: 'calculate.html',
})
export class CalculatePage {

  constructor(private nativePageTransitions: NativePageTransitions, public navCtrl: NavController, public navParams: NavParams, private mathTypeService: MathTypeService) {
  }
  ngOnInit() {
    console.log(this.mathTypeService);
  }
  goBack() {
    let options: NativeTransitionOptions = {
      direction: 'right',
      duration: 400,
      slowdownfactor: -1,
      iosdelay:50
    }
    this.nativePageTransitions.slide(options);
    this.navCtrl.setRoot(HomePage);
  }
}
