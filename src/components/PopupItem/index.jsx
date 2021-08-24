import React from 'react'
import classNames from 'classnames'
import { AppContext } from '../../App';
import styles from './PopupItem.module.scss'

function PopupItem() {
  const { addToCart, setAdditionalPopup, date,additionalPopup, updateData } = React.useContext(AppContext);

  const pop = React.useRef()
  React.useEffect(() => {
    //Узнаем ширину скрола
    let div = document.createElement('div');
    div.style.overflowY = 'scroll';
    div.style.width = '50px';
    div.style.height = '50px';
    document.body.append(div);
    let scrollWidth = div.offsetWidth - div.clientWidth;
    div.remove();
    // =================================================
    if (additionalPopup) {
      pop.current.style.padding = `0 ${scrollWidth + 'px'} 0 0`;
    } else {
      pop.current.style.padding = '';
    }
  }, [additionalPopup])
  
  return (
    <div ref={pop} className={`${styles.popupWrapper} ${additionalPopup ? styles.visible : ''}`} >
      <div className={styles.popup} >
        <div className={styles.close} onClick={() => setAdditionalPopup(false)}></div>
        <div className={styles.imgWrapper}>
          <div className={styles.img}>
            <img src={date?.catProductImg} alt="" />
          </div>
        </div>
        <div className={styles.info}>
          <div className={styles.row}>
            <h5 className={styles.popupName}>{date?.catProductName}</h5>
            <span className={styles.weight}>{date?.catInfo?.catWeights[date.active]}</span>
          </div>
          <div className={styles.popupIngr}>{date?.catProductIngr}</div>
          {
            date?.catInfo?.catSizes ?
            <ul className={styles.popupSizeWrapper}>
              {
                date?.catInfo?.catSizes.map((item, index) => (
                  <li
                    className={classNames(styles.popupSize, date.active ===index ? styles.popupSizeActive : '')}
                    key={`${item}_${index}`}
                    onClick={() => updateData({...date, active:index})}
                  >
                    {item}
                  </li>
                ))
              }
            </ul>
            : 
            null
          }
          <div className={styles.popupPrice}>{date?.catInfo?.catPrices[date.active]}</div>
          <div className={styles.popupBuy} onClick={() => {
            addToCart({
              img: date.catProductImg,
              ingr: date.catProductIngr,
              name: date.catProductName,
              count: 1,
              parentId: date.catProductId,
              size: date.catInfo.catSizes ? date.catInfo.catSizes[date.active] : null,
              price: date.catInfo.catPrices[date.active],
              priceAllProducts: date.catInfo.catPrices[date.active],
              parent: date.parent
            })
          }}>В корзину</div>
        </div>
      </div>
    </div>
  )
}

export default PopupItem
