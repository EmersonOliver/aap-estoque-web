import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AccountAuthentication } from '../model/login.model.dto';
import { UsuarioService } from '../usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuarioForm: FormGroup
  messageError = '';
  erro = false;
  constructor(
    private usuarioService: UsuarioService, 
    public spinner:NgxSpinnerService, private router:Router) {

      if(this.usuarioService.isLogged()){
        this.router.navigate(['/home']);
      }else{
        this.usuarioForm = new FormGroup({
          email: new FormControl(null, [Validators.required]),
          password: new FormControl(null, [Validators.required])
        });
      }
     }

  ngOnInit() {
   
  }

  onSubmit() {
    this.spinner.show();
    this.erro = false;
    if (this.usuarioForm.invalid) {
      window.alert('Preencha os campos obrigatórios!');
      this.usuarioForm.get('email').value == null ? this.usuarioForm.get('email').markAsTouched() : null;
      this.usuarioForm.get('password').value == null ? this.usuarioForm.get('password').markAsTouched() : null;

    } else {
      let account: AccountAuthentication;
      account = this.usuarioForm.value;
      this.usuarioService.loginUsuario(account).subscribe(
        res => {
          this.spinner.hide();
          this.usuarioService.setUsuario(res);
          this.usuarioForm.reset();
          this.router.navigate(['/home']);
        },error=>{
          this.erro = true;
          this.spinner.hide();
          this.messageError = error;
        }
      );

    }
  }

}
