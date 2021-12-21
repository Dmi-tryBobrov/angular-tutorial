import { AfterContentChecked, AfterViewChecked, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { IStaff } from '../staff-interface';
import { LoadStaffService } from '../services/load-staff.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.scss']
})
export class StaffComponent {
  public title = 'Navigation menu';

  constructor() {};
}
