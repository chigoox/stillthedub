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
                <div className=' h-10 center-col relative top-12'>
                    <h1>{customer?.firstName} {customer?.lastName}</h1>
                    <h1 className='font-bold'>{customer?.address}</h1>
                </div>
                <Maps destination={order?.orderInfo?.address} />
                <OrderDetails order={order} />
                <div className=' w-full  center gap-2'>
                    <Button className='p-4 text-xl font-bold text-white bg-blue-700'>Start Order</Button>
                    {order.status == 'not started' && <Button className='p-4 text-xl font-bold text-white bg-red-700'>Cancel order</Button>}
                </div>

            </div>


        </div>
    );
}
