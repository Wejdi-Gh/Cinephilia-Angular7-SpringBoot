import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { HomeNavbarComponent } from './components/home-page/home-navbar/home-navbar.component';
import { HomeMainComponent } from './components/home-page/home-main/home-main.component';
import { HomeFooterComponent } from './components/home-page/home-footer/home-footer.component';
import { SignupComponent } from './components/home-page/signup/signup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './components/home-page/login/login.component';
import { CarouselComponent } from './components/home-page/carousel/carousel.component';
import { PlatformComponent } from './components/platform/platform.component';
import { PlatformNavbarComponent } from './components/platform/platform-navbar/platform-navbar.component';
import { MoviesComponent } from './components/platform/movies/movies.component';
import { SeriesComponent } from './components/platform/series/series.component';
import { CelebritiesComponent } from './components/platform/celebrities/celebrities.component';
import { FilterPipePipe } from './pipes/filter-pipe.pipe';
import { CommonModule } from '@angular/common';
import { SocialLoginModule, AuthServiceConfig } from "angularx-social-login";
import {  FacebookLoginProvider } from "angularx-social-login"; 
import { ToastrModule } from 'ngx-toastr';
import { InterceptorService } from './services/interceptor.service';
import { JwtModule } from '@auth0/angular-jwt';

let config = new AuthServiceConfig([
  
  {
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider("2110360519255731")
  }
]);

export function provideConfig() {
  return config;
}

export function tokenGetter() {
  return localStorage.getItem('access_token');
}
@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    HomeNavbarComponent,
    HomeMainComponent,
    HomeFooterComponent,
    SignupComponent,
    LoginComponent,
    CarouselComponent,
    PlatformComponent,
    PlatformNavbarComponent,
    MoviesComponent,
    SeriesComponent,
    CelebritiesComponent,
    FilterPipePipe,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    BrowserAnimationsModule,
    FormsModule, 
    ReactiveFormsModule,
    HttpClientModule ,
    CommonModule,
    ToastrModule.forRoot(),
    SocialLoginModule ,JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ['example.com'],
        blacklistedRoutes: ['example.com/examplebadroute/']
      }
    })

  
  ],
  providers: [ {
    provide: AuthServiceConfig,
    useFactory: provideConfig
  },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: InterceptorService,
    multi: true
  }
],
  bootstrap: [AppComponent]
})
export class AppModule { }
