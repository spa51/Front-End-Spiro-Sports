import { getCategory } from './../../../../../Back-End/src/controllers/category';
import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Category } from '../../interfaces/category';
import { CategoryService } from '../../services/category.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-categorys',
  standalone: true,
  imports: [RouterLink,NgIf,ReactiveFormsModule],
  templateUrl: './edit-categorys.component.html',
  styleUrl: './edit-categorys.component.css'
})
export class EditCategorysComponent implements OnInit {
  formCategorys: FormGroup;
  id:number;
  operacion: string = 'Agregar';

  constructor(private fb: FormBuilder,
    private _categoryService: CategoryService,
    private router:Router,
    private toastr:ToastrService,
    private aRouter:ActivatedRoute){
      this.formCategorys = this.fb.group({
        name:['', Validators.required],
      })
      this.id =Number(aRouter.snapshot.paramMap.get('id'));
    }


  ngOnInit(): void {
    if(this.id !=0){
      this.operacion ='Editar';
      this.getCategory(this.id);
    }
  }

  getCategory(id: number){
    this._categoryService.getCategory(id).subscribe((data:Category)=>{
      console.log(data)
      this.formCategorys.setValue({
        name:data.name,
      })
    })
  }

  editCategory(){
    const category: Category ={
      name: this.formCategorys.value.name,
    }
    if (this.id !=0) {
      //editar
      category.id = this.id;
      this._categoryService.updateCategory(this.id,category).subscribe(()=>{
        this.toastr.info(`La Categoria ${category.name} fue Actualizada`,'Actualizada!' )
        this.router.navigate(['/listscate'])
      })
      
    } else {
      //Añadir
      this._categoryService.saveCategory(category).subscribe(()=>{
        this.toastr.success(`La Categoria ${category.name} Fue Agregada`,'Guardado')
        this.router.navigate(['listscate'])
      })
      
    }
  }

}
