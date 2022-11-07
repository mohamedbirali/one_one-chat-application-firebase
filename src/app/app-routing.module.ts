import { PaginationSpinnerComponent } from './components/pagination-spinner/pagination-spinner.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { NotFound404Component } from './components/not-found404/not-found404.component';
import { RegisterComponent } from './components/register/register.component';
import { canActivate, redirectLoggedInTo, redirectUnauthorizedTo } from '@angular/fire/auth-guard'
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { ProfileComponent } from './components/profile/profile.component';
import { getAuth } from '@angular/fire/auth';

const redirectToLogin = () => redirectUnauthorizedTo('login');
const redirectToHome = () => redirectLoggedInTo('home');

const routes: Routes = [
  { path: '',
    pathMatch: 'full',
    component: LandingPageComponent, //
  },
  { path: 'home',
    component: HomeComponent, // chat
    ...canActivate(redirectToLogin),
  },
  { path: 'profile',
    component: ProfileComponent,
    ...canActivate(redirectToLogin),
  },
  { path:'login',
    component: LoginComponent,
    ...canActivate(redirectToHome),
  },
  { path:'register',
    component: RegisterComponent,
    ...canActivate(redirectToHome),
  },
  { path:'forget-password',
    component:  ForgetPasswordComponent,
    ...canActivate(redirectToHome),
  },
  { path:'testScroll',
    component:  PaginationSpinnerComponent,
    // ...canActivate(redirectToHome),
  },
  { path:'**',
    component: NotFound404Component
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
