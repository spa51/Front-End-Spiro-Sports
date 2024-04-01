import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [RouterLink,NgClass],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {
  get isLoggedIn(): boolean {
    return !!localStorage.getItem('token'); // Retorna true si hay un token
  }

  constructor(private router: Router){

  }


  logOut(){
    localStorage.removeItem('token');
    this.router.navigate(['/login'])
  }

}
