import { Component, inject } from '@angular/core';
import { ProductService } from '../../core/services/product.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../core/models/api.interface';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../../core/services/cart.service';
import { CartLoaderComponent } from "../../shared/components/cart-loader/cart-loader.component";

@Component({
  selector: 'app-product-details',
  imports: [CarouselModule, CartLoaderComponent],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css',
})
export class ProductDetailsComponent {
  product: Product | null = null;
  private cartService = inject(CartService);
  private toaster = inject(ToastrService);
  private productService = inject(ProductService);
  private route = inject(ActivatedRoute);

  isLoading = false;
  productTitle: string | null = null;

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.getProductDetails(id);
      }
    });

    this.route.queryParamMap.subscribe((query) => {
      const title = query.get('title');
      if (title) {
        this.productTitle = title;
      }
    });
  }

  getProductDetails(id: string) {
    this.isLoading = true;
    this.productService.getSpecificProduct(id).subscribe({
      next: (response) => {
        this.isLoading = false;
        if (response.data) {
          this.product = response.data;
        }
      },
      error: (error) => {
        this.isLoading = false;
        console.log(error);
      },
    });
  }

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    navSpeed: 600,
    autoplay: true,
    autoplaySpeed: 20,
    navText: ['prev', 'next'],
    responsive: {
      0: { items: 1 },
      400: { items: 2 },
      740: { items: 3 },
      940: { items: 7 },
    },
    margin: 10,
    nav: false,
  };

  addProductToCart(pID: string) {
    this.cartService.addProductToCart(pID).subscribe({
      next: (response) => {
        this.toaster.success(response.message);
      },
      error: (error) => {
        this.toaster.error(error.message);
      },
    });
  }
}
