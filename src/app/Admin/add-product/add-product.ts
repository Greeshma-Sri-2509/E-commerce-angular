import { Component, EventEmitter, inject, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Product } from '../../model/product';
import { CATEGORIES } from '../../Data/categories';


@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './add-product.html',
  styleUrls: ['./add-product.css'],
})
export class AddProduct implements OnChanges {
  @Input() isEditMode = false;
  @Input() product?: Product | null = null;

  @Output() saveProduct = new EventEmitter<Product>();
  @Output() cancel = new EventEmitter<void>();

  categories = CATEGORIES

  subCategories: string[] = [];

  onChangeCategory() {
    const selectedCategory = this.categories.find(c =>
      c.name === this.category.value
    );
    this.subCategories = selectedCategory?.subCategories ?? [];

    this.subCategory.setValue('');
  }


  get productName() {
    return this.productForm.controls.productName
  }
  get brand() {
    return this.productForm.controls.brand
  }
  get description() {
    return this.productForm.controls.description
  }
  get price() {
    return this.productForm.controls.price
  }
  get category() {
    return this.productForm.controls.category
  }
  get subCategory() {
    return this.productForm.controls.subCategory
  }
  get stock() {
    return this.productForm.controls.stock
  }
  get image() {
    return this.productForm.controls.image
  }
  private fb = inject(NonNullableFormBuilder)
  productForm = this.fb.group({
    productName: ['', [Validators.required]],
    brand: ['', [Validators.required]],
    description: ['', [Validators.required]],
    price: [1, [Validators.required, Validators.min(1), Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
    category: ['', [Validators.required]],
    subCategory: ['', [Validators.required]],
    stock: [0, [Validators.required, Validators.min(1), Validators.pattern(/^[0-9]+$/)]],
    image: ['', [Validators.required, Validators.pattern('^https?:\\/\\/.+\\.(jpg|jpeg|png|gif|webp|bmp|svg)(\\?.*)?$')]],
  })
  submit() {

    if (this.productForm.invalid) {
      this.productForm.markAllAsTouched();
      return;
    }

    const product: Product = {
      id: this.product?.id ?? Date.now(),
      ...this.productForm.getRawValue()
    };

    this.saveProduct.emit(product);
  }
  ngOnChanges(_: SimpleChanges): void {
    if (this.product) {
      this.productForm.patchValue(this.product)

      const selectedCategory = this.categories.find(c =>
        c.name === this.category.value
      );
      this.subCategories = selectedCategory?.subCategories ?? [];
    } else {
      this.productForm.reset()
      this.subCategories = [];
    }
  }
}
