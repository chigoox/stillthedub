'use client'
import { motion } from "framer-motion";
import React, { useState } from 'react';
import { ImHome, ImMenu } from "react-icons/im";
import { IoBag, IoBagHandle, IoClose } from "react-icons/io5";
import ProductView from "./Shop/Componets/ProductView";
import ProductsList from "./Shop/Componets/ProductsList";
import Link from "next/link";
import { createArray } from "./myCodes/Util";
//import ProductView from '../Support/ProductView';


function Home() {
  const [showCart, setShowCart] = useState(false)
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const toggleMobileMenu = () => setShowMobileMenu(!showMobileMenu)
  const [showShopView, setShowShopView] = useState(false)


  const mock = {
    price: 126,
    caption: 'this is the description',
    media: ['https://img.ltwebstatic.com/images3_pi/2021/09/13/16315032568193ac51c3403e29d4a0b00ad9cef0e9_wk_shein_thumbnail_900x.webp',
      'https://s3-eu-west-1.amazonaws.com/emap-nibiru-prod/wp-content/uploads/sites/2/2020/11/02173926/REISS_LUX_LEISURE_3648-1024x683.jpg',
      'https://img.ltwebstatic.com/images3_pi/2021/08/19/162936919953106120b021e87432cf0fd7cdb99e42.webp',

    ]
  }


  return (
    <div className='bg-black   h-screen overflow- -hidden  relative overflow-x-hidden'>

      <ProductView
        showShopView={showShopView}
        setShowShopView={setShowShopView}
      />

      <div className="top-16 relative">
        <div className="grid grid-cols-12 gap-4 p-2 w-full lg:w-3/4  m-auto">
          <div className="col-span-12 hover:scale-[1.03] trans-slow group  h-64 overflow-hidden rounded-3xl relative">
            <h1 className="font-bold text-white absolute group-hover:text-4xl trans-slow left-4 bottom-4 text-3xl">Shop The Dub</h1>
            <img className="w-full z-10 h-full object-cover" src="https://images.unsplash.com/photo-1487452066049-a710f7296400?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
          </div>

          <div className="col-span-6 hover:scale-[1.03] trans-slow overflow-hidden relative  h-40 rounded-3xl">
            <h1 className="font-bold center h-full w-full lg:hover:text-4xl trans-slow bg-black bg-opacity-40 text-white absolute text-2xl text-center  lg:text-3xl">Shop Convincence</h1>
            <img className="w-full z-10 h-full object-cover" src="https://images.unsplash.com/photo-1614735241165-6756e1df61ab?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />

          </div>

          <div className="col-span-6 hover:scale-[1.03] trans-slow overflow-hidden relative  h-40 rounded-3xl">
            <h1 className="font-bold center h-full w-full lg:hover:text-4xl trans-slow bg-black bg-opacity-40 text-white absolute text-2xl  lg:text-3xl">Shop Tabaco</h1>
            <img className="w-full z-10 h-full object-cover" src="https://www.smchealth.org/sites/main/files/imagecache/lightbox/main-images/flavored_tobacco_image.jpg" alt="" />

          </div>

        </div>

        <div className="center-col lg:w-3/4 m-auto text-white relative mt-10 font-bold text-3xl">
          <h1 className="bordr-b m-4">Featurd</h1>
          <div className="grid grid-cols-3 lg:grid-cols-4 hidescroll p-2  overflow-x-scroll  gap-2 w-full">
            {createArray(5).map(item => {

              return (
                <div className=" center-col m-auto group text-white">
                  <div className="lg:h-40 lg:w-40 w-28 h-28  overflow-hidden relative rounded-full border-4  border-lime-400 hover:border-lime-300">
                    <h1 className="absolute group-hover:scale-105 trans bg-black bg-opacity-40 h-full center w-full">name</h1>
                    <img src="https://images.unsplash.com/photo-1599629954294-14df9ec8bc05?q=80&w=1965&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
                  </div>
                  <div className="font-extrabolds">

                    <h1 className=" group-hover:text-lime-400 trans text-lg">$0.00</h1>

                  </div>

                </div>
              )
            })}
          </div>
        </div>
      </div>






    </div>
  )
}

export default Home
