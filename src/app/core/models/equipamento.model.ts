import { DepartamentoModel } from "./departamento.model";
import { EstoqueModel } from "./estoque.model";
import { FabricanteModel } from "./fabricante.model";

export interface EquipamentoModel {
idEquipamento:number;
idFabricante:number;
idEstoque:number;
idDepartamento:number;
nome:string;
numeroSerie:string;
patrimonio:string;
modelo:string;
cor:string;
statusEquipamento:number;
departamento:DepartamentoModel;
fabricante:FabricanteModel;
estoque:EstoqueModel;

}