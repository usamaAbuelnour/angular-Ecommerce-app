import { Routes } from '@angular/router';
import { HomeComponent } from './routes/home/components/home/home.component';
import { ProductDetailsComponent } from './routes/product-details/components/product-details/product-details.component';
import { LoginComponent } from './routes/login/components/login/login.component';
import { RegisterComponent } from './routes/register/components/register/register.component';
import { CartComponent } from './routes/cart/components/cart/cart.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'product-details/:id',
    component: ProductDetailsComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'cart',
    component: CartComponent
  }
];
