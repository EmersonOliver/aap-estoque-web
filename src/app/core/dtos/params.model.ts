import { DepartamentoModel } from "../models/departamento.model";
import { FabricanteModel } from "../models/fabricante.model";

export interface Params{
    departamentos:DepartamentoModel[];
    fabricantes:FabricanteModel[];
}