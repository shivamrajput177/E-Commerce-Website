import {
    CART_ADD_ITEM, CART_REMOVE_ITEM, CART_SAVE_PAYMENT_METHOD, CART_SAVE_SHIPPING_ADDRESS
  } from '../constants/cartConstants'
  
 const DEFAULT_STATE = {
    cartItems : [],
    shippingAddress: {}
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
        case CART_SAVE_SHIPPING_ADDRESS:
          return {
            ...state,
            shippingAddress: action.payload,
          } 
        case CART_SAVE_PAYMENT_METHOD:
          return {
            ...state,
            paymentMethod: action.payload,
          }
      default:
        return state
    }
  }