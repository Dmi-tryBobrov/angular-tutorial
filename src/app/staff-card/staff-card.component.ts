import { Component, OnInit, Input } from '@angular/core';
import { IStaff } from '../staff-interface';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { LoadStaffService } from '../load-staff.service';

@Component({
  selector: 'app-staff-card',
  templateUrl: './staff-card.component.html',
  styleUrls: ['./staff-card.component.scss']
})
export class StaffCardComponent implements OnInit {

  @Input() employee?: IStaff;

  constructor(private route: ActivatedRoute,
    private location: Location,
    private loadStaffService: LoadStaffService
    ) { }

  ngOnInit(): void {
    this.getStaffCard();
  }

  getStaffCard(): void{
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.loadStaffService.getStaffCardById(id).
    subscribe(employee => this.employee = employee);
  }

  back(): void{
    this.location.back();
  }
}
