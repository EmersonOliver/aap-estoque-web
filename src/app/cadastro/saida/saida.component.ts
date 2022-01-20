import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-saida',
  templateUrl: './saida.component.html',
  styleUrls: ['./saida.component.css']
})
export class SaidaComponent implements OnInit {
 

 



  equipamentos = [
    {
      id:1,
      equipamento:'Notebook'
    },
    {
      id:2,
      equipamento:'Computador'
    },
    {
      id:3,
      equipamento:'Switch'
    },
    {
      id:4,
      equipamento:'Mouse'
    }
  ];


  
  ngAfterViewInit(): void { }

  constructor() { }

  ngOnInit() {
  }

}
