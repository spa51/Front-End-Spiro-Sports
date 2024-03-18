import { MapComponent } from './components/map/map.component';
import { Routes } from '@angular/router';
import { ListLocationsComponent } from './components/list-locations/list-locations.component';
import { EditLocationsComponent } from './components/edit-locations/edit-locations.component';
import { ListCategoryComponent } from './components/list-category/list-category.component';
import { EditCategorysComponent } from './components/edit-categorys/edit-categorys.component';

export const routes: Routes = [
    {
        path: 'lists', component: ListLocationsComponent
    },
    {
        path: 'listscate', component: ListCategoryComponent
    },
    {
        path: 'maps', component: MapComponent
    },
    {
        path: 'edit', component: EditLocationsComponent
    },
    {
        path: 'edit/:id', component: EditLocationsComponent
    },
    {
        path: 'editca', component: EditCategorysComponent
    },
    {
        path: 'editca/:id', component: EditCategorysComponent
    },
    { path: '**', redirectTo: '', pathMatch: 'full' },

];
