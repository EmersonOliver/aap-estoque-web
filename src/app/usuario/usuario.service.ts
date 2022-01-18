import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { runInThisContext } from 'vm';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private httpClient:HttpClient) { }

  loginUsuario(email:string, password:string):Observable<any>{
    return this.httpClient.post<any>('http://localhost:5000/auth', {email:email, password:password});
  }
}
