import React, { useState } from 'react'
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Select, SelectItem, Skeleton } from '@nextui-org/react'
import { filterNullFromArray } from '@/app/myCodes/Util'
import ItemQTYButton from './ItemQTYButton'
import EmblaCarouselThumb from '@/app/Componets/HomePage/CarouselThumb'

function ProductView({ showShopView, setShowShopView }) {

    const product = showShopView
    const { name, images, metadata } = showShopView ? showShopView : {}
    const { price } = metadata || { price: 0 }

    console.log(product)
    const slides = images?.map(item => (item))
    const desc = product?.caption
    const variants = filterNullFromArray(product?.variants || [])

    const [itemToCheckOut, setItemToCheckOut] = useState({ priceID: 0, Qty: 0, images: [] })
    const addToCart = () => {
        //if (itemToCheckOut.priceID && itemToCheckOut.Qty > 0) dispatch({ type: "ADD_TO_CART", value: itemToCheckOut })
    }



    const PayOptions = ({ price, service }) => {
        const services = ['After Pay', 'Klarna', 'Affirm']
        return (
            <div className={'rounded-xl w-fit center-col m-auto mt-2 gap-2 relative p-2 overflow-hidden'} >

                <div className='  rounded-full flex flex-col'>
                    {services.map(service => (
                        <Skeleton isLoaded={price} key={service} className='w-12 h-8   font-bold text-gray-500 text-sm'>
                            <div className='text-center w-full   h-full rounded-full'>
                                <img className='' src={
                                    service == 'After Pay' ? 'https://business.afterpay.com/rs/539-RJA-633/images/AP_logo_badge_6328x2204_mintblack_jpg.jpg' :
                                        service == 'Affirm' ? 'https://cdn-assets.affirm.com/images/black_logo-transparent_bg.png' :
                                            service == 'Klarna' ? 'https://www.klarna.com/b2b/_next/image/?url=https://images.ctfassets.net/4pxjo1vaz7xk/MTY3NzgzNTg4MDQ4ODQ/7f165976461ae5e1a60c149ccf8b5841/logo-black-thumbnail.png&w=3840&q=75' : ''
                                } />


                            </div>
                        </Skeleton>))}
                </div>


            </div>

        )
    }


    return (
        < Modal isOpen={showShopView} backdrop={'blur'} onOpenChange={() => { setShowShopView(false) }
        } placement='auto' scrollBehavior='inside' className={`h-auto min-w-full w-auto overflow-x-hidden md:px-20 lg:px-40 xl:px-32 py-4 bg-gray-100  ${{
            backdrop: "bg-black bg-opacity-100"
        }}`}>
            <ModalContent>
                {() => (
                    <>
                        <ModalHeader className="center-col gap-1  text-black md:scroll-px-20 lg:px-40">

                            <div className='flex items-center justify-evenly  w-full'>
                                <div>
                                    <span className='font-thin'>from</span>
                                    <Skeleton isLoaded={price} className='w-fit flex'>
                                        <span className=' font-light text-2xl'>${price}.00</span>
                                    </Skeleton>
                                </div>

                                <div className='center'>
                                    <PayOptions price={price} />
                                    <div className=' items-center  flex  flex-col'>
                                        {<ItemQTYButton state={itemToCheckOut} setState={setItemToCheckOut} />}
                                        <Button onClick={addToCart} className='h-12 rounded-md w-32 bg-black text-white font-bold mb-2'>ADD TO CART</Button>
                                    </div>
                                </div>
                            </div>
                            {name}

                        </ModalHeader>
                        <ModalBody className='hidescroll overflow-hidden overflow-y-scroll   p-0'>

                            <div>

                                <div className='flex md:flex-row flex-col gap-2'>
                                    <Skeleton className='h-auto' isLoaded={product}>
                                        <EmblaCarouselThumb options={{}} slides={slides} />
                                    </Skeleton>



                                    <div className='h-fit md:w-1/2 p-2 '>
                                        <div className='center flex-wrap md:w-3/4 m-auto mt-2 gap-2'>
                                            {variants?.length > 0 && <Select
                                                onChange={({ target }) => { setItemToCheckOut(prev => ({ ...prev, price: Number(target.value.split(',', 3)[2]?.replace('$', '')), priceID: target.value.split(',', 2)[0], variant: target.value.split(',', 2)[1] })) }}
                                                labelPlacement={'outside'}
                                                label="Select Variant"
                                                className="max-w-xs my-8 text-black"
                                            >
                                                {variants.map((variant) => {
                                                    return (
                                                        <SelectItem key={variant} value={variant}>
                                                            {variant}
                                                        </SelectItem>
                                                    )
                                                })}
                                            </Select>}

                                        </div>


                                        <div className={``}>
                                            <h1 className='text-2xl font-extralight text-white bg-black-800'>Description</h1>
                                            <Skeleton className='w-fit' isLoaded={desc}>
                                                <h1>{desc}</h1>
                                            </Skeleton>
                                        </div>
                                    </div>

                                </div>
                            </div>



















                        </ModalBody>
                        <ModalFooter>
                            <Button className='w-full' onPress={() => { setShowShopView(false) }} color="danger" variant="light">
                                Close
                            </Button>

                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal >
    )
}

export default ProductView