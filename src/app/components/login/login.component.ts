import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from '../../interfaces/user';
import { UserService } from '../../services/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorService } from '../../services/error.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink,FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  username: string = '';
  password: string = '';
  constructor(private toastr: ToastrService, 
    private _userService: UserService, 
    private router: Router,
    private _errorService: ErrorService){

  }

  ngOnInit(): void {
    
  }

  login(){

    // validar ingreso usuario

    if (this.username == '' || this.password == '') {
      this.toastr.error(`Todos los campos sin obligatorios`,'ERROR' )
      return;
    }

    const user:User ={
      username: this.username,
      password: this.password
    }

    this._userService.login(user).subscribe({
      next: (token) =>{
        this.router.navigate(['/maps'])
        localStorage.setItem('token',token)
        // console.log(token)
      },
      error: (e: HttpErrorResponse) =>{
        this._errorService.msjError(e); 
      }
    })


  }

}
