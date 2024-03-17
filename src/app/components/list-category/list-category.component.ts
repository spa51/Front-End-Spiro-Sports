import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Category } from '../../interfaces/category';
import { CategoryService } from '../../services/category.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-list-category',
  standalone: true,
  imports: [NgIf,NgFor,RouterLink],
  templateUrl: './list-category.component.html',
  styleUrl: './list-category.component.css'
})
export class ListCategoryComponent implements OnInit {
  
  listCategory: Category[] =[]

constructor(private _categoryService: CategoryService, private toastr: ToastrService) {

 }

ngOnInit(): void {
  this.getListCategorys();
}

getListCategorys(){
  this._categoryService.getListCategorys().subscribe((data: Category[])=>{
    this.listCategory = data;
  })
}

deleteCategory(id:number){
  this._categoryService.deleteCategory(id).subscribe(()=>{
    this.getListCategorys();
    this.toastr.warning('La Categoria fue Eliminada','Eliminada!');
  })
}

}
