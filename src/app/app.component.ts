import { AfterContentChecked, AfterViewChecked, ChangeDetectorRef, Component } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterContentChecked {
  public title = 'Navigation menu';
  public loggedIn = false;
  
  constructor(private authService: AuthService,
              private changeDetector: ChangeDetectorRef){}

  ngAfterContentChecked(): void {
    this.loggedIn = this.authService.isLoggedIn();
  }

  public logOut(): void {
    if(!this.loggedIn) return;
    this.authService.logOut();
    // this.changeDetector.detectChanges();
  }
    
}
