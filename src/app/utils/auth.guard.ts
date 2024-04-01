import { jwtDecode } from "jwt-decode";
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate,Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ToastrService } from "ngx-toastr";


@Injectable({
  providedIn: 'root'
})
export class authGuard implements CanActivate {

  constructor(private router: Router,private toastr: ToastrService){

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {

      const token = localStorage.getItem('token');

      if (token) {
        // console.log('Token almacenado:', token); // Agregar esta línea

        const tokenParts = token.split('.');

        if (tokenParts.length !== 3) {
          // console.error('Token malformado');
          // console.log(tokenParts)
          this.router.navigate(['/login']);
          return false;
        }

        // console.log('Token decodificado:', JSON.parse(atob(tokenParts[1])));

        const decodedPayload = JSON.parse(atob(tokenParts[1]));
        const role = decodedPayload.role; // Asumiendo que el rol está en el token

        // console.log('Rol del usuario:', role);

        // Revisa si la ruta requiere un rol específico y si el usuario tiene ese rol
        if (route.data['roles'] && !route.data['roles'].includes(role)) {
          // console.warn('El usuario no tiene permiso para acceder a esta ruta');
          this.toastr.error('El usuario no tiene permiso para acceder a esta ruta')
          this.router.navigate(['/maps']);
          return false;
        }
        return true;
      }

      console.error('Token no encontrado en el almacenamiento local');
      this.router.navigate(['/login']);
      return false;
    }
  }