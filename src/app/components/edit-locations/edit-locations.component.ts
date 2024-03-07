import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Location } from '../../interfaces/location';

@Component({
  selector: 'app-edit-locations',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule,NgIf],
  templateUrl: './edit-locations.component.html',
  styleUrl: './edit-locations.component.css'
})
export class EditLocationsComponent implements OnInit {

  formLocations: FormGroup;

  constructor(private fb: FormBuilder){
    this.formLocations = this.fb.group({
      name: ['', Validators.required],
      description: ['',Validators.required],
      address: ['',Validators.required],
      category: ['',Validators.required],
      latitude: [null,Validators.required],
      longitude: [null,Validators.required],
  })

  }
  ngOnInit(): void {
    
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
    console.log(location)
  }
}
