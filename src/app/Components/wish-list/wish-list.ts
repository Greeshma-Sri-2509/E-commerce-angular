import { Component, inject } from '@angular/core';
import { CartStore } from '../../store/cart-store';
import { WishlistStore } from '../../store/wishList-store';
import { CartItem } from '../../model/cart-items';
import { Product } from '../../model/product';


@Component({
  selector: 'app-wish-list',
  imports: [],
  templateUrl: './wish-list.html',
  styleUrl: './wish-list.css',
})
export class WishList {

  private wishlistStore = inject(WishlistStore);
  private cartStore = inject(CartStore);

  wishlistItems = this.wishlistStore.wishlistItems;

  removeFromWishlist(id: number) {
    this.wishlistStore.removeFromWishlist(id);
  }

  addToCart(product: Product) {

    const cartItem: CartItem = {
      id: product.id,
      productName: product.productName,
      price: product.price,
      image: product.image,
      category: product.category,
      quantity: 1
    };

    this.cartStore.addItem(cartItem);
  }
}