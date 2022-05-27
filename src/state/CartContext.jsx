import React, { useState, createContext } from 'react';

export const CartContext = createContext({
    Cart : [],
    alertType : false,
    addToCart : () => {},
    deleteFromCart : () => {},
    decrement : () => {},
})

const CartProvider = (props) => {
    const [Cart, setCart] = useState([])   
    const [alertType, setAlert] = useState(false) 

    const addToCart = cartItem => {setCart(addItems(Cart,cartItem,setAlert))}
    const deleteFromCart = cartItem => {deleteItems(Cart,cartItem,setCart,setAlert)}
    const decrement = cartItem => {setCart(decreaseQuantity(Cart,cartItem))}

    return(
        <CartContext.Provider 
        value={{
            Cart,
            alertType,
            addToCart,
            deleteFromCart,
            decrement
        }}>
            {props.children}
        </CartContext.Provider>
    )
}

const addItems = (Cart, cartItem, setAlert) => {
    const checkCart = Cart.find(
        Cart => Cart.id === cartItem.id
    )

    if (checkCart){
        return Cart.map( Cart =>
            Cart.id === cartItem.id
            ?  {...Cart, count : Cart.count + 1}
            : Cart
        );        
    }else {
        Object.assign(cartItem, {count : 1})
        Cart = [...Cart, cartItem]        

        setAlert('success')
        setTimeout(() => {
            setAlert('false')
        }, 1500);
    }            

    return Cart
}

const deleteItems = (Cart, cartItem, setCart, setAlert) => {
    const checkCart = Cart.find(
        Cart => Cart.id === cartItem.id
    )

    if (checkCart){
        setCart(Cart.filter(Cart => Cart.id != cartItem.id))
        setAlert('delete')
        setTimeout(() => {
            setAlert('false')
        }, 1500);
    }
    
}

const decreaseQuantity = (Cart, cartItem) => {
    const checkCart = Cart.find(
        Cart => Cart.id === cartItem.id
    )

    if (checkCart){
        return Cart.map( Cart =>
            Cart.id === cartItem.id
            ?  {...Cart, count: Cart.count - 1}
            : Cart
        );
    }

    return [...Cart, cartItem ]
}

export default CartProvider;