import {
    CART_ADD_ITEM, CART_REMOVE_ITEM
  } from '../constants/cartConstants'
  
 const DEFAULT_STATE = {
    cartItems : []
  }

  export const cartReducer = (
    state = DEFAULT_STATE,
    action
  ) => {
    switch (action.type) {
      case CART_ADD_ITEM:
        const item = action.payload
      //  console.log(state)
      //  console.log("hellooo")
      
      if(state.cartItems === null)
      {
           console.log('gdewd')
           return {...state,cartItems: [item]}
      } 
      else{
        const existItem = state.cartItems.find((x) => x.product === item.product)
        if (existItem) {
          return {
            ...state,
            cartItems: state.cartItems.map((x) =>
              x.product === existItem.product ? item : x
            )
          }
        } else {
          return {
            ...state,
            cartItems: [...state.cartItems, item]
          }
        }
      }
      case CART_REMOVE_ITEM:
        return {
          ...state,
          cartItems: state.cartItems.filter((x) => x.product !== action.payload),
        }
        
      default:
        return state
    }
  }