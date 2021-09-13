import React, {useState} from 'react';

import { useSelector } from 'react-redux';

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
  let cartPopup = useSelector(state => state.cartReducer.cartPopup)
  let additionalPopup = useSelector(state => state.additionalPopup.popup)
  //Попап с корзиной
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
    updateData,
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