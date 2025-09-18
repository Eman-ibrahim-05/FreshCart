import { CartLoaderComponent } from './../../shared/components/cart-loader/cart-loader.component';
import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../../core/services/cart.service';
import { cartResponse } from '../../core/models/api.interface';
import { ToastrService } from 'ngx-toastr';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  imports: [CartLoaderComponent, ReactiveFormsModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent implements OnInit {
  isLoading = false;
  countLoading = false;
  currentIndex: number = -1;

  isAddressFormOpen = false;
  paymentMethod: 'card' | 'cash' = 'card';

  addressForm = new FormGroup({
    details: new FormControl('', Validators.required),
    phone: new FormControl('', Validators.required),
    city: new FormControl('', Validators.required),
  });

  cartData: cartResponse | null = null;
  private cartService = inject(CartService);
  private toaster = inject(ToastrService);
  private router = inject(Router);

  ngOnInit(): void {
    this.getUserCart();
  }

  getUserCart() {
    this.isLoading = true;
    this.cartService.getUserCart().subscribe({
      next: (response) => {
        this.cartData = response;
        this.isLoading = false;
      },
      error: (error) => {
        this.isLoading = false;
        this.toaster.error(error.message);
      },
    });
  }

  updateProductCount(id: string, count: number, currentIndex: number) {
    this.countLoading = true;
    this.currentIndex = currentIndex;
    this.cartService.updateProductQuantity(id, count).subscribe({
      next: (response) => {
        this.countLoading = false;
        this.cartData = response;
      },
      error: (error) => {
        this.countLoading = false;
        this.toaster.error(error.message);
      },
    });
  }

  deleteProduct(id: string) {
    this.cartService.deleteSpecificProduct(id).subscribe({
      next: (response) => {
        this.cartData = response;
      },
      error: (error) => {
        this.toaster.error(error.message);
      },
    });
  }

  clearCart() {
    this.cartService.deleteCart().subscribe({
      next: () => {
        this.cartData = null;
      },
      error: (error) => {
        this.toaster.error(error.message);
      },
    });
  }

  onSubmit() {
    if (this.addressForm.invalid) {
      this.addressForm.markAsTouched();
      return;
    }

    if (this.paymentMethod === 'card') {
      this.cartService
        .checkOutSession(this.cartData!.cartId, {
          details: this.addressForm.value.details!,
          phone: this.addressForm.value.phone!,
          city: this.addressForm.value.city!,
        })
        .subscribe({
          next: (res) => {
            window.location.href = res.session.url;
          },
          error: (err) => {
            this.toaster.error(err.message || 'Checkout failed');
          },
        });
    } else {
      this.cashOnDelivery();
    }
  }

  cashOnDelivery() {
    if (!this.cartData?.cartId) return;

    if (this.addressForm.invalid) {
      this.addressForm.markAllAsTouched();
      this.toaster.error('Please fill all address fields');
      return;
    }

    this.cartService
      .CashOnDelivery(this.cartData.cartId, {
        details: this.addressForm.value.details!,
        phone: this.addressForm.value.phone!,
        city: this.addressForm.value.city!,
      })
      .subscribe({
        next: () => {
          this.toaster.success(
            'Order placed successfully with Cash On Delivery'
          );
          this.clearCart();
          this.isAddressFormOpen = false; // close modal
          this.router.navigate(['/']); // redirect to home
        },
        error: (err) => {
          this.toaster.error(err.message || 'Something went wrong');
        },
      });
  }
}
