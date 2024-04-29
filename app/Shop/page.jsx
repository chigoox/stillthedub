
import { Button, Card, Input } from '@nextui-org/react'
import ShopProductlist from '../Componets/HomePage/ShopProductlist'
import { category } from '../META'
import { createArray } from '../myCodes/Util'
import { AiOutlineSearch } from 'react-icons/ai'
import ShopItem from './Componets/ShopItem'


function Shop() {
    return (
        <div className='flex min-h-screen text-white flex-col bg-black'>

            <div className='relative mt-24 center gap-4 lg:hover:scale-110 trans overflow-y-scroll'>
                {category.map(i => {
                    return (
                        <div key={i} className='center-col'>
                            <div className='h-20 w-20 overflow-hidden  rounded-full'>
                                <img className='h-full w-full object-cover' src={
                                    i == 'Drinks' ? 'https://www.instacart.com/image-server/386x386/filters:fill(FFF,true):format(jpg)/d2lnr5mha7bycj.cloudfront.net/product-image/file/large_01dd896b-371a-4d04-9ff6-cdfdd949886f.png' :
                                        i == 'Candy' ? 'https://www.instacart.com/image-server/296x296/filters:fill(FFF,true):format(jpg)/d2lnr5mha7bycj.cloudfront.net/product-image/file/large_8bf706ca-64c5-4505-b464-626f5d0091a4.jpg' :
                                            i == 'Snacks' ? 'https://www.instacart.com/image-server/296x296/filters:fill(FFF,true):format(jpg)/d2lnr5mha7bycj.cloudfront.net/product-image/file/large_01213fde-149e-4297-8f57-1fc1762797aa.png' :
                                                'https://www.instacart.com/assets/domains/product-image/file/large_3a3749ea-89a5-41a3-a995-152d3b8cb2ce.jpg'} alt="" />
                            </div>
                            <h1>{i}</h1>
                        </div>
                    )
                })}
            </div>
            <div className='p-2 center text-black'>
                <Input startContent={<AiOutlineSearch />} type='text' className='h-24 lg:w-1/2 px-2' label='test' labelPlacement='inside' />

            </div>
            <div className='ITEMS center  h-auto w-full lg:w-3/4 p-2 mx-auto'>
                <div className='grid lg:grid-cols-4 gap-4 md:grid-cols-3 grid-cols-2'>
                    {createArray(20).map(i => {
                        return (<ShopItem shopItems={{ metadata: { price: 100 }, name: 'test', images: ['/images/BAN1.jpg'] }} />)
                    })}
                </div>
            </div>


        </div>
    )
}


export default Shop