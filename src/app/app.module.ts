import { NgModule } from '@angular/core';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { environment } from 'src/environments/environment.prod';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { NotFound404Component } from './components/not-found404/not-found404.component';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';
import { HomeComponent } from './components/home/home.component';
import { HotToastModule } from '@ngneat/hot-toast';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ProfileComponent } from './components/profile/profile.component';
import { TimestampToStringPipe } from './pipes/timestampToString/timestamp-to-string.pipe'
import { DatePipe } from '@angular/common';
import { AlgoliaComponent } from './components/algolia/algolia.component';
import { PaginationSpinnerComponent } from './components/pagination-spinner/pagination-spinner.component';
import { PaginationDirective } from './components/pagination-spinner/pagination.directive';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    NotFound404Component,
    ForgetPasswordComponent,
    HomeComponent,
    LandingPageComponent,
    NavbarComponent,
    ProfileComponent,
    TimestampToStringPipe,
    AlgoliaComponent,
    PaginationSpinnerComponent,
    PaginationDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    provideFirebaseApp(
      () => initializeApp(environment.firebaseConfig)
    ),
    provideAuth(() => getAuth()),
    provideStorage(() => getStorage()),
    provideFirestore(() => getFirestore()),
    HotToastModule.forRoot(),
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
