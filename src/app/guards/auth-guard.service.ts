import { Injectable } from '@angular/core';
import { Router, CanActivate, CanLoad, Route, UrlSegment } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService  implements CanActivate, CanLoad{

  constructor(public usuarioService: UsuarioService, public router: Router) { }


  canActivate(): boolean {
    return this.verificarAcesso();
  }
  verificarAcesso(){
    if(!this.usuarioService.isLogged()){
      this.usuarioService.logout();
      this.router.navigate(['']);
      return false;
    }
    return true;
  }
  canLoad(route: Route): boolean | Observable<boolean> | Promise<boolean> {
    return this.verificarAcesso();
  }
}
