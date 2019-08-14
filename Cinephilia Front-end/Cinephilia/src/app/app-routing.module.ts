import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './components/home-page/home-page.component';
import { SignupComponent } from './components/home-page/signup/signup.component';
import { HomeMainComponent } from './components/home-page/home-main/home-main.component';
import { LoginComponent } from './components/home-page/login/login.component';
import { PlatformComponent } from './components/platform/platform.component';
import { MoviesComponent } from './components/platform/movies/movies.component';
import { SeriesComponent } from './components/platform/series/series.component';
import { CelebritiesComponent } from './components/platform/celebrities/celebrities.component';
import { RoleGuardService } from './services/role-guard.service';

const routes: Routes = [
 { path: '', redirectTo: '/cinephilia', pathMatch: 'full' } ,
  { path: 'cinephilia', component: HomePageComponent ,children:[

    { path: 'signup', component: SignupComponent},
    { path: 'login', component: LoginComponent },
     { path: '', component: HomeMainComponent } 
  ]

},

{ path: 'platform', component: PlatformComponent , 
canActivate: [RoleGuardService] , data: { 
  expectedRole: ['user','admin']
} 
,children:[

  { path: 'movies', component: MoviesComponent },
  { path: 'series', component: SeriesComponent  },
  { path: 'celebrities', component: CelebritiesComponent }
]

} ,

{ path: '**', redirectTo: [RoleGuardService]? '/platform/movies' : '/ciniphelia'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
