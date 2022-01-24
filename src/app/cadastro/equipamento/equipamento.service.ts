import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CONTEXT_EQUIPAMENTO } from 'src/app/app.api';
import { ErrorHandler } from 'src/app/app.error-handler';
import { Token } from 'src/app/usuario/login/criar-conta/models/token.model';
import { EstoqueDTO } from './models/estoque.dto.model';

@Injectable({
  providedIn: 'root'
})
export class EquipamentoService {

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

cadastrarEntrada(estoque:EstoqueDTO):Observable<any>{
  return this.http.post<any>(`${CONTEXT_EQUIPAMENTO}/cadastrar`, estoque, this.options).pipe(
    catchError(ErrorHandler.handlerError)
  );

}

}


