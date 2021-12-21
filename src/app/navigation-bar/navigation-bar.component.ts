import { Component, OnInit } from '@angular/core';
import { MenuItem } from './menu-item';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss']
})
export class NavigationBarComponent implements OnInit {

  menuItems: MenuItem[] = [
    {
      label: 'Sign In',
      icon: 'login',
      smallScreen: true,
      mediumScreen: true,
      largeScreen: true
    },
    {
      label: 'About',
      icon: 'help',
      smallScreen: false,
      mediumScreen: false,
      largeScreen: true
    },
    {
      label: 'Pricing',
      icon: 'attach_money',
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
      label: 'Blog',
      icon: 'rss_feed',
      smallScreen: false,
      mediumScreen: false,
      largeScreen: true
    },
  ];
  
  constructor() { }

  ngOnInit(): void {
  }

}
