import { Component } from '@angular/core';
import * as  Leaflet from 'leaflet';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { LocationService } from '../../services/location.service';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../interfaces/category';
import { LeafletControlLayersConfig } from '@asymmetrik/ngx-leaflet';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [LeafletModule],
  templateUrl: './map.component.html',
  styleUrl: './map.component.css'
})
export class MapComponent {
  title = 'Front-End';
  map!: Leaflet.Map;
  baseLayers: Leaflet.Layer[] = [];// Define las capas base
  layersControl: LeafletControlLayersConfig;

  options = {
    zoom: 15,
    center: Leaflet.latLng(6.247980096310698, -75.57650510205677)
  };
  
  constructor(private locationService: LocationService, private categoryService: CategoryService) {
    const openStreetMapLayer = Leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: 'OpenStreetMap' });
    const googleMapsLayer = Leaflet.tileLayer('https://mt1.google.com/vt/lyrs=r&x={x}&y={y}&z={z}', { attribution: 'Google Maps' });
    const googleSatelliteLayer = Leaflet.tileLayer('http://www.google.cn/maps/vt?lyrs=s@189&gl=cn&x={x}&y={y}&z={z}', { attribution: 'Google Satellite' });
    const googleHybridLayer = Leaflet.tileLayer('https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}', { attribution: 'Google Hybrid' });

    this.baseLayers = [openStreetMapLayer, googleMapsLayer, googleSatelliteLayer, googleHybridLayer];

    this.layersControl = {
      baseLayers: {
        'OpenStreetMap': openStreetMapLayer,
        'Google Maps': googleMapsLayer,
        'Google Satellite': googleSatelliteLayer,
        'Google Hybrid': googleHybridLayer
      },
      overlays: {}
    };
  }
  

  ngOnInit(): void {
    this.locationService.getListLocations().subscribe(locations => {
      locations.forEach(location => {
        this.categoryService.getCategory(location.category).subscribe(category => {
          this.getCustomIcon(category).then(customIcon => {
            const marker = Leaflet.marker([location.latitude, location.longitude], { icon: customIcon })
              .bindPopup(`<b>${location.name}</b><br>${location.description}`);
            marker.addTo(this.map);
          });
        });
      });
    });
  }


  onMapReady(map: Leaflet.Map) {
    this.map = map;
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