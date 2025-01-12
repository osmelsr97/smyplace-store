import { create } from "zustand";
import { persist } from "zustand/middleware";

interface State {
  address: {
    address: string;
    address2: string;
    country: string;
    city: string;
    firstName: string;
    lastName: string;
    phone: string;
    postalCode: string;
  };

  // Methods
  setAddress: (address: State["address"]) => void;
}

export const useAddressStore = create<State>()(
  persist(
    (set) => ({
      address: {
        firstName: "",
        lastName: "",
        address: "",
        address2: "",
        city: "",
        postalCode: "",
        phone: "",
        country: "",
      },

      setAddress(address) {
        set({ address });
      },
    }),
    { name: "address-storage" }
  )
);
