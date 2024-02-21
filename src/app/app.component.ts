import { Component } from '@angular/core';
import { Router } from '@angular/router';

interface SideBarToggle{
  screenWidth: number;
  collapsed: boolean;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'front-mkl';

  isSideNavCollapsed = false;
  screenWidth = 0;

  constructor(private router: Router) {}
  
  onToggleSideBar(data: SideBarToggle): void{
    this.screenWidth = data.screenWidth;
    this.isSideNavCollapsed = data.collapsed;
  }

  isCurrentRoute(route: string): boolean {
    return this.router.url.includes(route);
  }
}
