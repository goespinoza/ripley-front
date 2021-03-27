import { Component, OnInit } from '@angular/core';
import { LogService } from 'src/app/services/auth/log.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(
    private logService: LogService
  ) { }

  ngOnInit(): void {
  }

  logout() {
    this.logService.logout();
  }
}
