import { Component } from '@angular/core';
import * as  Leaflet from 'leaflet';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { LocationService } from '../../services/location.service';

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

  constructor(private locationService: LocationService){

  }

  ngOnInit():void{
    const customIcon = Leaflet.icon({
      iconUrl: '/assets/icons/markers/marker-00.svg', // Reemplaza 'URL_DE_TU_ICONO' con la URL de tu icono personalizado
      iconSize: [41, 31], // Tamaño de tu icono
      iconAnchor: [15, 38], // Punto de anclaje de tu icono
    });
    this.locationService.getListLocations().subscribe(locations => {
      locations.forEach(location => {
        // Use the custom icon when creating markers
        this.layers.push(
          Leaflet.marker([location.latitude, location.longitude], { icon: customIcon })
            .bindPopup(`<b>${location.name}</b><br>${location.description}`)
            );
          });
        });
      }
    }
