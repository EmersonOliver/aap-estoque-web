import { Component, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppUtils } from 'src/app/AppUtils';
import { UsuarioModel } from '../../model/usuario.model';
import { UsuarioService } from '../../usuario.service';
import { UsuarioDTO } from './models/usuario.dto.model';
import { MustMatch } from './function/must-match.validator';
// import { MustMatch } from './function/must-match.validator';
declare var $: any;
@Component({
  selector: 'app-criar-conta',
  templateUrl: './criar-conta.component.html',
  styleUrls: ['./criar-conta.component.css']
})
export class CriarContaComponent implements OnInit {

  usuario = {} as UsuarioModel;
  usuarioDTO = {} as UsuarioDTO;
  usuarioForm: FormGroup;
  sucesso: boolean = false;
  erro: boolean = false;
  messageError = '';

 

  constructor(private usuarioService: UsuarioService, 
    private router: Router, 
    private fb: FormBuilder,
    private el: ElementRef, private renderer: Renderer2) { }

  ngOnInit() {
    this.usuarioForm = this.fb.group({
      nome: [null, Validators.required],
      sobrenome: [null, Validators.required],
      email: [null, Validators.required],
      senha: [null, Validators.required],
      repitaSenha: [null, Validators.required],
      telefone: [null, Validators.required],
    }, { validator: MustMatch('senha', 'repitaSenha') });
  }
  
  onSubmit() {
    if (this.usuarioForm.invalid) {
      window.alert('Preencha todos os campos para efetuar o cadastro.');
      AppUtils.validarForm(['nome', 'sobrenome', 'email', 'senha', 'repitaSenha'], this.usuarioForm);
      return;
    } else {
      this.usuarioDTO = this.usuarioForm.value;
      this.usuarioService.criarUsuario(this.usuarioDTO).subscribe(
        res => {
          this.sucesso = true;
          this.usuarioForm.reset();
          setTimeout(() => {
            this.router.navigate(['/']);
            this.sucesso = false;
          }, 5000);
        },
        error => {
          this.erro = true;
          this.messageError = error;
        }
      );
    }
  }
}
