import { Component, OnInit } from '@angular/core';
import { LoadStaffService } from '../../services/load-staff.service';
import { IStaff } from '../../staff-interface';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap  } from 'rxjs/operators';

@Component({
  selector: 'app-staff-card-search',
  templateUrl: './staff-card-search.component.html',
  styleUrls: ['./staff-card-search.component.scss']
})
export class StaffCardSearchComponent implements OnInit {

  staff$!: Observable<IStaff[]>;
  private searchQueries = new Subject<string>();

  constructor(private loadStaffService: LoadStaffService) { }

  ngOnInit(): void {
    this.staff$ = this.searchQueries.pipe(
      debounceTime(350),
      distinctUntilChanged(),
      switchMap((query: string) => this.loadStaffService.searchStaff(query))
    );

  }

  search(query: string): void {
    this.searchQueries.next(query);
  }

}
