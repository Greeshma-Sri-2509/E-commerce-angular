import { Injectable, signal } from '@angular/core';
import { Product } from '../model/product';

@Injectable({
  providedIn: 'root'
})
export class WishlistStore {

  private storageKey = 'wishlist';

  private wishlist = signal<Product[]>(this.loadWishlist());

  wishlistItems = this.wishlist.asReadonly();

  private loadWishlist(): Product[] {

    const savedWishlist = localStorage.getItem(this.storageKey);

    return savedWishlist
      ? JSON.parse(savedWishlist)
      : [];

  }

  addToWishlist(product: Product) {

    this.wishlist.update(items => {

      if (items.some(item => item.id === product.id)) {
        return items;
      }

      const updatedItems = [
        product,
        ...items
      ];

      localStorage.setItem(
        this.storageKey,
        JSON.stringify(updatedItems)
      );

      return updatedItems;

    });

  }

  removeFromWishlist(id: number) {

    this.wishlist.update(items => {

      const updatedItems = items.filter(
        item => item.id !== id
      );

      localStorage.setItem(
        this.storageKey,
        JSON.stringify(updatedItems)
      );

      return updatedItems;

    });

  }
  isWishlisted(id: number): boolean {
  return this.wishlist().some(item => item.id === id);
}

}