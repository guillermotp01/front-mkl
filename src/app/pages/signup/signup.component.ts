import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../../service/usuarios.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  public submitted: boolean = false;

  public user = {
    nombre: '',
    apellido: '',
    email: '',
    username : '',
    password: '',
    telefono: ''
  }

  constructor(private userService: UsuariosService, private snack: MatSnackBar){
  
  }


  ngOnInit(): void {
    
  }

  formSubmit(){
    console.log(this.user);
    if(this.user.username == '' || this.user.username == null){
      Swal.fire('','Debe ingresar todos los datos', 'question');
      return;
    }

    this.userService.agregarUsuario(this.user).subscribe(
      (data) =>{
        console.log(data);
        Swal.fire('Usuario guardado', 'Usuario registrado correctamente', 'success');
        this.user = {
          nombre: '',
          apellido: '',
          email: '',
          username : '',
          password: '',
          telefono: ''
        };
      },(error) =>{
        console.log(error);
        Swal.fire('Usuario Denegado', 'Usuario no puede ser registrado', 'error');
      }
    )
  }
}
