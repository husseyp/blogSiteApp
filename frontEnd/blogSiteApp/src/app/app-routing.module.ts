import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login-auth/login/login.component';
import { RegisterComponent } from './components/login-auth/register/register.component';
import { BlogDataComponent } from './components/blog-data/blog-data.component';
import { authGuard } from './shared-guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent, canActivate : [authGuard] },
  { path: 'register', component: RegisterComponent, canActivate : [authGuard] },
  { path: 'blog-data', component: BlogDataComponent, canActivate : [authGuard] },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
