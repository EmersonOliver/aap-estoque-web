import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CONTEXT_DASHBOARD } from '../app.api';
import { ErrorHandler } from '../app.error-handler';
import { Token } from '../usuario/login/criar-conta/models/token.model';
import { Dashboard } from './models/dashboard.model';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  options = { headers: new HttpHeaders() };
  token = {} as Token;
  headers = new HttpHeaders({
    'Content-Type': 'application/json; charset=UTF-8'
});

  constructor(private http:HttpClient) { 

    let token:Token = JSON.parse(localStorage.getItem('usuario-estoque'));
    if(token!=null){
      this.setToken(token);
    }

  }

  setToken(token: Token) {
    this.token = token;
    let httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache',
      'Authorization': this.token.type + ' ' + this.token.token
    });
    this.options = {
      headers: httpHeaders
    };
  }

  dashboard():Observable<any>{
    return this.http.get<Dashboard>(`${CONTEXT_DASHBOARD}`, this.options).pipe(
      catchError(ErrorHandler.handlerError)
    );

  }
}
