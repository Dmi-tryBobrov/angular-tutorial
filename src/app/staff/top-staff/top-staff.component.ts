import { Component, OnInit } from '@angular/core';
import { LoadStaffService } from '../../services/load-staff.service';
import { IStaff } from '../../staff-interface';


@Component({
  selector: 'app-top-staff',
  templateUrl: './top-staff.component.html',
  styleUrls: ['./top-staff.component.scss']
})
export class TopStaffComponent implements OnInit {

  topStaff: IStaff[] = [];
  constructor(private loadStaffService: LoadStaffService) { }

  ngOnInit(): void {
    this.displayTopStaff();
  }

  displayTopStaff(): void {
    this.loadStaffService.getStaff().
    subscribe(topStaff => {
      for (let empl of topStaff){
        if(empl && empl.employeeOfTheMonth)
          this.topStaff.push(empl);
      }

      this.topStaff = this.topStaff.slice(0, 5);
    });
  }
}