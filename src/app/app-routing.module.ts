import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CadastroComponent } from './cadastro/cadastro.component';
import { EquipamentoComponent } from './cadastro/equipamento/equipamento.component';
import { HomeComponent } from './home/home.component';
import { CriarContaComponent } from './usuario/login/criar-conta/criar-conta.component';
import { EsqueciMinhaSenhaComponent } from './usuario/login/esqueci-minha-senha/esqueci-minha-senha.component';
import { LoginComponent } from './usuario/login/login.component';
import { AuthGuardService as AuthGuard } from './guards/auth-guard.service';
import { EntradaComponent } from './cadastro/entrada/entrada.component';
import { SaidaComponent } from './cadastro/saida/saida.component';

const routes: Routes = [
{path:'', component:LoginComponent },
{path:'esqueci-minha-senha', component:EsqueciMinhaSenhaComponent},
{path:'criar-conta', component:CriarContaComponent},
{path:'home',canActivate: [AuthGuard], component:HomeComponent},
{path:'estoque', component:CadastroComponent, 
children:[
    {path:'', redirectTo:'equipamento', pathMatch:'full'},
    {path:'equipamento', component:EquipamentoComponent},
    {path:'entrada', component:EntradaComponent},
    {path:'saida',component:SaidaComponent}
]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
