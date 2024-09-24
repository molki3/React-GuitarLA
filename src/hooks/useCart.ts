import { useState, useEffect, useMemo } from "react"
import { db } from "../data/db"
import type { CartItemT, GuitarT } from "../types/types"


const useCart = () => {

    //Initial States
    const initialCart = () : CartItemT[] => {
        const localStorageCart = localStorage.getItem('cart')
        return localStorageCart ? JSON.parse(localStorageCart) : []
    }

    //State
    const [data] = useState(db)
    const [cart, setCart] = useState(initialCart)

    const MAX_ITEMS = 5;
    const MIN_ITEMS = 1;

    //Effect
    //Save in Local Storage
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart))
    }, [cart])

    //Effect
    /*useEffect(() => {
        setData(db);
    }, []);*/

    const addToCart = (item : GuitarT) => {

        const itemExists = cart.findIndex(guitar => guitar.id == item.id)

        if (itemExists >= 0) {
            if (cart[itemExists].quantity >= MAX_ITEMS) return
            const updatedCart = [...cart]
            updatedCart[itemExists].quantity++
            setCart(updatedCart)
        }
        else {
            const newItem : CartItemT = {...item, quantity: 1}
            setCart([...cart, newItem])
        }
    }

    const removeItem = (id : GuitarT['id']) => {
        setCart(prevCart => prevCart.filter(guitar => guitar.id !== id))
    }

    const increaseQuantity = (id : GuitarT['id']) => {
        const updatedCart = cart.map(item => {
            if (item.id === id && item.quantity < MAX_ITEMS) {
                return {
                    ...item,
                    quantity: item.quantity + 1
                }
            }
            return item;
        })
        setCart(updatedCart);
    }

    const decreaseQuantity = (id : GuitarT['id']) => {
        const updatedCart = cart.map(item => {
            if (item.id === id && item.quantity > MIN_ITEMS) {
                return {
                    ...item,
                    quantity: item.quantity - 1
                }
            }
            return item
        })
        setCart(updatedCart);
    }

    const clearCart = () => {
        setCart([]);
    }

    // Is the cart empty?
    const isEmpty = useMemo(() => cart.length === 0, [cart]); //renderize again when [deps] changes

    // Total Calculate
    const cartTotal = useMemo(() => cart.reduce((total, item) => total + (item.quantity * item.price), 0), [cart]);

    return {
        data,
        cart,
        addToCart,
        removeItem,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
        isEmpty,
        cartTotal
    }
}

export default useCart