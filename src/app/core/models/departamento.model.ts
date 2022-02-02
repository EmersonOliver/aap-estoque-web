import { CidadeModel } from "./cidade.model";

export interface DepartamentoModel{
    idDepartamento:number;
    idCidade:number;
    nomeDepartamento:string;
    cidade:CidadeModel;
}