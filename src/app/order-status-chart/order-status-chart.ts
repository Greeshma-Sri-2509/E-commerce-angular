import { Component, computed, inject } from '@angular/core';
import { OrderService } from '../Service/order-service';
import { ChartConfiguration } from 'chart.js' ;
import { BaseChartDirective } from 'ng2-charts'

@Component({
  selector: 'app-order-status-chart',
  imports: [BaseChartDirective],
  templateUrl: './order-status-chart.html',
  styleUrl: './order-status-chart.css',
})
export class OrderStatusChart {
  private orderService = inject(OrderService);
  orders = this.orderService.ordersSignal;
  statusCounts = computed(()=>{
    const orders = this.orders()
    return{
      shipping: orders.filter(order=> order.status==='Shipping').length,
      confirmed: orders.filter(order=>order.status==='Confirmed').length,
      delivered: orders.filter(orders=>orders.status==='Delivered').length,
      cancelled: orders.filter(order=>order.status==='Cancelled').length
    }
  });
  barChartType: ChartConfiguration<'bar'>['type'] = 'bar';
  barChartData = computed<ChartConfiguration<'bar'>['data']>(() => {
    const count = this.statusCounts();
    return {
      labels: [
        'Shipping',
        'Confirmed',
        'Delivered',
        'Cancelled'
      ],
      datasets: [
        {
          label: 'Orders',
          data: [
            count.shipping,
            count.confirmed,
            count.delivered,
            count.cancelled
          ],
          borderWidth: 1,
          backgroundColor: ['#71ceea', '#ebe378', '#71e68c', '#f7717a']
        }
      ]
    };
  });
  barChartOptions: ChartConfiguration<'bar'>['options'] ={
    responsive: true,
    scales:{
      y:{
        beginAtZero: true,
        ticks:{
          stepSize: 1
        }
      }
    }
  }
}
