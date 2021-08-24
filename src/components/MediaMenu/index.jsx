import React from 'react'
import style from './MediaMenu.module.scss'
import { Link } from 'react-router-dom'
import { CatBd } from '../../data/CatData'
import { AppContext } from '../../App'

function MediaMenu() {
  const { mediaMenu, setMediamenu } = React.useContext(AppContext);
  return (
    <div className={`${style.menu} ${mediaMenu && style.openMenu}`}>
      <div className={style.mediaTime}>
        <a href="099 46 06 500">099 46 06 500</a>
        <a href="099 46 06 500">099 46 06 500</a>
        <span>
          Время работы с 11:00 до 22:00
        </span>
      </div>
      <div className={style.mediaListCategory}>
        {
          CatBd.map((item, i) => (
            <Link key={`${item}_${i}`} to={`/category/${i}`} onClick={() => setMediamenu(false)}>
              {item.catName}
            </Link>
          ))
        }
      </div>
      <div className={style.mediaPagesList}>
        <Link to="/about" onClick={() =>setMediamenu(false)}>
          О нас
        </Link>
        <Link to="/sales" onClick={() =>setMediamenu(false)}>
          Скидки и акции
        </Link>
      </div>
    </div>
  )
}

export default MediaMenu
