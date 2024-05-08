'use client'
import { useEffect, useState } from 'react';
import Maps from '../Componets/Maps';
import OrderDetails from '../Componets/OrderDetails';
import { fetchDocument, updateDatabaseItem, watchDocument } from '@/app/myCodes/Database';
import { usePathname } from 'next/navigation'
import { Button } from '@nextui-org/react';

export default function page() {

    const [order, setOrder] = useState({})
    const orderID = usePathname().slice(-5)
    const customer = order.orderInfo
    const orderStatus = order.status
    const [orderTracking, setOrderTracking] = useState(false)
    const [currentDriverLocation, setCurrentDriverLocation] = useState()
    const [currentLocation, setCurrentLocation] = useState([])
    const updateOrderLocation = async (location) => {
        if (location) await updateDatabaseItem('Orders', orderID, 'driverLocation', location)
        const order = await fetchDocument('Orders', orderID)
        const orderLocation = order?.driverLocation
        setCurrentDriverLocation(orderLocation)
    }



    const StartEndDelivery = async () => {
        setOrderTracking(!orderTracking)
        if (orderTracking) {
            await updateDatabaseItem('Orders', orderID, 'status', 'ready')
            await updateDatabaseItem('Orders', orderID, 'driverLocation')
        }
        console.log(orderTracking)
        if (!orderTracking) {
            await updateDatabaseItem('Orders', orderID, 'status', 'on the way')
            if (currentLocation?.length >= 2) await updateOrderLocation({ lat: currentLocation[0], lng: currentLocation[1] })
            // if (currentDriverLocation?.length >= 2)
            setCurrentDriverLocation()
        }

    }


    useEffect(() => {
        if (!orderID) return
        const getOrder = async () => {
            setOrder(await fetchDocument('Orders', orderID))
            await updateOrderLocation()
            await watchDocument('Orders', orderID, setOrder)
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
                <Maps
                    orderStatus={orderStatus}
                    updateOrderLocation={updateOrderLocation}
                    destination={order?.orderInfo?.address}
                    orderTracking={orderTracking}
                    currentDriverLocation={currentDriverLocation}
                    positionState={[currentLocation, setCurrentLocation]}
                />
                <OrderDetails order={order} />
                <div className=' w-full  lg:w-1/2  center gap-2 lg:absolute lg:top-0 lg:right-0'>
                    <Button onPress={StartEndDelivery} className={`${orderTracking ? 'bg-rose-700' : 'bg-blue-700'} p-4 text-xl font-bold text-white `}>{orderTracking ? 'End Delivery' : 'Start Order'}</Button>
                    {order.status == 'not started' && <Button className='p-4 text-xl font-bold text-white bg-red-700'>Cancel order</Button>}
                </div>

            </div>


        </div>
    );
}
