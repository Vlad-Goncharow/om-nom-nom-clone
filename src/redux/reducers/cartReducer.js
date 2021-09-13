import {
  SET_CART_POPUP,
  ADD_TO_CART,
  INCR_TO_CART,
  DECR_TO_CART
} from "../types/cartTypes"


const initialState = {
  cartPopup:false,
  cartItems:[]
}

export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CART_POPUP:
      return {...state, cartPopup: action.payload}
    case ADD_TO_CART:
      const findItem = state.cartItems.find(item => item.price === action.payload.price && item.name === action.payload.name)
      if (findItem) {
        return {...state,cartItems: state.cartItems.map(item => {
          if (item.price === action.payload.price && item.name === action.payload.name) {
            let count = item.count + 1;
            return{
              ...item,
              count: count,
              priceAllProducts: item.price * count
            }
            
          }
          return item
        })
      }
      } else {
        return {...state,cartItems: [...state.cartItems, action.payload]}
      }
    case INCR_TO_CART:
      return {...state,cartItems: state.cartItems.map((item, i) => {
          if (item.price === action.payload.price && item.name === action.payload.name) {
            let count = item.count + 1;
            return {
              ...item,
              count: count,
              priceAllProducts: item.price * count
            }
          }
          else return item
        })
      }
    case DECR_TO_CART:
      return {
        ...state,
        cartItems:state.cartItems.map(item =>{
          if (item.price === action.payload.price && item.name === action.payload.name) {
            let count = item.count - 1;
            return {
              ...item,
              count: count,
              priceAllProducts: item.price * count
            }
          }
          return item
        }).filter(el => el.count > 0)
      }
    default:
      return state
  }
}