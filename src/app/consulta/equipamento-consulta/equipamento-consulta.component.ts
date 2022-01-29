import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { EquipamentoVO } from '../models/equipamento.model.vo';
import { Params } from '../models/params.model';
import { EquipamentoConsultaService } from './equipamento-consulta.service';

@Component({
  selector: 'app-equipamento-consulta',
  templateUrl: './equipamento-consulta.component.html',
  styleUrls: ['./equipamento-consulta.component.css']
})
export class EquipamentoConsultaComponent implements OnInit {

  params = {} as Params;
  listaStatus = [
    {
      value: 1,
      texto: 'Funcionando'
    },
    {
      value: 2,
      texto: 'Danificado'
    },
    {
      value: 3,
      texto: 'Em manutenção'
    }
  ];

  equipamentos = [];
  buscarForm: FormGroup;

  dropdownListStatus = [];
  dropdownStatus = {};
  constructor(public consultaService: EquipamentoConsultaService, private spinner:NgxSpinnerService) { }

  ngOnInit() {
    this.consultaService.carregarParams().subscribe(
      res => {
        this.params = res;
      }
    ), error => {
      console.log(error)
    }

    this.dropdownStatus = {
      singleSelection: false,
      textField: 'texto',
      idField: 'value',
      selectAllText: 'Todos',
      unSelectAllText: 'Remover todos',
      noDataAvailablePlaceholderText: 'Nenhum Status Encontrado',
      itemsShowLimit: 5,
      allowSearchFilter: true
    };

    this.buscarForm = new FormGroup({
      nome: new FormControl(null),
      departamento: new FormControl(null),
      fabricante: new FormControl(null),
      status: new FormControl(null)
    });

    this.dropdownListStatus = this.listaStatus;
  }

  pesquisar() {

    this.spinner.show();
    let formulario = this.buscarForm.value;

    this.consultaService.pesquisarEquipamento(
      formulario.nome,
      formulario.status,
      formulario.fabricante, formulario.departamento, 1, 'idEquipamento', 'desc').subscribe(
        res => {
          this.equipamentos = res.body
          console.log(this.equipamentos);
          this.spinner.hide();
        }
      );
  }


}
