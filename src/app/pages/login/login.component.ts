import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { LoginService } from '../../service/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {


  loginData = {
    "username": '',
    "password": ''
  }

  constructor(private loginService: LoginService,private router: Router) { }

  ngOnInit(): void {
  
  }


  formSubmit(){
    if(this.loginData.username.trim() == '' || this.loginData.username.trim() == null){
      Swal.fire('','Debe ingresar un nombre de usuario', 'question');
      return;
    }

    if(this.loginData.password.trim() == '' || this.loginData.password.trim() == null){
      Swal.fire('','Debe ingresar una contraseña', 'question');
      return;
    }

    this.loginService.generarToken(this.loginData).subscribe(
      (data: any) => {
        console.log(data);
        console.log(data.token);
        this.loginService.loginUser(data.token);
        this.loginService.getCurrentUser().subscribe((user: any) => {
          this.loginService.setUser(user);
          console.log(user);

          if(this.loginService.getUserRole() == "ADMIN"){
            //dashboard
            this.router.navigate(['/dashboard']);
            this.loginService.loginStatusSubjec.next(true);
          }
          else if(this.loginService.getUserRole() == "NORMAL"){
            this.router.navigate(['/dashboard']);
            this.loginService.loginStatusSubjec.next(true);
          }
          else{
            this.loginService.logout();
          }
        })
      }, (error) => {
        console.log(error);
        Swal.fire('Detalles invalidaos', 'Vuelva a Intentarlo', 'error');
      }
    )
  }
}
