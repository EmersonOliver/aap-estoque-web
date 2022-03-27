import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CONTEXT_API } from 'src/app/app.api';
import { ErrorHandler } from 'src/app/app.error-handler';
import { EquipamentoVO } from 'src/app/core/dtos/equipamento.model.vo';
import { Params } from 'src/app/core/dtos/params.model';
import { EquipamentoModel } from 'src/app/core/models/equipamento.model';
import { Token } from 'src/app/usuario/login/criar-conta/models/token.model';

@Injectable({
  providedIn: 'root'
})
export class EquipamentoConsultaService {

  options = { headers: new HttpHeaders() };
  token = {} as Token;
  headers = new HttpHeaders({
    'Content-Type': 'application/json; charset=UTF-8'
  });

  constructor(private http: HttpClient) {
    let token: Token = JSON.parse(localStorage.getItem('usuario-estoque'));
    if (token != null) {
      this.setToken(token);
    }
  }

  carregarParams(): Observable<any> {
    return this.http.get<Params>(`${CONTEXT_API}/parametros/listAll`, this.options).pipe(
      catchError(ErrorHandler.handlerError)
    );
  }

  pesquisarEquipamento(
    nome?:string, status=[], fabricante?:number, departamento?:number,
    pagina?: number, campo?: string, ordem?: string):Observable<HttpResponse<EquipamentoVO[]>> {
      let params = new HttpParams();
      params = params.append('pagina', (pagina-1).toString());
      params = params.append('campo', campo);
      params = params.append('ordem', ordem);
      
      if(status != null && status.length > 0){
        status.forEach(x=>{
          params = params.append('status', x.value.toString());
        });
       
      } if(nome != undefined && nome != null && nome !=''){
        params = params.append('nome', nome);
      } if(fabricante != null && fabricante != undefined){
        params = params.append('fabricante', fabricante.toString());
      }
      if(departamento != null && departamento != undefined){
        params = params.append('departamento', departamento.toString());
      }

      return this.http.get<any>(`${CONTEXT_API}/equipamento/consultar`, {observe: 'response', params, ...this.options}).pipe(
        catchError(ErrorHandler.handlerError)
      );
  }

  detalharEquipamento(idEquipamento:number):Observable<EquipamentoModel>{
    return this.http.get<any>(`${CONTEXT_API}/equipamento/detalhar/`+idEquipamento, this.options).pipe(
      catchError(ErrorHandler.handlerError)
    );
  }

  editarEquipamentoEstoque(req:any):Observable<any>{
    return this.http.put<any>(`${CONTEXT_API}/equipamento/editar`, req, this.options).pipe(
      catchError(ErrorHandler.handlerError)
    );
  }

  listaEquipamento():Observable<EquipamentoModel[]>{
    return this.http.get<any>(`${CONTEXT_API}/equipamento/listar`, this.options).pipe(
      catchError(ErrorHandler.handlerError)
    );
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
}
