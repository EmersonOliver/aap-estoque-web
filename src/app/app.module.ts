import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxMaskModule, IConfig } from 'ngx-mask'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './usuario/login/login.component';
import { EsqueciMinhaSenhaComponent } from './usuario/login/esqueci-minha-senha/esqueci-minha-senha.component';
import { CriarContaComponent } from './usuario/login/criar-conta/criar-conta.component';
import { UsuarioService } from './usuario/usuario.service';
import { EquipamentoComponent } from './cadastro/equipamento/equipamento.component';
import { EntradaComponent } from './cadastro/entrada/entrada.component';
import { SaidaComponent } from './cadastro/saida/saida.component';
import { CadastroComponent } from './cadastro/cadastro.component';
import { NgxSpinnerModule } from "ngx-spinner";
import { EquipamentoService } from './cadastro/equipamento/equipamento.service';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    HomeComponent,
    HeaderComponent,
    LoginComponent,
    EsqueciMinhaSenhaComponent,
    CriarContaComponent,
    EquipamentoComponent,
    EntradaComponent,
    SaidaComponent,
    CadastroComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    NgxMaskModule.forRoot(),
    NgxSpinnerModule
  ],
  providers: [
  UsuarioService,
  EquipamentoService
  
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
