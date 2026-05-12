import { useEffect, useState } from 'react'
import { useUserStore } from '../api/getProduct'
import type { ICart } from '../types/product'
import toast from 'react-hot-toast'
import { IMaskInput } from 'react-imask'
import DOMPurify from "dompurify"

const Cart = () => {

    const {
        data,
        getUsers,
        deleteCart,
        getCart,
        cart
    } = useUserStore()

    const [phone, setPhone] = useState("")

    useEffect(() => {
        getCart()
        getUsers()
    }, [])

    const addedProducts = data.filter((item) =>
        cart.some((cartItem: ICart) => cartItem.productId === item.id)
    )

    const handleOrder = () => {

        if (cart.length === 0) {
            toast.error("Корзина пустая")
            return
        }

        const clearPhone = DOMPurify.sanitize(phone)

        const numbersOnly = clearPhone.replace(/\D/g, "")

        if (numbersOnly.length !== 11) {
            toast.error("Введите номер полностью")
            return
        }

        deleteCart()

        toast.success("Заказ оформлен")
    }

    return (
        <div className='bg-[#222222] flex justify-center  '>

            <div className='bg-[#D9D9D9] lg:w-105 w-[90%] lg:mt-5 rounded-2xl p-4'>

                <h1 className='text-3xl font-bold mb-5 text-black'>
                    Добавленные товары
                </h1>

                {
                    addedProducts.map((item) => {

                        const cartItem = cart.find(
                            (c: ICart) => c.productId === item.id
                        )

                        const price = item.price

                        return (
                            <div
                                key={item.id}
                                className='flex justify-between items-center mb-2'
                            >

                                <div>

                                    <h1 className='text-black text-lg'>
                                        {item.name}
                                    </h1>

                                    <p className='text-black text-sm'>
                                        x{cartItem?.count}
                                    </p>

                                </div>

                                <p className='text-black text-lg'>
                                    {price * (cartItem?.count || 0)}₽
                                </p>

                            </div>
                        )
                    })
                }

                <div className='flex flex-col lg:flex-row gap-3 mt-5'>

                    <IMaskInput
                        mask="+7 (000) 000-00-00"
                        value={phone}
                        onAccept={(value) => setPhone(value)}
                        placeholder="+7 (___) ___-__-__"
                        className='bg-[#1E1E1E] text-white w-full h-12 rounded-xl px-4 placeholder:text-white outline-none'
                    />

                    <button
                        onClick={handleOrder}
                        className='bg-[#1E1E1E] text-white px-6 h-12 rounded-xl text-xl'
                    >
                        заказать
                    </button>

                </div>

            </div>

        </div>
    )
}

export default Cart