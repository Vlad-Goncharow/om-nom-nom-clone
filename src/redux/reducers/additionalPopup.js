import {
  OPEN_POPUP,
  CLOSE_POPUP
} from "../types/additionalPopup"


const initialState = {
  popup: false,
}

export const additionalPopupReducer = (state = initialState, action) => {
  switch (action.type) {
    case OPEN_POPUP:
      return {
        ...state,
        popup: true
      }
    case CLOSE_POPUP:
      return {
        ...state,
        popup: false
      }
    default:
      return state
  }
}