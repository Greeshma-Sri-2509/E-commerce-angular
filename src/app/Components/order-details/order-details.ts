import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from '../../Service/order-service';
import { Order } from '../../model/order';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-order-details',
  imports: [DatePipe],
  templateUrl: './order-details.html',
  styleUrl: './order-details.css',
})
export class OrderDetails implements OnInit {
  private route = inject(ActivatedRoute)
  private router = inject(Router)

  private orderService = inject(OrderService)

  order: Order | undefined

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'))
     this.order = this.orderService.ordersSignal().find(order=> order.id===id)
  }
  goBack(){
    this.router.navigate(['/account/orders'])
  }
}
