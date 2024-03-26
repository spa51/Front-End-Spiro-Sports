import { Component } from '@angular/core';
import * as  Leaflet from 'leaflet';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { LocationService } from '../../services/location.service';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../interfaces/category';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [LeafletModule],
  templateUrl: './map.component.html',
  styleUrl: './map.component.css'
})
export class MapComponent {
  title = 'Front-End';
  options = {
    layers: [
      Leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' })
    ],

    zoom: 15,
    center: Leaflet.latLng(6.247980096310698, -75.57650510205677)
  };
  layers:Leaflet.Layer[] = [];

  constructor(private locationService: LocationService, private categoryService: CategoryService){

  }

  ngOnInit(): void{
    this.locationService.getListLocations().subscribe(locations => {
      locations.forEach(location => {
        this.categoryService.getCategory(location.category).subscribe(category => {
          this.getCustomIcon(category).then(customIcon => {
            this.layers.push(
              Leaflet.marker([location.latitude, location.longitude], { icon: customIcon })
                .bindPopup(`<b>${location.name}</b><br>${location.description}`)
            );
          });
        });
      });
    });
  }

    async getCustomIcon(category: Category): Promise<Leaflet.Icon> {
      if (category && category.iconUrl) {
        return Leaflet.icon({
          iconUrl: category.iconUrl,
          iconSize: [41, 31],
          iconAnchor: [15, 38]
        });
      } else {
        return Leaflet.icon({
          iconUrl: '/assets/icons/markers/default-marker.svg',
          iconSize: [41, 31],
          iconAnchor: [15, 38]
        });
      }
    }
  }
