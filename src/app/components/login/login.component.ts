import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';

/**
 * Componente para el inicio de sesión de usuarios.
 */

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  
  username: string = ''; /** Nombre de usuario ingresado */
  password: string = ''; /** Contraseña ingresada */
  errorMessage: string = ''; /** Mensaje de error */

  /**
   * Constructor del componente.
   * userService Servicio de usuarios
   * router Servicio de enrutamiento
   */

  constructor(private userService: UserService, private router: Router) {}
  
   /**
   * Método para iniciar sesión.
   * Verifica las credenciales ingresadas y realiza la autenticación.
   * Redirige al componente de usuarios si las credenciales son válidas.
   */

  login(): void {
    if (this.username !== '' && this.password !== '') {
      this.userService.login(this.username, this.password)
      .subscribe(response => {
        if (response.length > 0) {
          // Credenciales válidas, realizar redirección o acciones necesarias
          console.log('Login OK');
          this.router.navigate(['usuarios']);
        } else {
          console.log('Invalid credentials');
          this.errorMessage = 'Invalid username or password entered.'
        }
      });
    } else {
      this.errorMessage = 'Enter all data is required.'
    }
  }

}
