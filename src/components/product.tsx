import  { useEffect } from 'react'
import { useUserStore } from '../api/getProduct'

export const Products = () => {

    const {
        data,
        cart,
        getUsers,
        getCart,
        incrementCart,
        decrementCart
    } = useUserStore()

    useEffect(() => {
        getUsers()
        getCart()
    }, [])

    return (
        <div className='bg-[#222222]'>

            <div className='grid grid-cols-2 lg:grid-cols-3 gap-5 p-4 max-w-7xl m-auto'>

                {data?.map((e) => {

                    const product = cart.find(
                        (item: any) => item.productId === e.id
                    )

                    const count = product?.count || 0

                    const price = e.price

                    return (
                        <div
                            key={e.id}
                            className='flex flex-col gap-4 bg-[#D9D9D9] p-4 rounded-3xl'
                        >
                            <img
                                className='rounded-3xl w-full h-60 object-cover'
                                src={e.image}
                                alt=""
                            />

                            <h1 className='text-lg md:text-2xl font-bold'>
                                {e.name}
                            </h1>

                            <p className='text-sm md:text-base'>
                                {e.description}
                            </p>

                            <p className='text-center text-xl md:text-2xl font-bold'>
                                {price} ₽
                            </p>

                            {
                                count === 0 ? (
                                    <button
                                        onClick={() => incrementCart(e.id)}
                                        className='bg-[#222222] text-white py-3 rounded-2xl text-lg'
                                    >
                                        купить
                                    </button>
                                ) : (
                                    <div className='flex gap-2'>

                                        <button
                                            onClick={() => decrementCart(e.id)}
                                            className='bg-[#222222] text-white w-full py-3 rounded-2xl text-xl'
                                        >
                                            -
                                        </button>

                                        <button
                                            className='bg-[#222222] text-white w-full py-3 rounded-2xl text-xl'
                                        >
                                            {count}
                                        </button>

                                        <button
                                            onClick={() => incrementCart(e.id)}
                                            className='bg-[#222222] text-white w-full py-3 rounded-2xl text-xl'
                                        >
                                            +
                                        </button>

                                    </div>
                                )
                            }

                        </div>
                    )
                })}

            </div>

        </div>
    )
}