import { Component, inject, OnInit } from '@angular/core';
import { ProductCardComponent } from '../../shared/components/product-card/product-card.component';
import { ProductService } from '../../core/services/product.service';
import { Product } from '../../core/models/api.interface';
import { CartLoaderComponent } from '../../shared/components/cart-loader/cart-loader.component';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [ProductCardComponent, CartLoaderComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent implements OnInit {
  isLoading = false;
  products: Product[] = [];

  currentPage = 1;
  totalPages = 1;
  limit = 10;

  private productService = inject(ProductService);

  ngOnInit(): void {
    this.getAllProducts();
  }

  getAllProducts(page: number = this.currentPage) {
    this.isLoading = true;
    this.productService.getAllProducts({ limit: this.limit, page }).subscribe({
      next: (response) => {
        this.isLoading = false;
        this.products = response.data;

        this.totalPages = response.metadata.numberOfPages;
        this.currentPage = response.metadata.currentPage;
      },
      error: (error) => {
        this.isLoading = false;
        console.error(error);
      },
    });
  }
  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.getAllProducts(this.currentPage + 1);
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.getAllProducts(this.currentPage - 1);
    }
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.getAllProducts(page);
    }
  }

  get visiblePages(): number[] {
    const range: number[] = [];
    const maxVisible = 5;
    let start = Math.max(1, this.currentPage - Math.floor(maxVisible / 2));
    let end = Math.min(this.totalPages, start + maxVisible - 1);

    if (end - start < maxVisible - 1) {
      start = Math.max(1, end - maxVisible + 1);
    }

    for (let i = start; i <= end; i++) {
      range.push(i);
    }
    return range;
  }
}
