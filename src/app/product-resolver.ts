import { ResolveFn } from '@angular/router';
import { Product } from './model/product';
import { inject } from '@angular/core';
import { ProductService } from './Service/product-service';

export const productResolver: ResolveFn<Product | undefined> = (route) => {
  const productService = inject(ProductService);
  const id = route.paramMap.get('id');
  if (id === null) {
    return undefined;
  }
  const productId = Number(id);
  const products = productService.productsSignal();
  return products.find((product) => product.id === productId);
};
