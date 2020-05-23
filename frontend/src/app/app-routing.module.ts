import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent, LoginComponent} from './_components/auth/index';
import { HomeComponent } from './_components/home/home.component';
import { AuthGuard } from './_guards/auth.guard';
const routes: Routes = [
   { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
   
    { path: 'home', component: HomeComponent, canActivate: [AuthGuard]  },
    { path: '**', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

