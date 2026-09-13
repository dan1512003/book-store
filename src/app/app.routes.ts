import { Routes } from '@angular/router';
import { Login } from './features/auth/pages/login/login';
import { Register } from './features/auth/pages/register/register';
import { Home } from './features/home/pages/home/home';
export const routes: Routes = [
{
    path: '',
    component: Login
  },
  {
    path: 'register',
    component: Register

  }
// {
//     path: '',
//     component: Home
// }
];
