import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ErrorHandler } from '../app.error-handler';
import { AccountAuthentication } from './model/login.model.dto';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  options = { headers: new HttpHeaders() };

  constructor(private httpClient:HttpClient) { }

  loginUsuario(account:AccountAuthentication):Observable<any>{
    return this.httpClient.post<any>('http://localhost:5000/auth', account).pipe(
      catchError(ErrorHandler.handlerError)
    );
  }
}
