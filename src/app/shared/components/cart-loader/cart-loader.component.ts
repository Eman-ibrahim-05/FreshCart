import { Component, inject, OnInit } from '@angular/core';
import { LoaderService } from '../../../core/services/loader.service';

@Component({
  selector: 'app-cart-loader',
  imports: [],
  templateUrl: './cart-loader.component.html',
  styleUrl: './cart-loader.component.css',
})
export class CartLoaderComponent implements OnInit {
  public loaderService = inject(LoaderService);
  ngOnInit(): void {
    this.loaderService.isLoading();
  }
}
