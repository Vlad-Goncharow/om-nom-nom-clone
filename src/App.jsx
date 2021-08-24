import React, {useState} from 'react';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import About from './pages/About';
import Sales from './pages/Sales';
import Category from './pages/Category';
import Home from './pages/Home';
import Head from './components/Header';
import MediaMenu from './components/MediaMenu';

import './scss/App.scss';

export const AppContext = React.createContext({})

function App() {
  // =================================================
  //Попап с корзиной
  let [cartPopup, setCartPopup] = useState(false)
  // /================================================

  // =================================================
  //Попап товара открыт / закрыт
  let [additionalPopup, setAdditionalPopup] = useState(false)
  // /================================================

  // =================================================
  //Узнаем ширину скрола
  React.useEffect(() => {
    let div = document.createElement('div');
    div.style.overflowY = 'scroll';
    div.style.width = '50px';
    div.style.height = '50px';
    document.body.append(div);
    let scrollWidth = div.offsetWidth - div.clientWidth;
    div.remove();
    // =================================================
    if (cartPopup || additionalPopup) {
      document.body.style.overflow =  'hidden'
      document.body.style.padding = `0 ${scrollWidth + 'px'} 0 0`
    } else {
      document.body.style.overflow = ''
      document.body.style.padding = ''
    }
  }, [cartPopup, additionalPopup])
  // =================================================

  // =================================================
  // Массив товаров в корзине
  let [dateCart, setDateCart] = useState([])
  // =================================================

  // =================================================
  // Добавление товара в корзину
  let addToCart = (obj) => {
    const findItem = dateCart.find(item => item.price === obj.price && item.name === obj.name)
    if (findItem) {
      console.log(findItem);
      setDateCart(prev => prev.map(item => {
        if (item.price === obj.price && item.name === obj.name) {
          let count = item.count + 1;
          return {
            ...item,
            count: count,
            priceAllProducts: item.price * count
          }
        }
        return item
      }))
    } else {
      setDateCart(prev => [...prev, obj])
    }
  }
  // =================================================

  // =================================================
  // Добавление количества товаров в корзине / удаление
  function incr(obj) {
    setDateCart(prev => prev.map((item, i) => {
      if (item.price === obj.price && item.name === obj.name) {
        let count = item.count + 1;
        return {
          ...item,
          count: count,
          priceAllProducts: item.price * count
        }
      }
      return item
    }))
  }
  // =================================================

  // =================================================
  // Уменьшение количества товаров в корзине / удаление
  function dicr(obj) {
    setDateCart(prev => prev.map((item, i) => {
      if (item.price === obj.price && item.name === obj.name) {
        let count = item.count - 1;
        if(count === 0) {
          setDateCart(prev => prev.filter(fil => fil.id !== obj.id || fil.price !== obj.price || fil.parent !== obj.parent))
        } else{
          return {
            ...item,
            count: count,
            priceAllProducts: item.price * count
          }
        }
      }
      return item
    }))
  }
  // /================================================

  // =================================================
  //Данные попапа который открывается при клике на картинку
  let [date, setDate] = useState([])
  let updateData = (value) => {
    setDate(value)
  }
  // /================================================

  // /================================================
  //Бургер открыт / закрыт
  const [mediaMenu, setMediamenu] = React.useState(false)
  React.useEffect(() => {
    if(mediaMenu) {
      document.body.style.overflow = 'hidden'
    } else{ 
      document.body.style.overflow = ''
    }
  },[mediaMenu])
  // /================================================
  
  return (
  <AppContext.Provider value={{
    setCartPopup,
    cartPopup,
    additionalPopup,
    setAdditionalPopup,
    addToCart,
    dicr,
    incr,
    updateData,
    dateCart,
    date,
    setMediamenu,
    mediaMenu
  }}>
    <div className='app'>
      <Router>

        <Head />
        <MediaMenu />

        <Switch>
          <Route exact path="/">
            <Home />
          </Route>

          <Route exact path = '/sales' >
            <Sales />
          </Route>

          <Route exact path = '/category/:id' >
            <Category />
          </Route>

          <Route exact path = '/about' >
            <About />
          </Route>
        </Switch>

      </Router>
    </div>
  </AppContext.Provider>
  )
}

export default App;