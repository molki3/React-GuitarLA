import Header from "./components/Header"
import Guitar from "./components/Guitar"
import { useState, useEffect } from "react"
import { db } from "./data/db";
import Footer from "./components/Footer";


function App() {

  //State
  const [data, setData] = useState(db);
  const [cart, setCart] = useState([]);

  //Effect
  /*useEffect(() => {
    setData(db);
  }, []);*/

  const addToCart = (item) => {

    const itemExists = cart.findIndex(guitar => guitar.id == item.id);
    
    if(itemExists>=0){
      const updatedCart = [...cart];
      updatedCart[itemExists].quantity++;
      setCart(updatedCart);
    }
    else {
      item.quantity=1;
      setCart([...cart, item]);
    }

  }

  return (
    <>
      <Header
        cart={cart}
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
