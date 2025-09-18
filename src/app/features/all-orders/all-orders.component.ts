import { Component, inject, OnInit } from '@angular/core';
import { AllOrdersService } from '../../core/services/allOrders.service';
import { Orders } from '../../core/models/api.interface';
import { CurrencyPipe } from '@angular/common';
import { CartLoaderComponent } from "../../shared/components/cart-loader/cart-loader.component";

@Component({
  selector: 'app-all-orders',
  standalone: true,
  templateUrl: './all-orders.component.html',
  imports: [CurrencyPipe, CartLoaderComponent],
})
export class AllOrdersComponent implements OnInit {
  private allOrders = inject(AllOrdersService);
  isLoading = false;

  orders: Orders[] = [];
  isEmpty = false;

  ngOnInit(): void {
    this.getAllOrders();
  }

  getAllOrders() {
    this.isLoading = true;
    this.allOrders.getAllOrders().subscribe({
      next: (response) => {
        this.isLoading = false;
        this.orders = response.data;
        this.isEmpty = this.orders.length === 0;
      },
      error: (err) => {
        this.isLoading = false;
        console.error('Error fetching orders', err);
        this.isEmpty = true;
      },
    });
  }
}
