import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from '../components/home/home.component';
import {GameComponent} from '../components/game/game.component';
import {AboutComponent} from '../components/about/about.component';
import {AccessComponent} from '../components/access/access.component';
import {PlayComponent} from '../components/game/play/play.component';

const routes: Routes =
  [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'game',
        children:
          [
            { path: '', component: GameComponent },
            { path: 'play/:roomID', component: PlayComponent }
          ]
    },
    { path: 'about', component: AboutComponent },
    { path: 'access', component: AccessComponent }
  ]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
