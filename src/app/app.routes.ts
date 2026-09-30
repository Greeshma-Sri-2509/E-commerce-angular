import { mapToCanActivate, Routes } from '@angular/router';
import { Products } from './Components/products/products';
import { Cart } from './Components/cart/cart';
import { ProductDetail } from './Components/product-detail/product-detail';
import { Account } from './Components/account/account';
import { Profile } from './Components/profile/profile';
import { Orders } from './Components/orders/orders';
import { WishList } from './Components/wish-list/wish-list';
import { authGuard } from './auth-guard';
import { productResolver } from './product-resolver';
import { AdminDashboard } from './Admin/admin-dashboard/admin-dashboard';
import { AdminProducts } from './Admin/admin-products/admin-products';
import { Sidebar } from './Admin/sidebar/sidebar';
import { AddProduct } from './Admin/add-product/add-product';
import { Checkout } from './Components/checkout/checkout';
import { OrderDetails } from './Components/order-details/order-details';
import { AdminOrders } from './Admin/admin-orders/admin-orders';
import { Login } from './User/login/login';
import { OrderStatusChart } from './order-status-chart/order-status-chart';


export const routes: Routes = [
    {
        path: 'login', component:Login
    },
    {
        path: 'product', component: Products
    },
    {
        path: 'cart', component: Cart, canActivate: [authGuard]
    },
    {
        path: 'product/:id',
        component: ProductDetail,
        resolve: {
            product: productResolver
        }
    },
    {
        path: 'account', component: Account, canActivate: [authGuard],
        children: [
            {
                path: 'profile', component: Profile
            },
            {
                path: 'orders', component: Orders
            },
            {
                path: 'wishlist', component: WishList
            },
            {
                path:'orders/:id', component:OrderDetails
            }
        ]
    },
    {
        path:'admin', component:AdminDashboard, 
        children:[
            {
                path:'products', component:AdminProducts
            },
            {
                path:'orders', component:AdminOrders
            },
            {
                path:'order-status', component:OrderStatusChart
            }
        ]
    },
    {
        path:'addProduct', component:AddProduct
    },
    {
        path:'checkout', component:Checkout
    },
    
];
