
export interface ICart {
    id: number
    productId: number
    count: number
}

export interface ICartStore {
    getCart: () => void
    cart: ICart[]
}