import React, { createContext, useEffect, useState } from 'react'


export const AppContext=createContext()
const AppContextProvider = (props) => {
    const [cartTotals,setCartTotals]=useState(localStorage.getItem("cart")?JSON.parse(localStorage.getItem("cart")).length: 0)
    const [userData,setUserData]=useState(null)
    const [userId,setUserId]=useState(localStorage.getItem("userId"))
    const [cartItems,setCartItems]=useState(localStorage.getItem("cart")?JSON.parse(localStorage.getItem("cart")):[]) //state to manage adding of items in the cart
    const [inCart,setInCart]=useState(false)
    const [categories,setCategories]=useState([])
    const [taxes,SetTaxes]=useState([])
    const [products,setProducts]=useState([])

    //useefect to fetch user data once they are successfully logged in
    useEffect(()=>{
      fetch(`http://127.0.0.1:5000/user/${userId}`,{
        method:"GET",
        headers:{
          "Authorization":`Bearer ${localStorage.getItem("access_Token")}`,
        },
      })
      .then(res=>res.json())
      .then(data=>setUserData(data))

    },[userId])

    //useeffect to fetch product categories and tax categories
    useEffect(()=>{
      //fetch product categories
      fetch("http://127.0.0.1:5000/categories")
      .then(res=>res.json())
      .then(data=>setCategories(data))
      //fetch tax categories
      fetch("http://127.0.0.1:5000/tax-category")
      .then(res=>res.json())
      .then(data=>SetTaxes(data))
      //fetch products
      fetch("http://127.0.0.1:5000/products")
      .then(res=>res.json())
      .then(data=>setProducts(data))
    },[])
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
        cartTotals,setCartTotals,userData,setUserData,cartManageFn,cartItems,setCartItems,
        categories,setCategories,taxes,SetTaxes,products,setProducts,setUserId
    }
  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  )
}

export default AppContextProvider
