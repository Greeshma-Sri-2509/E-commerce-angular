import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { Product } from '../../model/product';
import { ProductService } from '../../Service/product-service';
import { AddProduct } from '../add-product/add-product';

@Component({
  selector: 'app-admin-products',
  imports: [CommonModule, AddProduct],
  templateUrl: './admin-products.html',
  styleUrl: './admin-products.css',
})
export class AdminProducts {
  

  private productService = inject(ProductService);

  products = this.productService.productsSignal;

  isModalOpen = signal(false);
  isEditMode = signal(false);
  selectedProduct = signal<Product | null>(null);


  openAddProduct(){

    this.isEditMode.set(false);
    this.selectedProduct.set(null);
    this.isModalOpen.set(true);

  }


  openEditProduct(product: Product){

    this.isEditMode.set(true);
    this.selectedProduct.set(product);
    this.isModalOpen.set(true);

  }


  closeModal(){

    this.isEditMode.set(false);
    this.selectedProduct.set(null);
    this.isModalOpen.set(false);

  }


  handleSave(product: Product){

    if(this.isEditMode()){

      this.productService.updateProduct(product);

    }
    else{

      this.productService.addProduct(product);

    }

    this.closeModal();

  }


  deleteProduct(id: number){

    const confirmed = confirm('Are you sure you want to delete this product?');

    if(confirmed){

      this.productService.deleteProduct(id);

    }

  }

}