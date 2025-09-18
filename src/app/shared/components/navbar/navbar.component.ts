import { Component, inject } from '@angular/core';
import { FlowbiteService } from '../../../core/services/flowbite.service';
import { initFlowbite } from 'flowbite';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  isLogin = false;

  pages: { title: string; path: string }[] = [
    { path: 'home', title: 'Home' },
    { path: 'products', title: 'Products' },
    { path: 'categories', title: 'Categories' },
    { path: 'brands', title: 'Brands' },
  ];

  authPages: { title: string; path: string }[] = [
    { path: 'login', title: 'Login' },
    { path: 'register', title: 'Register' },
  ];

  cartPage: { title: string; path: string } = { path: 'cart', title: 'Cart' };

  wishListPage: { title: string; path: string } = {
    path: 'wish-list',
    title: 'WishList',
  };

  private flowbiteService = inject(FlowbiteService);
  private authService = inject(AuthService);

  ngOnInit(): void {
    this.flowbiteService.loadFlowbite((flowbite) => {
      initFlowbite();
    });

    this.authService.userData.subscribe({
      next: (user) => {
        console.log(user, 'navbar');
        if (user != null) this.isLogin = true;
        else this.isLogin = false;
      },
    });
  }

  logOut() {
    this.authService.logOut();
  }
}
