import { Component, OnInit, Input } from '@angular/core';
import { IGroupMathType } from '../shared/mathTypes/mathType';
import { MathTypeService } from '../shared/mathTypes/mathType.service';
@Component({
  selector: 'app-math-type',
  templateUrl: './math-type.component.html',
  styleUrls: ['./math-type.component.scss']
})
export class MathTypeComponent implements OnInit {
  @Input() value: IGroupMathType;
  constructor() { }

  ngOnInit() {
  }

}
