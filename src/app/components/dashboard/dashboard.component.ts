import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DrinksDataService } from 'src/app/services/drinks-data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  morningItems: any[] = []
  eveningItems:any[] = []

  constructor(private orderItemService: DrinksDataService, private router: Router) { }

  ngOnInit(): void {
    this.orderItemService.getOrderItemsEve().subscribe((res:any)=>{
      this.eveningItems = res 
    })
    this.orderItemService.getOrderItems().subscribe((items:any) => {
      this.morningItems = items;
    });
  }

}
