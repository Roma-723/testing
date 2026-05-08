// components/Cart.tsx

import  { useEffect } from 'react'
import { useUserStore } from '../api/getProduct'
import type { ICart } from '../types/product'
import { useCartStore } from '../api/getBasket'

const Cart = () => {

    const { cart, getCart } = useCartStore()
    const { data, getUsers } = useUserStore()

    useEffect(() => {
        getCart()
        getUsers()
    }, [])

    const addedProducts = data.filter((item) =>
        cart.some((cartItem:ICart) => cartItem.productId === item.id)
    )

    const totalPrice = addedProducts.reduce((acc, item) => {

        const cartItem = cart.find(
            (c:ICart) => c.productId === item.id
        )

        const price = item.price

        return acc + (price * (cartItem?.count || 0))

    }, 0)

    return (
        <div className='bg-[#D9D9D9]'>

            <div className=''>

                <h1 className='text-3xl font-bold mb-5'>
                    Добавленные товары
                </h1>

                {
                    addedProducts.map((item) => {

                        const cartItem = cart.find(
                            (c:ICart) => c.productId === item.id
                        )

                        const price = item.price

                        return (
                            <div
                                key={item.id}
                                className=''
                            >

                                <div>

                                    <h1 className='text-xl font-bold'>
                                        {item.name}
                                    </h1>

                                    <p className='text-lg'>
                                        x{cartItem?.count}
                                    </p>

                                </div>

                                <p className='text-2xl font-bold'>
                                    {price * (cartItem?.count || 0)}₽
                                </p>

                            </div>
                        )
                    })
                }

                <div className='flex justify-between items-center mt-6 mb-6'>

                    <h1 className='text-2xl font-bold'>
                        Общая сумма:
                    </h1>

                    <p className='text-3xl font-bold'>
                        {totalPrice}₽
                    </p>

                </div>

                <div className='flex gap-3 mt-5'>

                    <input
                        type="text"
                        name="phone"
                        placeholder='+7 (___) ___ __-__'
                        className='bg-[#222222] text-white w-full h-12 rounded-xl px-4 placeholder:text-white outline-none'
                    />

                    <button
                        className='bg-[#222222] text-white px-6 rounded-xl'
                    >
                        заказать
                    </button>

                </div>

            </div>

        </div>
    )
}

export default Cart 