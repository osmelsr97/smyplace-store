import { create } from "zustand";
import { persist } from "zustand/middleware";

import type { CartProduct } from "@/interfaces/product.interface";

interface State {
  cart: CartProduct[];

  clearCart: () => void;
  getTotalItems: () => number;
  addProductToCart: (product: CartProduct) => void;
  updateProductQuantity: (product: CartProduct, quantity: number) => void;
  removeProduct: (product: CartProduct) => void;
  getSummaryInformation: () => {
    itemsInCart: number;
    subTotal: number;
    tax: number;
    total: number;
  };
}

export const useCartStore = create<State>()(
  persist(
    (set, get) => ({
      cart: [],

      //Methods

      getTotalItems: () => {
        const { cart } = get();

        return cart.reduce((acc, curr) => acc + curr.quantity, 0);
      },

      getSummaryInformation: () => {
        const { cart } = get();

        const subTotal = cart.reduce(
          (subTotal, product) => product.quantity * product.price + subTotal,
          0
        );

        const tax = subTotal * 0.15;
        const total = subTotal + tax;
        const itemsInCart = cart.reduce((acc, curr) => acc + curr.quantity, 0);

        return {
          itemsInCart,
          subTotal,
          tax,
          total,
        };
      },

      addProductToCart: (product: CartProduct) => {
        const { cart } = get();

        const productInCart = cart.some(
          (item) => item.id === product.id && item.size === product.size
        );

        if (!productInCart) {
          set({ cart: [...cart, product] });
          return;
        }

        const updateCartProducts = cart.map((item) => {
          if (item.id === product.id && item.size === product.size) {
            return { ...item, quantity: item.quantity + product.quantity };
          }

          return item;
        });

        set({ cart: updateCartProducts });
      },

      updateProductQuantity(product, quantity) {
        const { cart } = get();

        const updateCartProducts = cart.map((item) => {
          if (item.id === product.id && item.size === product.size) {
            return { ...item, quantity };
          }

          return item;
        });

        set({ cart: updateCartProducts });
      },

      removeProduct: (product: CartProduct) => {
        const { cart } = get();
        const updatedCartProducts = cart.filter(
          (item) => item.id !== product.id || item.size !== product.size
        );

        set({ cart: updatedCartProducts });
      },

      clearCart: () => {
        set({ cart: [] });
      },
    }),
    {
      name: "shopping-cart",
    }
  )
);
