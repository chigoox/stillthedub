'use client'
import { Button, Input } from '@nextui-org/react'
import { AiOutlineSearch } from 'react-icons/ai'
import { category } from '../META'
import { createArray, filterObject } from '../myCodes/Util'
import ShopItem from './Componets/ShopItem'
import { fetchAllProducts, fetchProducts } from '../myCodes/Stripe'
import { useEffect, useState } from 'react'



function Shop() {
    const [PRODUCTS, setPRODUCTS] = useState([])
    const [sortBy, setSortBy] = useState('none')

    useEffect(() => {
        const getData = async () => {
            //fetch products from stripe
            const data = await fetchAllProducts(null, 100)

            //filter Products by if they have metadata, is active and has images
            //then sets PRODUCT state to the result
            setPRODUCTS(Object.values(
                filterObject(data, (v) => {
                    return (Object.keys(v.metadata).length > 0) && (v.active) && (v.images.length > 0)
                })
            ))
        }

        getData()



    }, [])

    const sortList = ['A-Z', 'Z-A', '$-$$$', '$$$-$', 'Newest', 'Most Popular']
    console.log(PRODUCTS)
    const filterProducts = () => {
        switch (sortBy) {
            case sortList[0]:
                return PRODUCTS.sort((a, b) => (a.name.toUpperCase() > b.name.toUpperCase()) ? 1 : ((b.name.toUpperCase() > a.name.toUpperCase()) ? -1 : 0))
                break

            case sortList[1]:

                return PRODUCTS.sort((a, b) => (b.name.toUpperCase() > a.name.toUpperCase()) ? 1 : ((a.name.toUpperCase() > b.name.toUpperCase()) ? -1 : 0))


                break


            case sortList[2]:
                return PRODUCTS.sort((a, b) => b.metadata.price - a.metadata.price)

                break

            case sortList[3]:
                return PRODUCTS.sort((a, b) => a.metadata.price - b.metadata.price)


                break
            case sortList[4]:

                return PRODUCTS.sort((a, b) => b.created - a.created)
                break

            case sortList[5]:
                return PRODUCTS.sort((a, b) => b.metadata?.unitsSold - a.metadata?.unitsSold)

                break

            default:
                return PRODUCTS
                break


        }
    }


    return (
        <div className='flex min-h-screen overflow-hidden text-white flex-col bg-black'>
            <div className='relative mt-24 center gap-4 lg:hover:scale-110 trans overflow-y-scroll'>
                {category.map(i => {
                    return (
                        <Button key={i} className='center-col rounded-t-full h-auto w-auto bg-transparent text-white'>
                            <div className='h-20 w-20 overflow-hidden  rounded-full'>
                                <img className='h-full w-full object-cover' src={
                                    i == 'Drinks' ? 'https://www.instacart.com/image-server/386x386/filters:fill(FFF,true):format(jpg)/d2lnr5mha7bycj.cloudfront.net/product-image/file/large_01dd896b-371a-4d04-9ff6-cdfdd949886f.png' :
                                        i == 'Candy' ? 'https://www.instacart.com/image-server/296x296/filters:fill(FFF,true):format(jpg)/d2lnr5mha7bycj.cloudfront.net/product-image/file/large_8bf706ca-64c5-4505-b464-626f5d0091a4.jpg' :
                                            i == 'Snacks' ? 'https://www.instacart.com/image-server/296x296/filters:fill(FFF,true):format(jpg)/d2lnr5mha7bycj.cloudfront.net/product-image/file/large_01213fde-149e-4297-8f57-1fc1762797aa.png' :
                                                'https://www.instacart.com/assets/domains/product-image/file/large_3a3749ea-89a5-41a3-a995-152d3b8cb2ce.jpg'} alt="" />
                            </div>
                            <h1>{i}</h1>
                        </Button>
                    )
                })}
            </div>
            <div>
                <div className="SORT center flex-wrap gap-2 p-2">
                    {sortList.map(i => {
                        return (
                            <Button onPress={() => { setSortBy(sortBy == i ? 'none' : i) }} className={`w-24 bg-black-800 text-white border-black p-2 ${sortBy == i ? 'bg-lime-400' : ''}`}>{i}</Button>
                        )
                    }

                    )}
                </div>
            </div>
            <div className='p-2 center text-black'>
                <Input startContent={<AiOutlineSearch />} type='text' className='h-24 lg:w-1/2 px-2' label='Search' labelPlacement='inside' />

            </div>
            <div className='ITEMS center  h-auto w-full lg:w-3/4 p-2 mx-auto'>
                <div className='grid lg:grid-cols-4 gap-4 md:grid-cols-3 grid-cols-2'>
                    {filterProducts().map(i => {
                        return (<ShopItem shopItems={i} />)
                    })}
                </div>
            </div>


        </div>
    )
}


export default Shop