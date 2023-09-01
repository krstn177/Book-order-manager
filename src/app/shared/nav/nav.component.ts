import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth-service.service';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements  OnInit{
  @Input() isNotLoginPage: boolean = false;
  constructor(public authService: AuthService, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit() {
  }
  async logout() {
    this.authService.logout();
    await this.router.navigateByUrl('/login');
  }
}
