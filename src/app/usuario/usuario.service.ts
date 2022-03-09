import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CONTEXT_API } from '../app.api';
import { ErrorHandler } from '../app.error-handler';
import { Token } from './login/criar-conta/models/token.model';
import { UsuarioDTO } from './login/criar-conta/models/usuario.dto.model';
import { AccountAuthentication } from './model/login.model.dto';
import { UsuarioModel } from './model/usuario.model';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  options = { headers: new HttpHeaders() };
  usuario = {} as UsuarioModel;
  token = {} as Token;
  messageEvent = new EventEmitter();
  navigateTo :string;
  constructor(private httpClient:HttpClient, private router:Router,private jwtHelper: JwtHelperService) { }
  
  loginUsuario(account:AccountAuthentication):Observable<any>{
    return this.httpClient.post<any>(`${CONTEXT_API}/auth`, account).pipe(
      catchError(ErrorHandler.handlerError)
    );
  }
  criarUsuario(usuario:UsuarioDTO):Observable<any>{
    return this.httpClient.post<any>(`${CONTEXT_API}/usuario/cadastrar`, usuario).pipe(
      catchError(ErrorHandler.handlerError)
    );
  }

  setToken(token:Token){
    this.token = token;
    localStorage.setItem('usuario-estoque', JSON.stringify(token));
    this.messageEvent.emit(token);
    let httpHeaders = new HttpHeaders({
      'Content-Type':'application/json',
      'Cache-Control':'no-cache',
      'Authorization': token.type + ' '+token.token
    });
    this.options = {
      headers:httpHeaders
    };
  }

  procurarUsuario(){
    let token:Token =  JSON.parse(localStorage.getItem('usuario-estoque'));
    if(token != null){
      this.token = token;
      let httpHeaders = new HttpHeaders({
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
        'Authorization': token.type + ' '+token.token
      });
      this.options = {
        headers: httpHeaders
      };
    }
  }

  isLogged(): boolean {
    const token:Token =  JSON.parse(localStorage.getItem('usuario-estoque'));
    return (token !== null && !this.jwtHelper.isTokenExpired(token.token));
  }

  logout(){
    this.token = null;
    // localStorage.clear();
    localStorage.removeItem('usuario-estoque')
    this.router.navigate(['']);
    this.messageEvent.emit(this.token);
  }

}
