import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit} from '@angular/core';
import { Location } from '../../interfaces/location';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-list-locations',
  standalone: true,
  imports: [NgIf,NgFor,RouterLink],
  templateUrl: './list-locations.component.html',
  styleUrl: './list-locations.component.css'
})
export class ListLocationsComponent implements OnInit{

  listLocations: Location[] =[
    {id: 1, name: 'msadsa', description: 'jjjjk', address: '122', category: 2, latitude:12, longitude:10},
    {id: 2, name: 'msadsa', description: 'jjjjk', address: '122', category: 2, latitude:12, longitude:1}
  ]

  ngOnInit(): void {
    
  }

}
