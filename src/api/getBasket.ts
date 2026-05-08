// store/useCartStore.ts

import { create } from "zustand"
import { axiosCards } from "../utils/url"
import type { ICart } from "../types/product"

interface ICartStore {
    cart: ICart[]
    getCart: () => Promise<void>
}

export const useCartStore = create<ICartStore>((set) => ({
    cart: [],

    getCart: async () => {
        try {
            const { data } = await axiosCards.get<ICart[]>("")

            set({ cart: data })

        } catch (error) {
            console.error(error)
        }
    }
}))