import { Component, inject } from '@angular/core';
import { OrderService } from '../../Service/order-service';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-orders',
  imports: [DatePipe],
  templateUrl: './orders.html',
  styleUrl: './orders.css',
})
export class Orders {
  private route = inject(Router)
  private orderService = inject(OrderService)
   orders = this.orderService.ordersSignal;
   cancelOrder(id: number){
    const confirmed = confirm(
      'Are you sure you want to cancel this order'
    )
    if(!confirmed){
      return
    }
    this.orderService.cancelOrder(id)
   }
   viewDetail(id: number){
    this.route.navigate(['/account/orders',id])
   }
}
