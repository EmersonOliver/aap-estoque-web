import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { EquipamentoConsultaService } from 'src/app/consulta/equipamento-consulta/equipamento-consulta.service';
import { Params } from 'src/app/core/dtos/params.model';

declare var $ : any;

@Component({
  selector: 'app-saida',
  templateUrl: './saida.component.html',
  styleUrls: ['./saida.component.css']
})
export class SaidaComponent implements OnInit {
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


  params = {} as Params;

  sucesso: boolean = false;
  erro: boolean = false;
  messageError = '';
  dropdownListStatus = [];
  dropdownStatus = {};

  saidaForm: FormGroup;

  ngAfterViewInit(): void { }

  constructor(public consultaService: EquipamentoConsultaService, 
    private spinner:NgxSpinnerService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.inicialiarForm();
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
    this.dropdownListStatus = this.listaStatus;
  }

  inicialiarForm(){

    this.saidaForm = new FormGroup({
      departamento: new FormControl(null),
      fabricante: new FormControl(null),
      status: new FormControl(null)
    });

  }



}
