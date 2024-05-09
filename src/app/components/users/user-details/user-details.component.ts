import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule, Location } from '@angular/common';
import { UserService } from '../../../services/user.service';
import { User } from '../../../models/user';

/**
 * Componente que muestra los detalles del usuario.
 */

@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.css'
})
export class UserDetailsComponent implements OnInit {

  user: User = undefined; /** Detalles del usuario */
  isLoading: boolean = true; /** Estado de carga */
  errorMessage: string = ''; /** Mensaje de error */

  /**
   * Constructor del componente.
   * route Servicio de ruta activa
   * router Servicio de enrutamiento
   * userService Servicio de usuarios
   * location Servicio de ubicación
   */

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private location: Location
  ) { }

  /**
   * Método que se ejecuta al iniciar el componente.
   * Obtiene los detalles del usuario.
   */

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.userService.getUserById(id)
      .subscribe(user => {
        this.user = user;
        console.log('User listed correctly:', user);
          setTimeout(() => {
            this.isLoading = false;
          }, 2000);
        },
        error => {
          this.errorMessage = error;
          console.error('User listing error:', error);
          setTimeout(() => {
            this.isLoading = false;
          }, 2000);
        }
    );
  }

  /**
   * Método para retroceder a la página anterior.
   */

  goBack(): void {
    this.location.back();
  }
  
}
