import { UsuarioModel } from "src/app/usuario/model/usuario.model";
import { EquipamentoModel } from "./equipamento.model";

export interface SaidaEstoque {

    idSaidaEstoque: number;
    idUsuario: number;
    idEquipamento: number;
    dtSaida: Date;
    observacao: string;
    equipamento: EquipamentoModel;
    usuario: UsuarioModel;
}