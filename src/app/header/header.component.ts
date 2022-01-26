import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { UsuarioService } from '../usuario/usuario.service';

declare var $ : any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public usuarioService:UsuarioService,
     private router:Router) { }

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
      window.location.reload();
  }

}
