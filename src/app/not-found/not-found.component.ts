import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent implements OnInit, OnDestroy {

  private _interval!: ReturnType<typeof setInterval>;
  public timer = 5; //default time in seconds before redirecting

  constructor(private router: Router) { }

  countDown(): void {
    if(this.timer > 0)
      this.timer--;
    else
      this.router.navigate(['./']);
  }
  
  ngOnInit(): void {
    this._interval = setInterval(() => {
      this.countDown.call(this);
    }, 1000);
  }

  ngOnDestroy(): void {
    console.log('destroyed');
    clearInterval(this._interval);
  }
}
