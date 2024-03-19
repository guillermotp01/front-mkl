import { Component, EventEmitter, HostListener, OnInit, Output } from '@angular/core';
import { LoginService } from '../../service/login.service';
import { Router } from '@angular/router';;

interface SideBarToggle {
  screenWidth: number;
  collapsed: boolean;
}

@Component({
  selector: 'app-navegacion',
  templateUrl: './navegacion.component.html',
  styleUrl: './navegacion.component.css'
})
export class NavegacionComponent implements OnInit {

  constructor(public loginService: LoginService, private router: Router){
  
  }

  public logout(){
    this.loginService.logout();
    this.router.navigate(['/login']);
  }

  @Output() navToggled = new EventEmitter<boolean>();
  isNavCollapsed = true;

  toggleNav() {
    this.isNavCollapsed = !this.isNavCollapsed;
    this.navToggled.emit(this.isNavCollapsed);
  }

  ngOnInit(): void {
  }
}
