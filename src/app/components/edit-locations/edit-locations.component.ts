import { Location } from './../../interfaces/location';
import { getLocation } from './../../../../../Back-End/src/controllers/location';
import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { LocationService } from '../../services/location.service';
import { ToastrService } from 'ngx-toastr';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import * as  Leaflet from 'leaflet';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../interfaces/category';

@Component({
    selector: 'app-edit-locations',
    standalone: true,
    templateUrl: './edit-locations.component.html',
    styleUrl: './edit-locations.component.css',
    imports: [RouterLink, ReactiveFormsModule, NgIf,LeafletModule, NgFor]
})
export class EditLocationsComponent implements OnInit {
  formLocations: FormGroup;
  id: number;
  operacion: string = 'Agregar';
  title = 'SelectorMap';
  map: Leaflet.Map | undefined;
  marker: Leaflet.Marker | undefined;
  options = {
    layers: [
      Leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' })
    ],
    zoom: 15,
    center: Leaflet.latLng(6.247980096310698, -75.57650510205677)
  };

  constructor(private fb: FormBuilder, 
    private _locationService: LocationService,
    private _categoryService: CategoryService,
    private router:Router,
    private toastr: ToastrService,
    private aRouter: ActivatedRoute){
    this.formLocations = this.fb.group({
      name: ['', Validators.required],
      description: ['',Validators.required],
      address: ['',Validators.required],
      category: ['',Validators.required],
      latitude: [null,Validators.required],
      longitude: [null,Validators.required],
  })
    this.id =Number(aRouter.snapshot.paramMap.get('id'));

  }

  guardarCoordenadas() {
    if (this.marker) {
        const latLng = this.marker.getLatLng();
        const lat = latLng.lat;
        const lng = latLng.lng;

        // Actualizar los valores en el formulario
        this.formLocations.patchValue({
            latitude: lat,
            longitude: lng
        });

    }
}
  
  onMapReady(map: Leaflet.Map) {
    this.map = map;
    this.map.on('click', this.onMapClick.bind(this));
  }

  onMapClick(event: Leaflet.LeafletMouseEvent) {
    const lat = event.latlng.lat;
    const lng = event.latlng.lng;
    // console.log('Coordenadas:', lat, lng);
    const customIcon = Leaflet.icon({
      iconUrl: '/assets/icons/markers/marker-01.svg', // Reemplaza 'URL_DE_TU_ICONO' con la URL de tu icono personalizado
      iconSize: [41, 31], // Tamaño de tu icono
      iconAnchor: [15, 38], // Punto de anclaje de tu icono
    });

    // Agregar un marcador en la posición donde se hizo click
    if (this.map) {
      if (this.marker) {
        this.map.removeLayer(this.marker);
      }
      this.marker = Leaflet.marker([lat, lng],{icon:customIcon}).addTo(this.map);
    }
  }
  categories: Category[] = [];
  ngOnInit(): void {

    if (this.id != 0) {
      // Es editar
      this.operacion = 'Editar';
      this.getLocation(this.id);
    }
    this.getCategories();
  }
  getCategories() {
    this._categoryService.getListCategories().subscribe((categories: Category[]) => {
      this.categories = categories; // Asigna la lista de categorías al arreglo del componente
    });
  }

  getLocation(id: number){
    this._locationService.getLocation(id).subscribe((data:Location) =>{
      // console.log(data)
      this.formLocations.setValue({
        name: data.name,
        description: data.description,
        address: data.address,
        category: data.category,
        latitude: data.latitude,
        longitude: data.longitude,
      })
    })
  }
  

  editLocation(){
    const location: Location = {
      name: this.formLocations.value.name,
      description: this.formLocations.value.description,
      address: this.formLocations.value.address,
      category: this.formLocations.value.category,
      latitude: this.formLocations.value.latitude,
      longitude: this.formLocations.value.longitude,
      
    }
    if (this.id != 0) {
      //editar
      
      location.id = this.id;
      this._locationService.updateLocation(this.id,location).subscribe(()=>{
        // console.log('Localizacion Agregada')
        this.toastr.info(`La localizacion ${location.name} fue actualizada`,'Actualizada!')
        this.router.navigate(['/lists'])
      })
    }else{
      //Añadir
      this._locationService.saveLocation(location).subscribe(()=>{
        // console.log('Localizacion Agregada')
        this.toastr.success(`La localizacion ${location.name} fue agregada`,'Guardado!')
        this.router.navigate(['/lists'])
      })
    }

  }
}
