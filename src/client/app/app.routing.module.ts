import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { InfoComponent } from './info/info.component';

const appRoute: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'info', component: InfoComponent },
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: '**', component: PagenotfoundComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(appRoute)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
