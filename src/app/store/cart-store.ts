import { computed } from '@angular/core';
import {
    patchState,
    signalStore,
    withComputed,
    withMethods,
    withState,
} from '@ngrx/signals';
import { CartItem } from '../model/cart-items';
import { CartState } from '../model/cart-state';

export const CartStore = signalStore(
    { providedIn: 'root' },
    withState<CartState>({
        cartItems: [],
        loading: false,
        error: null,
    }),

    withComputed((store) => ({
        itemCount: computed(() => store.cartItems().length),
        totalPrice: computed(() => store.cartItems().reduce(
            (total, item) => total + item.price * item.quantity, 0
        )),
        totalQuantity: computed(() => store.cartItems().reduce(
            (total, item) => total + item.quantity, 0
        ))
    })),

    withMethods((store) => ({
        addItem(product: CartItem) {
            const currentCart = store.cartItems();

            const existingProduct = currentCart.find(
                (item) => item.id === product.id
            );

            if (existingProduct) {
                const updatedCart = currentCart.map((item) =>
                    item.id === product.id
                        ? {
                            ...item,
                            quantity: item.quantity + 1,
                        }
                        : item
                );

                patchState(store, {
                    cartItems: updatedCart,
                });
                localStorage.setItem('currentCart',JSON.stringify(updatedCart))
            } else {
                const updatedCart= [
                    ...currentCart,
                    product
                ]
                patchState(store, {
                    cartItems: updatedCart,
                });
                localStorage.setItem('currentCart', JSON.stringify(updatedCart))
            }
        },

        removeItem(id: number) {
            const updatedCart = store
                .cartItems()
                .filter((item) => item.id !== id);
            patchState(store, {
                cartItems: updatedCart,
            });
            localStorage.setItem('currentCart', JSON.stringify(updatedCart))
            
            
        },

        increaseItem(id: number) {
            const updatedCart = store.cartItems().map((item) =>
                item.id === id
                    ? {
                        ...item,
                        quantity: item.quantity + 1,
                    }
                    : item
            );

            patchState(store, {
                cartItems: updatedCart,
            });
            localStorage.setItem('currentCart', JSON.stringify(updatedCart))
        },

        decreaseItem(id: number) {
            const currentCart = store.cartItems();

            const existingProduct = currentCart.find(
                (item) => item.id === id
            );

            if (!existingProduct) {
                return;
            }

            if (existingProduct.quantity === 1) {
                const updatedCart = currentCart.filter(
                    (item) => item.id !== id
                );

                patchState(store, {
                    cartItems: updatedCart,
                });
                localStorage.setItem('currentCart', JSON.stringify(updatedCart))
                return;
            }

            const updatedCart = currentCart.map((item) =>
                item.id === id
                    ? {
                        ...item,
                        quantity: item.quantity - 1,
                    }
                    : item
            );

            patchState(store, {
                cartItems: updatedCart,
            });
            localStorage.setItem('currentCart', JSON.stringify(updatedCart))
        },

        clearCart() {
            patchState(store, {
                cartItems: [],
            });
            localStorage.removeItem('currentCart')
        },
        saveCart() {
            const currentCart = store.cartItems()
            localStorage.setItem('currentCart', JSON.stringify(currentCart))

        },
        loadCart() {
            const saved = localStorage.getItem('currentCart')
            if (saved) {
                const cartItems = JSON.parse(saved)
                patchState(store, {
                    cartItems
                });
                
            }else{
                patchState(store,{
                    cartItems: []
                })
            }

        }
    }))
);