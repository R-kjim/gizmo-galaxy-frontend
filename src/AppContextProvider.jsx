import React, { createContext, useState } from 'react'


export const AppContext=createContext()
const AppContextProvider = (props) => {
    const [cartTotals,setCartTotals]=useState(localStorage.getItem("cart")?JSON.parse(localStorage.getItem("cart")).length: 0)
    const [userData,setUserData]=useState(null)
    const userId=localStorage.getItem("userId")
    const [cartItems,setCartItems]=useState(localStorage.getItem("cart")?JSON.parse(localStorage.getItem("cart")):[]) //state to manage adding of items in the cart
    const [inCart,setInCart]=useState(false)



    // function responsible for adding an item to cart and persisting the data
    function cartManageFn(product){
        function addToCartFn(product){
            product.quantity=1
            JSON.parse(localStorage.getItem("cart")).find(item=>item.id===product.id)?
            setCartItems(cartItems.filter(item=>item.id!==product.id))
            :
            setCartItems([...cartItems,product])
            setInCart(true)
            addToSTore(product)
          }
          function addToSTore(product){
            cartItems.find(item=>item.id===product.id)?
            localStorage.setItem('cart',JSON.stringify(cartItems.filter(item=>item.id!==product.id))):
            localStorage.setItem('cart',JSON.stringify([...cartItems,product]))
            value.setCartTotals(JSON.parse(localStorage.getItem("cart")).length)
      
          }
        addToCartFn(product)
    }
    const value={
        cartTotals,setCartTotals,userData,setUserData,cartManageFn,cartItems,setCartItems
    }
  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  )
}

export default AppContextProvider
