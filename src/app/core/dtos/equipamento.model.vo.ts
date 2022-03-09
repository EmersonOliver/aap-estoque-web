import { EstoqueModel } from "../models/estoque.model";

export interface EquipamentoVO {

    idEquipamento: number;
    nomeEquipamento: string;
    nomeFabricante: string;
    nomeDepartamento: string;
    numeroSerie: string;
    patrimonio: string;
    modelo: string;
    cor: string;
    statusEquipamento: string;
    estoque:EstoqueModel;
}