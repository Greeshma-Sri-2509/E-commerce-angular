import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartStore } from '../../store/cart-store';
import { ProductService } from '../../Service/product-service';
import { Product } from '../../model/product';
import { CartItem } from '../../model/cart-items';
import { WishlistStore } from '../../store/wishList-store';

@Component({
  selector: 'app-product-detail',
  imports: [],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.css',
})
export class ProductDetail {
  wishlistStore = inject(WishlistStore)
  private cartStore = inject(CartStore)
  // private productService = inject(ProductService)
  private route = inject(ActivatedRoute)
  product: Product | undefined
  constructor() {
    this.product= this.route.snapshot.data['product']
    // const id = this.route.snapshot.paramMap.get('id')
    // if (id !== null) {
    //   const productId = Number(id)
    //   this.product = this.productService.getProductById(productId)
    // }
  }
  addProduct(product: Product) {
    const cartItems: CartItem = {
      ...product,
      quantity: 1
    }
    this.cartStore.addItem(cartItems)
  }
  getCartItems(productId: number){
    return this.cartStore.cartItems().find(item=> item.id===productId)
  }

  increaseItem(id: number){
    this.cartStore.increaseItem(id)
  }
  decreaseItem(id: number){
    this.cartStore.decreaseItem(id)
  }
  toggleWishlist(product: Product) {
  const isWishlisted = this.wishlistStore.isWishlisted(product.id);

  if (isWishlisted) {
    this.wishlistStore.removeFromWishlist(product.id);
  } else {
    this.wishlistStore.addToWishlist(product);
  }
}
}
