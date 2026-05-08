import { create } from "zustand"
import { axiosCards, axiosRequest } from "../utils/url"
import type { IData, IUseStore, ICart } from "../types/product"
import toast from "react-hot-toast"

export const useUserStore = create<IUseStore>((set, get) => ({
     
    data: [],
    cart:[],
    loading: false,

    getUsers: async () => {
        try {

            const { data } = await axiosRequest.get<IData[]>('')

            set({ data })

        } catch (error) {
            console.log(error)
        }
    },

    getCart: async () => {
        try {

            const { data } = await axiosCards.get<ICart[]>('')

            set({ cart: data })

        } catch (error) {
            console.log(error)
        }
    },

    incrementCart: async (productId: number) => {
        try {

            const product = get().cart.find(
                (item:any) => item.productId === productId
            )

            if (product) {

                await axiosCards.patch(`/${product.id}`, {
                    count: product.count + 1
                })
                toast.success('Товар добавлен')
            } else {

                await axiosCards.post('', {
                    productId,
                    count: 1
                })

            }

            get().getCart()

        } catch (error) {
            console.log(error)
        }
    },
    decrementCart: async (productId: number) => {
        try {
            const product = get().cart.find(
                (item:any) => item.productId === productId
            )

            if (!product) return

            if (product.count <= 1) {

                await axiosCards.delete(`/${product.id}`)
                toast.success('Товар успешно удален')
            } else {

                await axiosCards.patch(`/${product.id}`, {
                    count: product.count - 1
                })
                toast.success('Товар успешно удален')
            }

            get().getCart()

        } catch (error) {
            console.log(error)
        }
    }

}))