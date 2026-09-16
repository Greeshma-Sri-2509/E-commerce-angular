import { Component, inject, OnInit } from '@angular/core';
import { CartStore } from '../../store/cart-store';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  imports: [],
  templateUrl: './cart.html',
  styleUrl: './cart.css',
})
export class Cart implements OnInit{
  private route = inject(Router)
  private cartStore = inject(CartStore)
  cartItems = this.cartStore.cartItems
  increaseItem(id: number){
    this.cartStore.increaseItem(id)
  }
  decreaseItem(id: number){
    this.cartStore.decreaseItem(id)
  }
  removeItem(id: number){
    this.cartStore.removeItem(id)
  }
  clearCart(){
    this.cartStore.clearCart()
  }
  itemCount= this.cartStore.itemCount;
  totalQuantity =this.cartStore.totalQuantity;
  totalPrice =this.cartStore.totalPrice
  ngOnInit(): void {
    this.cartStore.loadCart()
  }
  checkOut(){
    this.route.navigate(['/checkout'])
  }
}
