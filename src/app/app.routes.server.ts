import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  { path: '', renderMode: RenderMode.Prerender },
  { path: 'home', renderMode: RenderMode.Prerender },
  { path: 'login', renderMode: RenderMode.Prerender },
  { path: 'register', renderMode: RenderMode.Prerender },
  { path: 'reset-password', renderMode: RenderMode.Prerender },

  { path: 'products', renderMode: RenderMode.Prerender },
  { path: 'categories', renderMode: RenderMode.Prerender },
  { path: 'brands', renderMode: RenderMode.Prerender },
  { path: 'cart', renderMode: RenderMode.Prerender },
  { path: 'wish-list', renderMode: RenderMode.Prerender },
  { path: 'allorders', renderMode: RenderMode.Prerender },
  { path: 'product-details/:id', renderMode: RenderMode.Server },

  { path: '**', renderMode: RenderMode.Server },
];
