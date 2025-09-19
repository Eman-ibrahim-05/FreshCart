import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  { path: '', renderMode: RenderMode.Prerender },
  { path: 'home', renderMode: RenderMode.Prerender },
  { path: 'login', renderMode: RenderMode.Prerender },
  { path: 'register', renderMode: RenderMode.Prerender },
  { path: 'reset-password', renderMode: RenderMode.Prerender },

  { path: 'products', renderMode: RenderMode.Server },
  { path: 'categories', renderMode: RenderMode.Server },
  { path: 'brands', renderMode: RenderMode.Server },
  { path: 'cart', renderMode: RenderMode.Server },
  { path: 'wish-list', renderMode: RenderMode.Server },
  { path: 'allorders', renderMode: RenderMode.Server },
  { path: 'product-details/:id', renderMode: RenderMode.Server },

  { path: '**', renderMode: RenderMode.Server },
];
