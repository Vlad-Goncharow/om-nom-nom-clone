import React from 'react'
import { AppContext } from '../../App';
import CartItem from '../CartItem';
import styles from './Drawer.module.scss'
function Drawer() {
  const { setCartPopup, cartPopup, dateCart } = React.useContext(AppContext);
  
  return (
      <div className={`${styles.popup} ${cartPopup ? styles.openPopup : ""}`}>
      <div className={styles.cartPopupWrapper}>
        <div className={styles.close} onClick={() => setCartPopup(false)} ></div>
        {
          dateCart.length >= 1 ?
          <>
            <div className={styles.list}>
              {
                dateCart.map((item, i) => (
                  <CartItem key={`Товар #${i}`} item={item} />
                ))
              }
            </div>
            <div className={styles.buy}>
                Оформить заказ - {dateCart.reduce((sum, obj) => obj.priceAllProducts + sum, 0)} грн
            </div>
          </>
          :
          <div className={styles.emptyCart}>
            <img src="/img/empty-cart.png" alt="" />
            <h2>Вы еще ничего не заказывали</h2>
            <p>В нашем меню много всякого всего. Так закажите же что-нибудь!</p>
            <button onClick={() => setCartPopup(false)}>Продолжить покупки</button>
          </div>
        }
      </div>
    </div>
  )
}

export default Drawer
