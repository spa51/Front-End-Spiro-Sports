import { MapComponent } from './components/map/map.component';
import { Routes } from '@angular/router';
import { ListLocationsComponent } from './components/list-locations/list-locations.component';
import { EditLocationsComponent } from './components/edit-locations/edit-locations.component';

export const routes: Routes = [
    {
        path: 'lists', component: ListLocationsComponent
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
    { path: '**', redirectTo: '', pathMatch: 'full' },

];
