import { Component, OnInit } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserService } from '../../../services/user.service';
import { User } from '../../../models/user';

/**
 * Componente que muestra una lista de usuarios.
 */

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent implements OnInit {

  title: string = 'User List'; /** Título de la página */
  users: User[] = []; /** Lista de usuarios */
  isLoading: boolean = true;  /** Estado de carga */
  errorMessage: string = ''; /** Mensaje de error */

  /**
   * Constructor del componente.
   * userService Servicio de usuarios
   * router Servicio de enrutamiento
   */

  constructor(private userService: UserService, private router: Router) { }

  /**
   * Método que se ejecuta al iniciar el componente.
   * Obtiene la lista de usuarios.
   */

  ngOnInit(): void {
    this.userService.getUsers()
      .subscribe(
        users => {
          this.users = users;
          console.log('Users listed correctly:', users);
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

}
