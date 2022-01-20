import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../usuario/usuario.service';

declare var $ :any;

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(public usuarioService:UsuarioService) { }

  ngOnInit() {
  }
  sidebarToggle() {
    $("body").toggleClass("sidebar-toggled");
    $(".sidebar").toggleClass("toggled");
    if ($(".sidebar").hasClass("toggled")) {
      $('.sidebar .collapse').collapse('hide');
    };
  }
}
