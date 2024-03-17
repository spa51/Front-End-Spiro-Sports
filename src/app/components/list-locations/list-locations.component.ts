import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit} from '@angular/core';
import { Location } from '../../interfaces/location';
import { RouterLink } from '@angular/router';
import { LocationService } from '../../services/location.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-list-locations',
  standalone: true,
  imports: [NgIf,NgFor,RouterLink],
  templateUrl: './list-locations.component.html',
  styleUrl: './list-locations.component.css'
})
export class ListLocationsComponent implements OnInit{

  listLocations: Location[] =[]

  constructor(private _locationService: LocationService, private toastr: ToastrService ){

  }

  ngOnInit(): void {
    this.getListLocations();
  }

  getListLocations(){
    this._locationService.getListLocations().subscribe((data: Location[]) => {
      this.listLocations = data;
      console.log(data); 
    })
  }

  deleteLocation(id:number){
    this._locationService.deleteLocation(id).subscribe(()=>{
      this.getListLocations();
      this.toastr.warning('La Localizacion fue eliminada','Eliminada!');
    })
  }

}
