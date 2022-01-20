import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../usuario/usuario.service';

declare var $ : any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public usuarioService:UsuarioService) { }

  ngOnInit() {
    this.usuarioService.procurarUsuario();
  }

  sidebarToggle() {
    $("body").toggleClass("sidebar-toggled");
    $(".sidebar").toggleClass("toggled");
    if ($(".sidebar").hasClass("toggled")) {
      $('.sidebar .collapse').collapse('hide');
    };
  }

  logout(){
    this.usuarioService.logout();
  }

}
