import React from 'react'

import { CatBd } from '../../data/CatData'

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.min.css";
import "swiper/components/pagination/pagination.min.css"
import SwiperCore, { Navigation, Pagination } from 'swiper/core';

import Item from '../../components/Item'
import Drawer from '../../components/Drawer';
import PopupItem from '../../components/PopupItem';

import '../../scss/home.scss';
import style from './Home.module.scss'

// install Swiper modules
SwiperCore.use([Pagination, Navigation]);

function Home() {
  return (
    <div className={style.container}>
      <div className={style.swiperWrapper}>
        <Swiper
          loop={true}
          pagination={{
            "clickable": true
          }}
          navigation={true}
          spaceBetween={3}
          slidesPerView={1}
          className="my-Swiper"
        >
          <SwiperSlide>
            <div className={style.sliderImage}>
              <img src="https://om-nom-nom.com.ua/kramatorsk/image/catalog/bannerslogo/113.png" alt="slide" />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className={style.sliderImage}>
              <img src="https://om-nom-nom.com.ua/kramatorsk/image/catalog/bannerslogo/114.png" alt="slide" />
            </div>
          </SwiperSlide>
        </Swiper>
      </div>

      <Drawer />

      <PopupItem />

      <div className={style.rowItems}>
        {
          CatBd.map(el => (
            el.catPropducts.map((item, i) => (
              <Item
                parent={el.catName}
                key={`${item}_${i}`}
                item={item}
              />
            ))
          ))
        }
      </div>
    </div>
  )
}

export default Home