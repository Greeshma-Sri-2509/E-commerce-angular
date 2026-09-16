import { Component, inject } from '@angular/core';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { CartStore } from '../../store/cart-store';
import { OrderService } from '../../Service/order-service';
import { Router } from '@angular/router';
import { Order } from '../../model/order';

@Component({
  selector: 'app-checkout',
  imports: [ReactiveFormsModule],
  templateUrl: './checkout.html',
  styleUrl: './checkout.css',
})
export class Checkout {

  private fb = inject(NonNullableFormBuilder);

  cartStore = inject(CartStore);

  private orderService = inject(OrderService);

  private router = inject(Router);


  checkoutForm = this.fb.group({

    name: [
      '',
      [Validators.required]
    ],

    phone: [
      '',
      [
        Validators.required,
        Validators.pattern(/^[6-9][0-9]{9}$/)
      ]
    ],

    address: [
      '',
      [Validators.required]
    ],

    city: [
      '',
      [Validators.required]
    ],

    state: [
      '',
      [Validators.required]
    ],

    pincode: [
      '',
      [
        Validators.required,
        Validators.pattern(/^[0-9]{6}$/)
      ]
    ],

    paymentMethod: [
      '',
      [Validators.required]
    ]

  });


  get name() {
    return this.checkoutForm.get('name');
  }

  get phone() {
    return this.checkoutForm.get('phone');
  }

  get address() {
    return this.checkoutForm.get('address');
  }

  get city() {
    return this.checkoutForm.get('city');
  }

  get state() {
    return this.checkoutForm.get('state');
  }

  get pincode() {
    return this.checkoutForm.get('pincode');
  }

  get paymentMethod() {
    return this.checkoutForm.get('paymentMethod');
  }


  placeOrder() {

    if (this.checkoutForm.invalid) {

      this.checkoutForm.markAllAsTouched();

      return;
    }


    const cartItems = this.cartStore.cartItems();

    if (cartItems.length === 0) {
      return;
    }


    const formValue = this.checkoutForm.getRawValue();


    const order: Order = {

      id: Date.now(),

      items: cartItems,

      customer: {

        name: formValue.name,

        phone: formValue.phone,

        address: formValue.address,

        city: formValue.city,

        state: formValue.state,

        pincode: formValue.pincode

      },

      paymentMethod: formValue.paymentMethod,

      totalQuantity: this.cartStore.totalQuantity(),

      totalPrice: this.cartStore.totalPrice(),

      orderDate: new Date().toISOString(),

      status: 'Confirmed'

    };


    this.orderService.addOrder(order);

    this.cartStore.clearCart();

    this.router.navigate(['/account/orders']);

  }

}