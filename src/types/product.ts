// types/product.ts

export interface IData {
    id: number
    name: string
    description: string
    image: string
    price: number
}

export interface ICart {
    id: number
    productId: number
    count: number
}

export interface IUseStore {
    data: IData[]
    cart: ICart[]

    loading: boolean

    getUsers: () => Promise<void>
    getCart: () => Promise<void>

    incrementCart: (productId: number) => Promise<void>
    decrementCart: (productId: number) => Promise<void>
}