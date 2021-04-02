import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@auth0/auth0-angular';
import { AboutPageComponent } from './components/about-page/about-page.component';
import { AddPilotComponent } from './components/add-pilot/add-pilot.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { GetPilotsComponent } from './components/get-pilots/get-pilots.component';
import { HomeComponent } from './components/home/home.component';
import { ScriptComponent } from './components/script/script.component';
import { SceneComponent } from './components/scene/scene.component';
import { UserInfoComponent } from './components/user-info/user-info.component';
import { PilotDetailsComponent } from './components/pilot-details/pilot-details.component';

const routes: Routes = [
    {
    path: 'about',
    component: AboutPageComponent,
    },
    {
    path: '',
    component: HomeComponent,
    },
    {
    path: 'get-pilots',
    component: GetPilotsComponent,
    },
    {
    path: 'add-pilot',
    component: AddPilotComponent,
    },
    {
    path:'pilot-details',
    component: PilotDetailsComponent,
    },
    {
    path: 'user-info',
    component: UserInfoComponent,
    canActivate: [AuthGuard]
    },
    {path: 'user-info/edit-user',
    component: EditUserComponent,
    canActivate: [AuthGuard]
    },
    {
    path: 'script',
    component: ScriptComponent
  }, {
        path: 'scene',
  component: SceneComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
