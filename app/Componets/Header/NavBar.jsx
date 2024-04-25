'use client'
import { useAUTHListener } from '@/StateManager/AUTHListener'
import useFilterEmptyCategory from '@/app/Hooks/useFilterCategory'
import useWindowDimensions from '@/app/Hooks/useGetWindowDeimentions'
import useScrollPosition from '@/app/Hooks/useScrollPosition'
import { Alex_Brush, Bebas_Neue, Jost } from 'next/font/google'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { Suspense, useEffect, useState } from 'react'
import { ImHome, ImMenu } from 'react-icons/im'
import { IoBag, IoBagHandle } from 'react-icons/io5'
import LoginCard from '../General/Auth/LoginCard'
import { NavigationEvents } from "../NavigationEvents"
import Cart from './Cart'

const alexFont = Bebas_Neue({
    weight: '400',
    subsets: ['latin'],
})
const jost = Jost({
    weight: '400',
    subsets: ['latin'],
})

function NavBar() {
    const websiteName = 'Still The Dubb'
    const [showMobileMenu, setShowMobileMenu] = useState(false)
    const [showCart, setShowCart] = useState(false)
    const [showLogin, setShowLogin] = useState(false)
    const [navRoute, setNavRoute] = useState([])
    const user = useAUTHListener()
    const { push } = useRouter()
    const category = useFilterEmptyCategory()

    let scrollPosition = 1
    scrollPosition = useScrollPosition()
    const { height, width } = useWindowDimensions();

    const NoCart = usePathname().includes('Checkout')


    useEffect(() => {

    }, [])



    const toggleMobileMenu = () => {
        setShowMobileMenu(!showMobileMenu)
        return (!showMobileMenu)
    }

    const toggleCart = () => {
        setShowCart(!showCart)
        return (!showCart)
    }
    const toggleLogin = () => {
        if (user?.uid) {
            push(`/User/${user.uid}`)
        } else {
            setShowLogin(!showLogin)

        }
    }


    const menu = ['Home', 'Shop']


    const MenuItem = ({ name, showMobileMenu }) => {
        return (
            < Link href={`/${name == 'Home' ? '/' : `${name}`}`} className={` items-center gap-1 justify-center ${showMobileMenu ? 'flex' : 'hidden'} lg:block`}>
                {name == 'Home' && <ImHome size={24} className='block lg:hidden' />}
                {name == 'Shop' && <IoBag size={24} className='block lg:hidden' />}
                <h1 className='font-bold text-lg'>{name}</h1>
            </Link>


        )
    }

    return (
        <div className='h-22 bg-black w-full   center-col overflow-hidden'>

            <Cart showCart={showCart} setShowCart={setShowCart} />
            {(showLogin && (!user?.uid)) && <LoginCard toggleLogin={toggleLogin} />}

            <Suspense>
                <NavigationEvents setRoute={setNavRoute} />
            </Suspense>
            <div className='mt-0 md:mt-0 relative '>

                <div className='w-[25%] absolute right-0  h-8'>
                    <div className=' m-auto h-8 w-24'></div>
                </div>

            </div >

            <nav className={` ${showMobileMenu ? ' text-white bg-opacity-100' : ' bg-opacity-0'} trans  h-10 bg-black lg:h-16 w-full fixed z-50 top-0 flex items-center justify-evenly p-2 `}>

                <div className={`${showMobileMenu ? 'h-12 opacity-100 ' : 'h-[1px]  opacity-25'}  flex items-center justify-center gap-4 lg:hidden text-white bg-black absolute w-full  top-10  trans`}>
                    {menu.map((item) => {
                        return (
                            <MenuItem key={item} name={item} showMobileMenu={showMobileMenu} />
                        )
                    })}
                </div>




                <div className='font1 font-light text-4xl text-center hidden lg:block'>
                    <h1 className={alexFont.className}>{websiteName}</h1>

                </div>


                <div className=''>
                    <div className='flex justify-between  lg:w-[15rem]'>
                        <button onClick={toggleMobileMenu}>

                            <ImMenu size={30} color='gray' className='lg:hidden' />
                        </button>
                        <div className='lg:flex justify-between w-full hidden  text-black'>
                            {menu.map((item) => {
                                return (
                                    <MenuItem key={item} name={item} />
                                )
                            })}
                        </div>

                    </div>

                </div>
                <div className='font1  font-light text-3xl text-center lg:hidden block'>
                    <h1 className={alexFont.className}>{websiteName}</h1>

                </div>
                <button className='' onClick={() => { setShowCart(true) }}>
                    <IoBagHandle size={30} color='gray' />
                </button>

                <video autoPlay playsInlines muted className='absolute -z-10 w-full object-cover h-12' src="/Videos/NavVideo.mp4"></video>
            </nav>

        </div >

    )
}

export default NavBar

/* 

routes

shop/Luxury wigs , Luxury bundles , luxury lace , hot tools 
book/book appointments, book a class

*/
