import { OPEN_POPUP,CLOSE_POPUP } from "../types/additionalPopup";

export const openPopup = () => {
  return{
    type:OPEN_POPUP
  }
}
export const closePopup = () => {
  return{
    type: CLOSE_POPUP
  }
}
