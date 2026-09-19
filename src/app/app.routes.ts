import { Routes } from '@angular/router';
import { Login } from './features/auth/pages/login/login';
import { Register } from './features/auth/pages/register/register';
import { MainLayout } from './layouts/main-layout/main-layout';
import { Home } from './features/home/pages/home/home';
import { BookDetail } from './features/books/pages/book-detail/book-detail';
export const routes: Routes = [

  {
    path:'',
    component: MainLayout,
    children:[
 { path: '', component: Home },
 {path:'book-detail',component:BookDetail,
  
 }
    ]
  },
{
    path: 'login',
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
