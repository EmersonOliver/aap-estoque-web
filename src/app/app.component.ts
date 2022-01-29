import { Component } from '@angular/core';
import { UsuarioService } from './usuario/usuario.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app-estoque-web';

  constructor(private usuarioService : UsuarioService){
    if(!this.usuarioService.isLogged()){
      this.usuarioService.logout();
    }
  }
 
}
