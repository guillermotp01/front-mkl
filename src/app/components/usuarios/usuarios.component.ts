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
  currentPage: number = 0;
  pageSize: number = 6; 
  isNavCollapsed = true;

  constructor(private usuarioService: UsuariosService) {
  
  }

  ngOnInit(): void {
    this.list();
    this.formUsuario = new FormGroup({
      id: new FormControl(''),
      nombre: new FormControl(''),
      apellido: new FormControl(''),
      email: new FormControl(''),
      telefono: new FormControl(''),
      password: new FormControl(''),
    });
  }


  list() {
    this.usuarioService.getUsuarios(this.currentPage, this.pageSize).subscribe(resp => {
      if (resp) {
        this.listUsuarios = resp.content;
      }
    });
  }
  

  update() {
    const userId = this.formUsuario.value.id;
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
    this.formUsuario.controls['id'].setValue(item.id);
    this.formUsuario.controls['nombre'].setValue(item.nombre);
    this.formUsuario.controls['apellido'].setValue(item.apellido);
    this.formUsuario.controls['email'].setValue(item.email);
    this.formUsuario.controls['telefono'].setValue(item.telefono);
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

  onPageChange(page: number) {
    this.currentPage = page;
    this.list();
  }


  onNavToggled(isCollapsed: boolean) {
    this.isNavCollapsed = isCollapsed;
  }
}
