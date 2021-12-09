import { AfterViewChecked, Component } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewChecked{
  title = 'Navigation menu';
  loggedIn = false;
  
  constructor(private authService: AuthService){}
  
  ngAfterViewChecked(): void {
    this.loggedIn = this.authService.isLoggedIn();
  }
  
}
