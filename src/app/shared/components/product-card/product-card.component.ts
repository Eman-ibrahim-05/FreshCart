import { Component, inject, Input, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Product } from '../../../core/models/api.interface';
import { CartService } from '../../../core/services/cart.service';
import { WishlistService } from '../../../core/services/wishList.service';
import { CommonModule } from '@angular/common';
import { TextPipe } from '../../pipes/text-pipe';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [RouterLink, CommonModule, TextPipe],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css',
})
export class ProductCardComponent implements OnInit {
  private cartService = inject(CartService);
  private wishListService = inject(WishlistService);
  private toaster = inject(ToastrService);

  @Input()
  product: Product = {} as Product;

  wishlistIds: string[] = [];

  ngOnInit(): void {
    this.wishListService.getUserWishList().subscribe({
      next: (res) => {
        this.wishlistIds = res.data.map((p: any) => p._id);
      },
      error: () => {
        this.wishlistIds = [];
      },
    });
  }

  isInWishlist(productId: string): boolean {
    return this.wishlistIds.includes(productId);
  }

  toggleWishlist(productId: string) {
    if (this.isInWishlist(productId)) {
      this.wishListService.removeFromWishList(productId).subscribe({
        next: (response) => {
          this.toaster.success(response.message);
          this.wishlistIds = this.wishlistIds.filter((id) => id !== productId);
        },
        error: (error) => {
          this.toaster.error(error.message);
        },
      });
    } else {
      this.wishListService.addToWishList(productId).subscribe({
        next: () => {
          this.toaster.success('Added to wishlist');
          this.wishlistIds.push(productId);
        },
        error: (err) => {
          this.toaster.error(err.message || 'Error adding');
        },
      });
    }
  }

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
