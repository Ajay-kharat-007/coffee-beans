import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DrinksDataService } from 'src/app/services/drinks-data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isShown !: boolean;
  constructor(private router: Router) {
    this.isShown = true
  }

  ngOnInit(): void {
  }

  logout() {
    this.router.navigate(['/login'])
  }

}
