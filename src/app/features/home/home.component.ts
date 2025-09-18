import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ProductCardComponent } from '../../shared/components/product-card/product-card.component';
import { ProductService } from '../../core/services/product.service';
import { Category, Product } from '../../core/models/api.interface';
import {
  CarouselModule,
  OwlOptions,
  CarouselComponent,
} from 'ngx-owl-carousel-o';
import { CategoryService } from '../../core/services/category.service';
import { ToastrService } from 'ngx-toastr';
import { CartLoaderComponent } from '../../shared/components/cart-loader/cart-loader.component';
import { FormsModule } from '@angular/forms';
import { SearchPipe } from '../../shared/pipes/search-pipe';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    ProductCardComponent,
    CarouselModule,
    CartLoaderComponent,
    SearchPipe,
    FormsModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  @ViewChild('owlCar', { static: false }) owlCar!: CarouselComponent;

  isLoading = false;
  products: Product[] = [];
  categories: Category[] = [];
  inputTerm: string = '';

  sliderImages: string[] = [
    'images/slider.jpg',
    'images/slide3.jpg',
    'images/slider-image-1.jpeg',
    'images/slider-image-2.jpeg',
    'images/slider-2.jpeg',
    'images/slider-image-3.jpeg',
  ];

  private categoryService = inject(CategoryService);
  private productService = inject(ProductService);
  private toaster = inject(ToastrService);
  private router = inject(Router);

  ngOnInit(): void {
    this.getAllProducts();
    this.getAllCategories();
  }

  getAllProducts() {
    this.isLoading = true;
    this.productService.getAllProducts({}).subscribe({
      next: (response) => {
        this.isLoading = false;
        this.products = response.data;
      },
      error: (error) => {
        this.isLoading = false;
        this.toaster.error(error.message);
      },
    });
  }

  getAllCategories() {
    this.categoryService.getAllCategories().subscribe({
      next: (response) => {
        this.categories = response.data;
      },
    });
  }

  goToProductsPage() {
    this.router.navigate(['/products']);
  }

  mainSliderOptions: OwlOptions = {
    loop: true,
    autoplay: true,
    autoplayTimeout: 4000,
    autoplayHoverPause: true,
    smartSpeed: 800,
    animateOut: 'fadeOut',
    mouseDrag: true,
    touchDrag: true,
    dots: true,
    nav: false,
    responsive: { 0: { items: 1 }, 640: { items: 1 }, 1024: { items: 1 } },
  };

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
    autoplay: true,
    autoplaySpeed: 500,
    responsive: {
      0: { items: 1 },
      400: { items: 2 },
      740: { items: 3 },
      940: { items: 7 },
    },
    margin: 13,
    nav: false,
  };
}
