import { MapComponent } from './components/map/map.component';
import { Routes } from '@angular/router';
import { ListLocationsComponent } from './components/list-locations/list-locations.component';
import { EditLocationsComponent } from './components/edit-locations/edit-locations.component';
import { ListCategoryComponent } from './components/list-category/list-category.component';
import { EditCategorysComponent } from './components/edit-categorys/edit-categorys.component';
import { LoginComponent } from './components/login/login.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { authGuard } from './utils/auth.guard';

export const routes: Routes = [
    {
        path: '', redirectTo: 'maps', pathMatch: 'full'
    },
    {
        path: 'login', component: LoginComponent
    },
    {
        path: 'signIn', component: SignInComponent
    },
    {
        path: 'lists', component: ListLocationsComponent, canActivate:[authGuard],data: { roles: ['admin'] }
    },
    {
        path: 'listscate', component: ListCategoryComponent, canActivate:[authGuard] ,data: { roles: ['admin'] }
    },
    {
        path: 'maps', component: MapComponent
    },
    {
        path: 'edit', component: EditLocationsComponent, canActivate:[authGuard],data: { roles: ['admin'] }
    },
    {
        path: 'edit/:id', component: EditLocationsComponent, canActivate:[authGuard],data: { roles: ['admin'] }
    },
    {
        path: 'editca', component: EditCategorysComponent, canActivate:[authGuard],data: { roles: ['admin'] }
    },
    {
        path: 'editca/:id', component: EditCategorysComponent, canActivate:[authGuard],data: { roles: ['admin'] }
    },
    { path: '**', redirectTo: 'maps', pathMatch: 'full' },

];
