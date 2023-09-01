import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth-service.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent { 
  constructor(public authService: AuthService, private router: Router) {
  }
  async logout() {
    this.authService.logout();
    await this.router.navigateByUrl('/login');
  }
}
