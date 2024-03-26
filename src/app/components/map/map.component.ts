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
  //   const customIcon = Leaflet.icon({
  //     iconUrl: '/assets/icons/markers/marker-00.svg', // Reemplaza 'URL_DE_TU_ICONO' con la URL de tu icono personalizado
  //     iconSize: [41, 31], // Tamaño de tu icono
  //     iconAnchor: [15, 38], // Punto de anclaje de tu icono
  //   });
    this.locationService.getListLocations().subscribe(locations => {
      locations.forEach(location => {
        const customIcon = this.getCustomIcon(location.category); // Obtener el icono según la categoría
        this.layers.push(
          Leaflet.marker([location.latitude, location.longitude], { icon: customIcon })
            .bindPopup(`<b>${location.name}</b><br>${location.description}`)
            );
          });
        });
      }

      getCustomIcon(category: number): Leaflet.Icon {
        let iconUrl = '';
        // Define los diferentes iconos para cada categoría
        switch (category) {
          case 1:
            iconUrl = '/assets/icons/markers/marker-futbol.svg';
            break;
          case 2:
            iconUrl = '/assets/icons/markers/marker-volleyball.svg';
            break;
            
          case 3:
            iconUrl = '/assets/icons/markers/marker-beisboll.svg';
            break;
            
          case 4:
            iconUrl = '/assets/icons/markers/marker-baloncesto.svg';
            break;
            
          case 5:
            iconUrl = '/assets/icons/markers/marker-boliche.svg';
            break;
            
          case 6:
            iconUrl = '/assets/icons/markers/marker-caminata.svg';
            break;
            
          case 7:
            iconUrl = '/assets/icons/markers/marker-ciclismo.svg';
            break;
            
          case 8:
            iconUrl = '/assets/icons/markers/marker-Correr.svg';
            break;
            
          case 9:
            iconUrl = '/assets/icons/markers/marker-gimnasio.svg';
            break;
          case 10:
            iconUrl = '/assets/icons/markers/marker-golf.svg';
            break;
          case 11:
            iconUrl = '/assets/icons/markers/marker-natacion.svg';
            break;
          case 12:
            iconUrl = '/assets/icons/markers/marker-tennis.svg';
            break;
            
          // Añade más casos según las categorías que tengas
          default:
            iconUrl = '/assets/icons/markers/marker-00.svg'; // Icono por defecto
        }
        // Retorna el icono personalizado
        return Leaflet.icon({
          iconUrl: iconUrl,
          iconSize: [41, 31],
          iconAnchor: [15, 38]
        });
    }
    }
