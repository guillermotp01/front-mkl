import { Component, OnInit} from '@angular/core';
import { UsuariosModel } from '../../model/usuarios-model';
import { UsuariosService } from '../../service/usuarios.service';
import { FormControl, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.css'
})
export class UsuariosComponent implements OnInit {

  listUsuarios: UsuariosModel [] = [];
  showModalActualizarUsuario: boolean = false;
  showModalEliminarUsuario: boolean = false;
  idUsuarioEliminar: number = 0;
  formUsuario: FormGroup = new FormGroup({});

  constructor(private usuarioService: UsuariosService) {
  
  }

  ngOnInit(): void {
    this.list();
    this.formUsuario = new FormGroup({
      idUsuario: new FormControl(''),
      nombre: new FormControl(''),
      correo: new FormControl(''),
      password: new FormControl(''),
    });
  }

  list(){
    this.usuarioService.getUsuarios().subscribe(resp=>{
      if(resp){
        this.listUsuarios = resp;
      }
    });
  }

  save(){
    this.usuarioService.saveUsuarios(this.formUsuario.value).subscribe(resp => {
      if(resp){
        this.list();
        this.formUsuario.reset();
      }
    })
  }

  update() {
    const userId = this.formUsuario.value.idUsuario;
    this.usuarioService.updateUsuario(userId, this.formUsuario.value).subscribe(resp => {
        if (resp) {
          this.list();
          this.formUsuario.reset();
        }
      });
    this.showModalActualizarUsuario = false;
  }

  delete(){
    this.usuarioService.deleteUsuario(this.idUsuarioEliminar).subscribe(resp => {
      if(resp){
        this.list();
      }
    });
    this.showModalEliminarUsuario = false;
  }

  newUsuario(){
    this.formUsuario.reset();
  }

  modalActualizar(item: any){
    this.showModalActualizarUsuario = true;
    this.showModalEliminarUsuario = false;
    this.formUsuario.controls['idUsuario'].setValue(item.idUsuario);
    this.formUsuario.controls['nombre'].setValue(item.nombre);
    this.formUsuario.controls['correo'].setValue(item.correo);
    this.formUsuario.controls['password'].setValue(item.password);
  }

  modalEliminar(id: number) {
    this.idUsuarioEliminar = id;
    this.showModalEliminarUsuario = true;
    this.showModalActualizarUsuario = false;
  }

  cancelar(){
    this.showModalActualizarUsuario = false;
    this.showModalEliminarUsuario = false;
  }
}
