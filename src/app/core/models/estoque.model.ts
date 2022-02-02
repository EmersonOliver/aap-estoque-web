import { EquipamentoComponent } from "src/app/cadastro/equipamento/equipamento.component";
import { EquipamentoModel } from "./equipamento.model";

export interface EstoqueModel {
    idEstoque:number;
    dataEntrada:Date;
    dataSaida:Date;
    statusEstoque:number;
    equipamentos:EquipamentoModel[];
}