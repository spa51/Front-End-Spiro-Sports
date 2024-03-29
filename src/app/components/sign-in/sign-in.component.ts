import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from '../../interfaces/user';
import { UserService } from '../../services/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorService } from '../../services/error.service';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [RouterLink,FormsModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent implements OnInit {

  username: string = '';
  password: string = '';
  confirmPassword: string = '';
  
  constructor(private toastr: ToastrService, 
    private _userService: UserService,
    private router:Router,
    private _errorService: ErrorService){

  }

  ngOnInit(): void {
    
  }
  addUser(){
    //validar datos
    if (this.username == '' || this.password == '' || this.confirmPassword == '') {
      this.toastr.error(`Todos los campos sin obligatorios`,'ERROR' )
      return;
      
    }
    // Validar contraseñas iguales
    if (this.password != this.confirmPassword) {
      this.toastr.error(`Las contraseñas son diferente`,'ERROR' )
      return;
    }
    const user: User = {
      username: this.username,
      password: this.password
    }
    this._userService.signIn(user).subscribe({
      next:(v) => {
        console.log('El usuario fue registrado con exito');
        this.toastr.success(`El usuario ${this.username} fue registrado con exito`,'Usuario Registrado');
        this.router.navigate(['/maps']);
      },
      error:(e:HttpErrorResponse) => {
        this._errorService.msjError(e);
      }
    })
  }

}
