import { Component, OnInit } from '@angular/core';
import { IStaff } from '../staff-interface';
import { LoadStaffService } from '../load-staff.service';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.scss']
})
export class StaffComponent implements OnInit {

  staff: IStaff[] = [];
  selectedEmployee?: IStaff;

  constructor(private loadStaffService: LoadStaffService,
    private messageService: MessageService) { }

  ngOnInit(): void {
    this.getStaff();
  }

  getStaff(): void{
    this.loadStaffService.getStaff().
    subscribe(staff => this.staff = staff);
  }

  selectEmployee(empl: IStaff): void{
    this.selectedEmployee = empl;
    this.messageService.add(`StaffComponent: Selected employee id=${empl.id}`);
  }

}
