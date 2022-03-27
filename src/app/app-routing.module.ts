import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DonateComponent } from './donate/donate.component';
import { FundraiserComponent } from './fundraiser/fundraiser.component';
import { FundraisingComponent } from './fundraising/fundraising.component';
import { AuthGuard } from './guards/auth.guard';
import { HomeComponent } from './home/home.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'signin',
    component: SigninComponent
  },
  {
    path: 'signup',
    component: SignupComponent
  },
  {
    path: 'fundraising/:id',
    component: FundraisingComponent
  },
  {
    path: 'fundraiser',
    component: FundraiserComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'donate/:id',
    component: DonateComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
