import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {MaterialComponentsModule} from './moduls/material-components.module';
import { MainComponent } from './components/main/main.component';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppRoutingModule} from './moduls/app-routing.module';
import { HomeComponent } from './components/home/home.component';
import { GameComponent } from './components/game/game.component';
import { AboutComponent } from './components/about/about.component';
import { AccessComponent } from './components/access/access.component';
import { LoginComponent } from './components/access/login/login.component';
import { RegisterComponent } from './components/access/register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    HomeComponent,
    GameComponent,
    AboutComponent,
    AccessComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialComponentsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
