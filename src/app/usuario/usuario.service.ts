import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CONTEXT_AUTH, CONTEXT_USUARIO } from '../app.api';
import { ErrorHandler } from '../app.error-handler';
import { AccountAuthentication } from './model/login.model.dto';
import { UsuarioModel } from './model/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  options = { headers: new HttpHeaders() };
  usuario = {} as UsuarioModel;
  

  constructor(private httpClient:HttpClient,private router:Router) { }

  loginUsuario(account:AccountAuthentication):Observable<any>{
    return this.httpClient.post<any>(`${CONTEXT_AUTH}`, account).pipe(
      catchError(ErrorHandler.handlerError)
    );
  }
  criarUsuario(usuario:UsuarioModel):Observable<any>{
    return this.httpClient.post<any>(`${CONTEXT_USUARIO}/cadastrar`, usuario).pipe(
      catchError(ErrorHandler.handlerError)
    );
  }
}
