'use client'
import { useAUTHListener } from '@/StateManager/AUTHListener'
import useFilterEmptyCategory from '@/app/Hooks/useFilterCategory'
import useWindowDimensions from '@/app/Hooks/useGetWindowDeimentions'
import useScrollPosition from '@/app/Hooks/useScrollPosition'
import { User2Icon } from 'lucide-react'
import { Bebas_Neue, Jost } from 'next/font/google'
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
    const [cartCount, setCartCount] = useState()
    const { push } = useRouter()
    const category = useFilterEmptyCategory()

    let scrollPosition = 1
    scrollPosition = useScrollPosition()
    const { height, width } = useWindowDimensions();

    const NoCart = usePathname().includes('Checkout')

    useEffect(() => {
        setCartCount(Object.values(JSON.parse(localStorage.getItem('Cart'))).length - 1)
    }, [])



    const toggleMobileMenu = () => {
        setShowMobileMenu(!showMobileMenu)
        return (!showMobileMenu)
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
            < Link href={`/${name == 'Home' ? '/' : `${name}`}`} className={` items-center gap-1 hover:text-lime-400 justify-center ${showMobileMenu ? 'flex' : 'hidden'} lg:block`}>
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

                <div className={`${showMobileMenu ? 'h-12 opacity-100 ' : 'h-[0px]  opacity-25'}  flex items-center justify-center gap-4 lg:hidden text-white bg-black absolute w-full  top-10  trans`}>
                    {menu.map((item) => {
                        return (
                            <MenuItem key={item} name={item} showMobileMenu={showMobileMenu} />
                        )
                    })}
                </div>




                <div className='font1 font-light text-4xl text-center hidden lg:block'>
                    <Link href={'/'} className={`${alexFont.className} relative top-2 text-white  hover:text-lime-400 trans`}>{websiteName}</Link>
                    <h1 className='text-white text-xs font-bold bg-black rounded-lg p-2 z-20' >760 Springfield Ave, Irvington, NJ 07111</h1>
                </div>


                <div className=''>
                    <div className='flex justify-between  lg:w-[15rem]'>
                        <button onClick={toggleMobileMenu}>

                            <ImMenu size={30} color='white' className='lg:hidden' />
                        </button>
                        <div className='lg:flex justify-between w-full hidden  text-black lg:text-white'>
                            {menu.map((item) => {
                                return (
                                    <MenuItem key={item} name={item} />
                                )
                            })}
                        </div>

                    </div>

                </div>
                <div className='font1  font-light text-3xl text-white text-center lg:hidden block'>
                    <Link href={'/'} className={`${alexFont.className} relative hover:text-lime-600 z-30 trans top-3`}>{websiteName}</Link>
                    <h1 className='text-white text-xs font-bold bg-black p-1 rounded z-20 relative'>760 Springfield Ave, Irvington, NJ 07111</h1>


                </div>
                <div className='center gap-4'>
                    <div className=" text-white">

                        <button className='relative ' onClick={() => { setShowCart(true) }}>
                            <div className='absolute border-2 top-1 -right-2 bg-lime-400 font-bold z-10 h-4 w-4 p-2 bg-opacity-75  center rounded-full '>
                                {(cartCount) ? cartCount : 0}
                            </div>
                            <IoBagHandle size={30} color='gray' />
                        </button>
                    </div>

                    <button className='' onClick={() => { toggleLogin() }}>
                        <User2Icon size={30} color='gray' />
                    </button>
                </div>

                <video autoPlay muted playsInline className='absolute -z-10 w-full object-cover h-12' src="/Videos/NavVideo.mp4"></video>
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
