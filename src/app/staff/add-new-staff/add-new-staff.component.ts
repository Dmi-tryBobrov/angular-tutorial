import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';

import { LoadStaffService } from 'src/app/services/load-staff.service';
import { IStaff } from 'src/app/staff-interface';

@Component({
  selector: 'app-add-new-staff',
  templateUrl: './add-new-staff.component.html',
  styleUrls: ['./add-new-staff.component.scss']
})
export class AddNewStaffComponent implements OnInit {

  @Output() newEmployee = new EventEmitter<IStaff>();
  @Output() goBack = new EventEmitter<void>();
  newEmplForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private loadStaffService: LoadStaffService
    ) { }

  ngOnInit(): void {
    this.newEmplForm = this.fb.group({
      name: [
        'name', [Validators.required,
        Validators.minLength(2), Validators.maxLength(50)]
    ],
      position: [
        'position', [Validators.required,
        Validators.minLength(2), Validators.maxLength(50)]
      ]
    });
  }

  get name() {return this.newEmplForm.get('name')!;}
  get position() {return this.newEmplForm.get('position')!;}

  back(): void{
    // this.router.navigate(['../'], {relativeTo: this.route});
    this.goBack.emit();
  }

  save(name: string, position: string): void{
    name = name.trim();
    position = position.trim();
    if(!name || !position) {return;}

    console.log(this.newEmplForm.value);
    this.newEmployee.emit({name, position} as IStaff);
    // this.loadStaffService.addNewStaffCard({name, position} as IStaff)
    // .subscribe()
  }
}
