import {
  SET_CART_POPUP,
  ADD_TO_CART,
  INCR_TO_CART,
  DECR_TO_CART
} from "../types/cartTypes";

export const setCartPopup = (value) => {
  return {
    type:SET_CART_POPUP,
    payload:value
  }
}

export const addingToCart = (obj) => {
  return {
    type: ADD_TO_CART,
    payload: obj
  }
}

export const incrementItem = (obj) => {
  return {
    type: INCR_TO_CART,
    payload: obj
  }
}

export const dicrementItem = (obj) => {
  return {
    type: DECR_TO_CART,
    payload: obj
  }
}