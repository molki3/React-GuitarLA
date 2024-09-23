import Header from "./components/Header"
import Guitar from "./components/Guitar"
import { useState, useEffect } from "react"
import { db } from "./data/db"
import Footer from "./components/Footer"


function App() {
 
  //Initial States
  const initialCart = () => {
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

  const addToCart = (item) => {

    const itemExists = cart.findIndex(guitar => guitar.id == item.id)
    
    if(itemExists >= 0){
      if(cart[itemExists].quantity >= MAX_ITEMS) return
      const updatedCart = [...cart]
      updatedCart[itemExists].quantity++
      setCart(updatedCart)
    }
    else {
      item.quantity=1;
      setCart([...cart, item])
    }
  }

  const removeItem = id => {
    setCart(prevCart => prevCart.filter(guitar => guitar.id !== id))
  }

  const increaseQuantity = id => {
    const updatedCart = cart.map(item => {
      if(item.id === id && item.quantity<MAX_ITEMS) {
        return {
          ...item,
          quantity: item.quantity + 1
        }
      }
      return item;
    })
    setCart(updatedCart);
  }

  const decreaseQuantity = id => {
    const updatedCart = cart.map(item => {
      if(item.id === id && item.quantity > MIN_ITEMS){
        return{
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

  return (
    <>
      <Header
        cart={cart}
        removeItem={removeItem}
        increaseQuantity={increaseQuantity}
        decreaseQuantity={decreaseQuantity}
        clearCart={clearCart}
      />
      
      <main className="container-xl mt-5">
          <h2 className="text-center">Nuestra Colección</h2>
          <div className="row mt-5">
            {
              data.map(guitar => (
                <Guitar
                  key={guitar.id}
                  guitar={guitar}
                  cart={cart}
                  addToCart={addToCart}
                />
              ))
            }
          </div>
      </main>

      <Footer/>
    </>
  )
}

export default App
