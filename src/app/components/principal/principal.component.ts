import { Component } from '@angular/core';


@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrl: './principal.component.css'
})
export class PrincipalComponent {
  isNavCollapsed = true;

  onNavToggled(isCollapsed: boolean) {
    this.isNavCollapsed = isCollapsed;
  }
}
