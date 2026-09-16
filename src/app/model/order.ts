import { CartItem } from "./cart-items";

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
    status: string
}
