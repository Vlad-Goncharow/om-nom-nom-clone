import {cartReducer} from './reducers/cartReducer'
import { additionalPopupReducer } from './reducers/additionalPopup';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
  cartReducer,
  additionalPopup: additionalPopupReducer
})

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))

export default store