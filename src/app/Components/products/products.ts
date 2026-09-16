import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../../Service/product-service';
import { Product } from '../../model/product';
import { CartStore } from '../../store/cart-store';
import { CartItem } from '../../model/cart-items';
import { WishlistStore } from '../../store/wishList-store';

@Component({
  selector: 'app-products',
  imports: [],
  templateUrl: './products.html',
  styleUrl: './products.css',
})
export class Products implements OnInit {
  wishlistStore = inject(WishlistStore)
  private productService = inject(ProductService);
  private cartStore = inject(CartStore);
  private router = inject(Router);

  products = signal<Product[]>([]);
  searchText = signal('');
  selectedCategory = signal('All')
  selectedSubCategory = signal('All')
  sortOption = signal('default')
  currentPage = signal(1);
  itemsPerPage = 8;
  hoveredCategory = signal<string | null>(null)
  showSortMenu = false


  filteredProducts = computed(() => {
    let filtered = this.products()
    const search = this.searchText().toLowerCase()

    if (search) {
      filtered = filtered.filter(product =>
        product.productName.toLowerCase().includes(search)
      )
    }
    if (this.selectedCategory() !== "All") {
      filtered = filtered.filter(product =>
        product.category === this.selectedCategory())
    }
    if (this.selectedSubCategory() !== "All") {
      filtered = filtered.filter(product =>
        product.subCategory === this.selectedSubCategory()
      )
    }
    const sort = this.sortOption();
    switch (sort) {
      case 'low':
        filtered = filtered.sort((a, b) => a.price - b.price);
        break;
      case 'high':
        filtered = filtered.sort((a, b) => b.price - a.price);
        break;
      case 'az':
        filtered = filtered.sort((a, b) => a.productName.localeCompare(b.productName));
        break;
      case 'za':
        filtered = filtered.sort((a, b) => b.productName.localeCompare(a.productName))
    }
    return filtered
  })
  categories = computed(() => {
    let product = this.products()
    const categoryList = product.map(product => product.category)
    const uniqueCategories = [...new Set(categoryList)]
    return ['All', ...uniqueCategories]
  })
  hoverSubCategories = computed(() => {
    const hovered = this.hoveredCategory();
    if (!hovered || hovered === "All") {
      return [];
    }
    const subCategoryList = this.products()
      .filter(product => product.category === hovered)
      .map(product => product.subCategory)

    return [...new Set(subCategoryList)]
  })
  subCategories = computed(() => {
    const selectedCategory = this.selectedCategory();

    if (selectedCategory === 'All') {
      return ['All'];
    }

    const subCategoryList = this.products()
      .filter(product => product.category === selectedCategory)
      .map(product => product.subCategory)
      .filter((subCategory, index, array) => array.indexOf(subCategory) === index);
    this.currentPage.set(1)

    return ['All', ...subCategoryList];

  })
  totalPages = computed(() => {
    return Math.ceil(
      this.filteredProducts().length / this.itemsPerPage
    )
  })


  ngOnInit(): void {
    const productList = this.productService.productsSignal();
    this.products.set(productList);
  }
  changeSort(value: string) {

    this.sortOption.set(value)
  }
  changeCategory(category: string) {
    const value = category;
    this.selectedCategory.set(value)
    this.selectedSubCategory.set("All")
    this.currentPage.set(1)
  }
  changeSubCategory(subCategory: string) {
    const value = subCategory;
    this.selectedSubCategory.set(value)
    this.currentPage.set(1)
  }
  search(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.searchText.set(value);
    this.currentPage.set(1)
  }

  addProduct(product: Product) {
    const cartItem: CartItem = {
      ...product,
      quantity: 1,
    };

    this.cartStore.addItem(cartItem);
  }

  viewDetails(id: number) {
    this.router.navigate(['/product', id]);
  }
  onMouseEnter(category: string) {
    this.hoveredCategory.set(category)
  }
  onMouseLeave() {
    this.hoveredCategory.set(null)
  }
  increaseItem(id: number) {
    this.cartStore.increaseItem(id)
  }
  decreaseItem(id: number) {
    this.cartStore.decreaseItem(id)
  }
  getCartItems(productId: number) {
    return this.cartStore.cartItems().find(item => item.id === productId)
  }
  previousPage() {
    if (this.currentPage() > 1) {
      this.currentPage.update(page => page - 1)
    }
  }
  nextPage() {
    if (this.currentPage() < this.totalPages()) {
      this.currentPage.update(page => page + 1)
    }
  }
  paginatedProducts = computed(()=>{
    const startIndex = (this.currentPage()-1)*this.itemsPerPage

    const endIndex = startIndex + this.itemsPerPage
    return this.filteredProducts().slice(
      startIndex,
      endIndex
    )
  })
  toggleWishlist(product: Product) {
  const isWishlisted = this.wishlistStore.isWishlisted(product.id);

  if (isWishlisted) {
    this.wishlistStore.removeFromWishlist(product.id);
  } else {
    this.wishlistStore.addToWishlist(product);
  }
}
}