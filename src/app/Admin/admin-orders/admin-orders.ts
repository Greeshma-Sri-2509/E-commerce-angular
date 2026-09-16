import { Component, inject } from '@angular/core';
import { OrderService } from '../../Service/order-service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-admin-orders',
  imports: [DatePipe],
  templateUrl: './admin-orders.html',
  styleUrl: './admin-orders.css',
})
export class AdminOrders {
  private orderService = inject(OrderService)
  orders = this.orderService.ordersSignal

  /**
   * Get accessible label for order status
   * Used for aria-label and screen readers
   */
  getStatusAriaLabel(orderId: number, status: string): string {
    return `Order ${orderId} current status: ${status}`
  }

  /**
   * Get accessible description for status select
   */
  getStatusSelectLabel(orderId: number): string {
    return `Change status for order ${orderId}`
  }

  updateOrderStatus(id: number, status: string){
    this.orderService.updateStatus( id, status )
  }
}
