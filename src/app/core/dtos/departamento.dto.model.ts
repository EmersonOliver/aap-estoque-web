import { CidadeDTO } from "./cidade.dto.model";

export interface DepartamentoDTO {
    nomeDepartamento:string;
    cidade:CidadeDTO;
}