import { Component, OnInit, Input } from '@angular/core';
import { IStaff } from '../staff-interface';

@Component({
  selector: 'app-staff-card',
  templateUrl: './staff-card.component.html',
  styleUrls: ['./staff-card.component.scss']
})
export class StaffCardComponent implements OnInit {

  @Input() employee?: IStaff;

  constructor() { }

  ngOnInit(): void {
  }

}
