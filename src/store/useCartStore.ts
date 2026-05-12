import { create } from "zustand"
import { axiosCards } from "../utils/url"
import type { IData } from "../types/product"

export interface ICartStore {
    cart: IData[]
    getCart: () => Promise<void>
}

export const useCartStore = create<ICartStore>((set, get) => ({

    cart: [],

    getCart: async () => {
        try {
            const oldCart = get().cart
            console.log(oldCart)
            const { data } = await axiosCards.get("")
            set({ cart: data })
        } catch (error) {
            console.error(error)
        }
    }
}))