import { CartItem } from "./cart-items";
export type OrderStatus = | 'Shipping' | 'Confirmed' | 'Delivered' | 'Cancelled';
export interface Order {
    id: number;
    items: CartItem[];
    customer: {
        name: string;
        phone: string;
        address:string;
        city: string;
        state: string;
        pincode: string;
    }
    paymentMethod: string;

    totalQuantity: number;
    totalPrice: number

    orderDate: string;
    status: OrderStatus
}
