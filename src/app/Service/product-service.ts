import { Injectable, signal } from '@angular/core';
import { Product } from '../model/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private storageKey = 'currentProducts';

  private products = signal<Product[]>(this.loadProducts());

  productsSignal = this.products.asReadonly();


  private loadProducts(): Product[] {

    const savedProducts = localStorage.getItem(this.storageKey);

    return savedProducts
      ? JSON.parse(savedProducts)
      : [];

  }


  private saveProducts(products: Product[]) {

    localStorage.setItem(
      this.storageKey,
      JSON.stringify(products)
    );

  }


  addProduct(product: Product) {
    const exist = this.products().some((p) =>
      p.productName.trim().toLowerCase() === product.productName.trim().toLowerCase() &&
      p.brand.trim().toLowerCase() === product.brand.trim().toLowerCase()
    )
    if (exist) {
      alert('Product already exists') 
      return
    }

    this.products.update(products => {

      const updatedProducts = [
        product,
        ...products
      ];

      // localStorage.setItem(
      //   'currentProducts',
      //   JSON.stringify(updatedProducts)
      // );
      this.saveProducts(updatedProducts)
      return updatedProducts;

    });

  }


  updateProduct(updatedProduct: Product) {

    this.products.update(products => {

      const updatedProducts = products.map(product =>
        product.id === updatedProduct.id
          ? updatedProduct
          : product
      );


      // localStorage.setItem(
      //   'currentProducts',
      //   JSON.stringify(updatedProducts)
      // );
       this.saveProducts(updatedProducts)

      return updatedProducts;

    });

  }


  deleteProduct(id: number) {

    this.products.update(products => {

      const updatedProducts = products.filter(
        product => product.id !== id
      );


      // localStorage.setItem(
      //   'currentProducts',
      //   JSON.stringify(updatedProducts)
      // );

       this.saveProducts(updatedProducts)
      return updatedProducts;

    });

  }
  
}