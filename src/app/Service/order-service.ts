import { Injectable, signal } from '@angular/core';
import { Order, OrderStatus } from '../model/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private storageKey = 'orders';

  private orders = signal<Order[]>(this.loadOrders());

  ordersSignal = this.orders.asReadonly();

  private loadOrders(): Order[] {

    const savedOrders = localStorage.getItem(this.storageKey);

    return savedOrders
      ? JSON.parse(savedOrders)
      : [];

  }

  addOrder(order: Order) {

    this.orders.update(orders => {

      const updatedOrders = [
        order,
        ...orders
      ];

      localStorage.setItem(
        this.storageKey,
        JSON.stringify(updatedOrders)
      );

      return updatedOrders;

    });

  }
  cancelOrder(id: number) {
    this.orders.update(orders => {
      const updatedOrders = orders.map(order =>
        order.id === id
          ? {
              ...order,
              status: 'Cancelled' as Order['status']
            }
          : order
      );

      localStorage.setItem(
        this.storageKey,
        JSON.stringify(updatedOrders)
      );

      return updatedOrders;
    });
  }

  updateStatus(id: number, status: OrderStatus) {
    this.orders.update(orders => {
      const updatedOrders = orders.map(order =>
        order.id === id
          ? {
              ...order,
              status
            }
          : order
      );

      localStorage.setItem(
        this.storageKey,
        JSON.stringify(updatedOrders)
      );

      return updatedOrders;
    });
  }
}