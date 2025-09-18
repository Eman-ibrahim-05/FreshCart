import { Component, inject, OnInit } from '@angular/core';
import { Brand } from '../../core/models/api.interface';
import { BrandService } from '../../core/services/brands.service';
import { CartLoaderComponent } from "../../shared/components/cart-loader/cart-loader.component";

@Component({
  selector: 'app-brands',
  imports: [CartLoaderComponent],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.css',
})
export class BrandsComponent implements OnInit {
  isLoading = false;
  brands: Brand[] = [];
  private brandService = inject(BrandService);

  ngOnInit(): void {
    this.getAllBrands();
  }

  getAllBrands() {
    this.isLoading = true;
    this.brandService.getAllBrands().subscribe({
      next: (response) => {
        this.isLoading = false;
        this.brands = response.data;
      },
      error: (error) => {
        this.isLoading = false;
        console.log(error);
      },
    });
  }
}
