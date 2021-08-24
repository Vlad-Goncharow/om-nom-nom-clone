import React from 'react'
import { AppContext } from '../../App';
import styles from './CartItem.module.scss'

function CartItem({ item }) {
  const { dicr, incr } = React.useContext(AppContext)
  return (
    <div className={styles.item}>
      <img src={item.img} alt="" className={styles.img} />
      <div className={styles.name}>{item.name}</div>
      <div className={styles.ingridients}>
        {item.ingr}
      </div>
      <div className={styles.size}>{item.size}</div>
      <div className={styles.row}>
        <div className={styles.lenghts}>
          <div className={styles.lenghtItem} onClick={() => dicr(item)}>
            <svg width="10" height="10" className="icon">
              <rect fill="#454B54" y="4" width="10" height="2" rx="1"></rect>
            </svg>
          </div>
          <div className={styles.lenghtValue}>{item.count}</div>
          <div className={styles.lenghtItem} onClick={() => incr(item)}>
            <svg width="10" height="10" className="icon">
              <g fill="#454B54"><rect x="4" width="2" height="10" ry="1"></rect><rect y="4" width="10" height="2" rx="1"></rect></g>
            </svg>
          </div>
        </div>
        <div
          className={styles.price}>
          {item.priceAllProducts ? item.priceAllProducts : item.price}
        </div>
      </div>
    </div>
  )
}

export default CartItem
