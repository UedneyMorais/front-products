import { Routes } from '@angular/router';

export const routes: Routes = [

  {
    path: '',
    redirectTo: 'products',
    pathMatch: 'full'
  },
  {
    // AQUI ESTÁ A MUDANÇA: Usar loadComponent para um componente standalone
    path: 'products',
    loadComponent: () => import('./features/product-list/product-list.component').then(m => m.ProductListComponent)
  },
  {
    path: 'products/:slug',
    loadComponent: () => import('./features/product-detail/product-detail.component').then(m => m.ProductDetailComponent)
  },
  // {
  //   path: 'products/new', // Adicionei essa rota, caso você tenha um formulário de criação
  //   loadComponent: () => import('./features/product-form/product-form.component').then(m => m.ProductFormComponent)
  // },
  // {
  //   path: 'products/edit/:id', // E essa para edição, se tiver
  //   loadComponent: () => import('./features/product-form/product-form.component').then(m => m.ProductFormComponent)
  // },
  {
    path: '**',
    redirectTo: 'products'
  }
];
