import React from 'react'
import CartItem from '../CartItem';
import styles from './Drawer.module.scss'
import {useSelector, useDispatch} from 'react-redux'
import { setCartPopup } from '../../redux/actions/cartActions';


function Drawer() {
  
  const dispatch = useDispatch()
  let cartPopup = useSelector(state => state.cartReducer.cartPopup)
  let cartItems = useSelector(state => state.cartReducer.cartItems)

  return (
      <div className={`${styles.popup} ${cartPopup ? styles.openPopup : ""}`}>
      <div className={styles.cartPopupWrapper}>
        <div className={styles.close} onClick={() => dispatch(setCartPopup(false))} ></div>
        {
          cartItems.length >= 1 ?
          <>
            <div className={styles.list}>
              {
                cartItems.map((item, i) => (
                  <CartItem key={`Товар #${i}`} item={item} />
                ))
              }
            </div>
            <div className={styles.buy}>
                Оформить заказ - {cartItems.reduce((sum, obj) => obj.priceAllProducts + sum, 0)} грн
            </div>
          </>
          :
          <div className={styles.emptyCart}>
            <img src="/img/empty-cart.png" alt="" />
            <h2>Вы еще ничего не заказывали</h2>
            <p>В нашем меню много всякого всего. Так закажите же что-нибудь!</p>
            <button onClick={() => dispatch(setCartPopup(false))}>Продолжить покупки</button>
          </div>
        }
      </div>
    </div>
  )
}

export default Drawer
