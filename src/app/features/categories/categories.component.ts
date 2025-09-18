import { Component, inject, OnInit } from '@angular/core';
import { Category } from '../../core/models/api.interface';
import { CategoryService } from '../../core/services/category.service';
import { CartLoaderComponent } from "../../shared/components/cart-loader/cart-loader.component";

@Component({
  selector: 'app-categories',
  imports: [CartLoaderComponent],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css',
})
export class CategoriesComponent implements OnInit {
  isLoading = false;
  categories: Category[] = [];
  private categoryService = inject(CategoryService);

  ngOnInit(): void {
    this.getAllCategories();
  }

  getAllCategories() {
    this.isLoading = true;
    this.categoryService.getAllCategories().subscribe({
      next: (response) => {
        this.isLoading = false;
        this.categories = response.data;
      },
      error: (error) => {
        this.isLoading = false;
        console.log(error);
      },
    });
  }
}
