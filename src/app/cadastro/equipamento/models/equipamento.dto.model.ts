import { DepartamentoDTO } from "./departamento.dto.model";
import { FabricanteDTO } from "./fabricante.dto.model";

export interface EquipamentoDTO {

    nome: string;
    numeroSerie: string;
    patrimonio: string;
    modelo: string;
    cor: string;
    statusEquipamento: number;
    fabricante: FabricanteDTO;
    departamento: DepartamentoDTO;
}