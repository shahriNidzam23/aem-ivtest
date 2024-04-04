import { Component, OnInit } from '@angular/core';
import { StorageService } from '../services/storage/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.sass']
})
export class NavbarComponent implements OnInit {

  constructor(private storage: StorageService, private router: Router) { }

  ngOnInit(): void {
  }

  async logout() {
    await this.storage.clear(this.storage.AUTH);
    this.router.navigate(['/sign-in']);
  }

}
