import React from 'react'
import { Link } from 'react-router-dom'
import { CatBd } from '../../data/CatData'
import card from '../../assets/img/cart.png'
import { AppContext } from '../../App'

import styles from './Header.module.scss'
import classNames from 'classnames'


function Header() {
  const { setCartPopup, dateCart, additionalPopup, cartPopup, setMediamenu, mediaMenu} = React.useContext(AppContext);
  const header = React.useRef()

  //Проскролилась ли страница больше высоты шапки
  const [headerScroled, setHeaderScroled] = React.useState(false)
  React.useEffect(() => {
    let headerHeight = header.current.scrollHeight;

    window.addEventListener('scroll', (e) => {
      if (window.scrollY >= headerHeight) {
        document.querySelector('#root').style.paddingTop = headerHeight + 'px'
        header.current.classList.add('fixed')
        setHeaderScroled(true)
      } else {
        document.querySelector('#root').style.paddingTop = 0 + 'px'
        header.current.classList.remove('fixed')
        setHeaderScroled(false)
      }
    })
  }, [])

  //добовление падинга что б при открыте не прагала страница
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

    //есл открыта корзина или попап, проверять фиксед ли у хедера, если да, добовляем ему падинг при открытии
    if (cartPopup || additionalPopup) {
      if (headerScroled) {
        header.current.style.padding = `0 ${scrollWidth + 'px'} 0 0`
      }
    } else {
      header.current.style.padding = ''
    }
  }, [cartPopup, additionalPopup, headerScroled])

  return (
    <div className={styles.header} ref={header} >
      <div className={styles.headerTop}>
        <div className={classNames(styles.container, headerScroled ? styles.fixed : '')}>
          <div className={styles.headerNav}>
            <div className={styles.addres}>
              Краматорск, ул.Марата 14
            </div>
            <div className={styles.navigation}>
              <Link to="/about" >
                О нас
              </Link>
              <Link to="/sales" >
                Скидки и акции
              </Link>
            </div>
          </div>
        </div>
      </div>


      <div className={styles.headerMedia}>
        <div className={styles.container}>
          <div className={styles.headerMediaRow}>
            <div className={styles.rowAlign}>
              <Link to='/' className={styles.mediaImg}>
                <img src="https://om-nom-nom.com.ua/kramatorsk/image/catalog/dizajnbeznazvi(2).png" alt="" />
              </Link>
              <div className={styles.mediaSity}>
                Доставка пиццы и роллов в <span>Краматорске</span>
              </div>
            </div>
            <div className={styles.rowAlign}>
              <div className={styles.mediaCart} onClick={() => setCartPopup(true)}>
                <div className={styles.mediaCounter}>{dateCart.length}</div>
                <img src={card} alt="sdf" />
              </div>
              <div className={`${styles.mediaBurger} ${mediaMenu ? styles.mediaBurger__active: ''}`} onClick={() => setMediamenu(!mediaMenu)}></div>
            </div>
          </div>
        </div>
      </div>


      <div className={classNames(styles.headerInfo, headerScroled ? styles.fixed : '')}>
        <div className={styles.container}>

          <div className={styles.row}>
            <div className={styles.item}>
              <Link to="/">
                <div className={styles.ItemImg}>
                  <img src="https://om-nom-nom.com.ua/kramatorsk/image/catalog/dizajnbeznazvi(2).png" alt="" />
                </div>
              </Link>
            </div>
            <div className={styles.item}>
              <div className={styles.delivery}>
                Доставка пиццы и роллов в
                <span>Краматорске</span>
              </div>
            </div>
            <div className={styles.item}>
              <div className={styles.time}>
                Время работы
                <span>с 11:00 до 22:00</span>
              </div>
            </div>
            <div className={styles.item}>
              <div className={styles.itemCall}>
                <span>Заказать звонок</span>
                <a href="099 46 06 500">099 46 06 500</a>
                <a href="099 46 06 500">099 46 06 500</a>
              </div>
            </div>
          </div>

        </div>
      </div>

      <div className={classNames(styles.headerCategories, headerScroled ? styles.headerCategoriesScrolled : '')}>
        <div className={styles.categoryContainer}>
          <div className={styles.row}>

            <div className={classNames(styles.nav, headerScroled ? styles.headerCategoriesScrolled : '')}>
              {
                CatBd.map((item, i) => (
                  <Link key={`${item}_${i}`} to={`/category/${i}`} >
                    {item.catName}
                  </Link>
                ))
              }
            </div>

            <div className={styles.storeItem} onClick={() => setCartPopup(true)} >
              <div className={styles.store}>
                <img src={card} alt="sdf" />
              </div>

              <div className={styles.storeText}>
                {dateCart.length >= 1 ? dateCart.reduce((sum, obj) => (obj.price * obj.count) + sum, 0) + 'грн' : null}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}
export default Header
