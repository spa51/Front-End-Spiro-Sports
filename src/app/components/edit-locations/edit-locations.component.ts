import { Location } from './../../interfaces/location';
import { getLocation } from './../../../../../Back-End/src/controllers/location';
import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { LocationService } from '../../services/location.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-locations',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule,NgIf],
  templateUrl: './edit-locations.component.html',
  styleUrl: './edit-locations.component.css'
})
export class EditLocationsComponent implements OnInit {

  formLocations: FormGroup;
  id: number;
  operacion: string = 'Agregar';

  constructor(private fb: FormBuilder, 
    private _locationService: LocationService,
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
  ngOnInit(): void {

    if (this.id != 0) {
      // Es editar
      this.operacion = 'Editar';
      this.getLocation(this.id);
    }
    
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
