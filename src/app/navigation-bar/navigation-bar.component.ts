import { AfterContentChecked, Component, OnInit } from '@angular/core';
import { MenuItem } from './menu-item';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss']
})
export class NavigationBarComponent implements OnInit, AfterContentChecked {

  menuItems: MenuItem[] = [
    {
      label: 'About',
      icon: 'help',
      smallScreen: false,
      mediumScreen: false,
      largeScreen: true
    },
    {
      label: 'Courses',
      icon: 'shopping_cart',
      link: '/staff',
      smallScreen: false,
      mediumScreen: false,
      largeScreen: true
    },
    {
      label: 'Docs',
      icon: 'notes',
      smallScreen: false,
      mediumScreen: true,
      largeScreen: true
    },
    {
      label: 'Showcase',
      icon: 'slideshow',
      smallScreen: false,
      mediumScreen: true,
      largeScreen: true
    },
    {
      label: 'Draw',
      icon: 'brush',
      link: '/paint',
      smallScreen: false,
      mediumScreen: false,
      largeScreen: true
    },
    {
      label: 'Sign In',
      icon: 'login',
      link: '/auth',
      smallScreen: true,
      mediumScreen: true,
      largeScreen: true
    },
    {
      label: 'Sign Out',
      icon: 'logout',
      link: 'logout',
      smallScreen: true,
      mediumScreen: true,
      largeScreen: true
    },
  ];

  public isLoggedIn = false;
  
  constructor(private router: Router,
              private auth: AuthService) { }

  ngAfterContentChecked(): void {
    this.isLoggedIn = this.auth.isLoggedIn();
  }

  ngOnInit(): void
   {
  }

  navigate(link: string | undefined): void {
    if(!link)
      this.router.navigate(['**']);//redirect to PageNotFound
    else if(link === 'logout'){
      this.auth.logOut();
    } else
      this.router.navigate([link]);
  }

  checkLabels(label: string): boolean {
      if(label === "Sign In" && this.isLoggedIn)
        return false;
      if(label === "Sign Out" && !this.isLoggedIn)
        return false;
      
      return true;
  }
}
