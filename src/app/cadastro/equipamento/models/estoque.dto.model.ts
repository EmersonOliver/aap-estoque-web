import { EquipamentoDTO } from "./equipamento.dto.model";

export interface EstoqueDTO {

    dataEntradaEstoque:string;
    dataSaidaEstoque:string;
    equipamento:EquipamentoDTO;

}