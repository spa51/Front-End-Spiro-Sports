import { Component } from '@angular/core';
import * as  Leaflet from 'leaflet';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';

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
  layers = [
    Leaflet.marker([ 6.247980096310698, -75.57650510205677]).on('click', this.MapMarkerClick).bindPopup('<div class="custom-popup">Texto a mostrar <br> Hola</br></div>', {
      className: 'custom-popup',
      minWidth: 200, // Ancho mínimo del popup
      maxWidth: 400, // Ancho máximo del popup
      maxHeight: 200, // Altura máxima del popup
      autoPan: true, // Desplazar automáticamente el mapa para mostrar el popup
      closeButton: true, // Mostrar botón de cierre en el popup
      closeOnClick: true // Cerrar el popup al hacer clic fuera de él
    })
  ];
MapMarkerClick(event: any){
  ('Hola soy un marcador');
}

}
