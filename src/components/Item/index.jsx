import React, { useState } from 'react'
import classNames from 'classnames'
import zoomimg from '../../assets/img/zoom-in.svg'
import { AppContext } from '../../App'
import styles from './Item.module.scss'


function Item({ item, parent }) {
  const { addToCart, updateData, setAdditionalPopup} = React.useContext(AppContext);
  //Для получения выбранного активного елемента типа размер
  let [active, setActive] = useState(0)
  let chenges = (index) => {
    setActive(index)
  }

  return (
    <div className={styles.item}>
      <div className={styles.itemWrapper}>
        <header className={styles.itemTop}>

          <div className={styles.itemImg}>
            <img src={item.catProductImg} alt="" />
            <div className={styles.hovered} onClick={() => {
              updateData({ ...item, parent, active })
              //Показываем увеличенную версию товара (попап)
              setAdditionalPopup(true)
            }}>
              <img src={zoomimg} alt="" />
            </div>
          </div>

        </header>
        <main className={styles.main}>

          <div className={styles.rowTop}>

            <div className={styles.name}>
              {item.catProductName}
            </div>

            <div className={styles.weight}>
              {item.catInfo.catWeights[active]} г.
            </div>

          </div>

          <div className={styles.ingridients}>
            {item.catProductIngr}
          </div>

          <div className={styles.sizesRow}>
            {
              item.catInfo.catSizes &&
              item.catInfo.catSizes.map((item, index) => (
                <div
                  key={`${item}_${index}`}
                  className={classNames(styles.sizes, active === index ? styles.sizesActive : '')}
                  onClick={() => chenges(index)}
                >
                  {item} см
                </div>
              ))
            }
          </div>

        </main>
        <footer className={styles.itemBottom}>
          <div className={styles.price}>
            {item.catInfo.catPrices[active]} грн
          </div>
          <div className={styles.itemBuy}
            onClick={() => {
              let parentId = item.catProductId
              addToCart({
                img: item.catProductImg,
                ingr: item.catProductIngr,
                name: item.catProductName,
                count: 1,
                parentId,
                ids: parentId,
                size: item.catInfo.catSizes ? item.catInfo.catSizes[active] : null,
                price: item.catInfo.catPrices[active],
                priceAllProducts: item.catInfo.catPrices[active],
                parent
              });
            }
            }
          >
            В корзину
          </div>
        </footer>
      </div>
    </div>
  )
}

export default Item