import React, { useState } from 'react'
import { useParams } from 'react-router-dom';


import { CatBd } from '../../data/CatData'
import classNames from 'classnames'


import PopupItem from '../../components/PopupItem';
import Drawer from '../../components/Drawer';
import Item from '../../components/Item';

import style from './Category.module.scss'



function Category() {
  // =================================================
  let { id } = useParams();
  // =================================================

  // =================================================
  // Массив возможных фильтраций
  const [filterItems, setFilterItems] = useState([])
  // =================================================

  // =================================================
  //Подсветка активного фильтра
  const [filterActive, setFilterActive] = React.useState(-1)
  // =================================================

  // =================================================
  //Отфильтрованные товары
  const [items, setItems] = useState(CatBd[id].catPropducts)
  const onChengeFilter = (obj) => {
    setItems(CatBd[id].catPropducts.filter(el => el.catProductFilter === obj))
  }
  // =================================================

  // =================================================
  const qwe = (obj) => obj.catProductFilter === undefined
  React.useEffect(() => {
    

    if (CatBd[id].catPropducts.some(qwe)) {
      setFilterItems(null)
    } else {
      setFilterItems(() => {
        return (
          CatBd[id].catPropducts.map(item => item.catProductFilter)
            .filter((value, index, self) => self.indexOf(value) === index)
        )
      })
    }

    setItems(CatBd[id].catPropducts)
    setFilterActive(-1)
  }, [id])
  // =================================================
  return (
    <div className={style.container}>
      <Drawer />
      {
        filterItems ?
          <div className={style.filterRow}>
            <div className={classNames(style.filterType, filterActive === -1 && style.filterType_active)}
              onClick={() => {
                setFilterActive(-1)
                setItems(CatBd[id].catPropducts)
              }}>
              <span>Все</span>
            </div>
            {
              filterItems &&
              filterItems.map((item, index) => {
                return (
                  <div 
                    key={`${item}_${index}`} 
                    className={classNames(style.filterType, filterActive === index && style.filterType_active)}
                    onClick={() => {
                        setFilterActive(index)
                        onChengeFilter(item)
                      }}
                    >
                    <span>{item}</span>
                    
                  </div>
                )
              })
            }
          </div>
          : null
      }

      <PopupItem />

      <div className={style.rowItems}>
        {
          items.map((product, i) => (
            <Item
              parent={CatBd[id].catName}
              key={`${product}_${i}`}
              item={product}
            />
          ))
        }
      </div>
    </div>
  )
}

export default Category