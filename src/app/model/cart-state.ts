import { CartItem } from "./cart-items";

export interface CartState {
    cartItems: CartItem[];
    loading: boolean;
    error: string | null
}
