'use client'
import { useEffect, useState } from 'react';
import Maps from '../Componets/Maps';
import OrderDetails from '../Componets/OrderDetails';
import { fetchDocument } from '@/app/myCodes/Database';
import { usePathname } from 'next/navigation'
import { Button } from '@nextui-org/react';

export default function page() {

    const [order, setOrder] = useState({})
    const orderID = usePathname().slice(-5)
    const customer = order.orderInfo
    const [orderTracking, setOrderTracking] = useState(false)

    console.log(order, orderID)


    useEffect(() => {
        const getOrder = async () => {
            setOrder(await fetchDocument('Orders', orderID))
        }

        getOrder()


    }, [orderID])

    return (
        <div className='bg-black center   h-screen   relative overflow-x-hidden'>


            <div className="flex flex-col lg:flex-row gap-2 w-full lg:p-4 p-2 lg:w-1/2 text-white relative">
                <div className=' h-10  absolute text-center lg:w-1/2  center-col z-50 m-auto top-14 bg-black lg:bg-transparent md:top-32 w-full lg:top-0 lg:left-0'>
                    <h1 className='text-center'>{customer?.firstName} {customer?.lastName}</h1>
                    <h1 className='font-bold text-center'>{customer?.address}</h1>
                </div>
                <Maps destination={order?.orderInfo?.address} orderTracking={orderTracking} />
                <OrderDetails order={order} />
                <div className=' w-full  lg:w-1/2  center gap-2 lg:absolute lg:top-0 lg:right-0'>
                    <Button onPress={() => setOrderTracking(!orderTracking)} className='p-4 text-xl font-bold text-white bg-blue-700'>Start Order</Button>
                    {order.status == 'not started' && <Button className='p-4 text-xl font-bold text-white bg-red-700'>Cancel order</Button>}
                </div>

            </div>


        </div>
    );
}
