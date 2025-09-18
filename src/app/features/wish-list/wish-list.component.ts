import { Component, inject, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { WishlistService } from '../../core/services/wishList.service';
import { Product } from '../../core/models/api.interface';
import { CartService } from '../../core/services/cart.service';
import { CartLoaderComponent } from "../../shared/components/cart-loader/cart-loader.component";

@Component({
  selector: 'app-wish-list',
  templateUrl: './wish-list.component.html',
  styleUrls: ['./wish-list.component.css'],
  imports: [CartLoaderComponent],
})
export class WishListComponent implements OnInit {
  isLoading = false;
  wishData: Product[] | null = null;
  private wishListService = inject(WishlistService);
  private toaster = inject(ToastrService);
  private cartService = inject(CartService);

  ngOnInit(): void {
    this.isLoading = true;
    this.wishListService.getUserWishList().subscribe({
      next: () => (this.isLoading = false),
      error: () => (this.isLoading = false),
    });
    this.wishListService.wishlist$.subscribe((data) => {
      this.wishData = data;
    });
  }

  deleteProduct(id: string) {
    this.wishListService.removeFromWishList(id).subscribe({
      error: (error) => {
        this.toaster.error(error.message);
      },
    });
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
