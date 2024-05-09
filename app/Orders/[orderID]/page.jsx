'use client'
import { useEffect, useState } from 'react';
import Maps from '../Componets/Maps';
import OrderDetails from '../Componets/OrderDetails';
import { fetchDocument, updateDatabaseItem, watchDocument } from '@/app/myCodes/Database';
import { usePathname } from 'next/navigation'
import { Button } from '@nextui-org/react';

const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of the earth in km
    const dLat = deg2rad(lat2 - lat1); // deg2rad below
    const dLon = deg2rad(lon2 - lon1);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) *
        Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c; // Distance in km
    return d * 3280.84; // Convert to feet
};

const deg2rad = (deg) => {
    return deg * (Math.PI / 180);
};

export default function page() {

    const [order, setOrder] = useState({})
    const orderID = usePathname().slice(-5)
    const customer = order.orderInfo
    const orderStatus = order.status
    const [orderTracking, setOrderTracking] = useState(false)
    const [currentLocation, setCurrentLocation] = useState([null, null])

    const [currentDriverLocation, setCurrentDriverLocation] = useState()
    const [prevLocation, setPrevLocation] = useState(null);
    console.log(prevLocation)
    console.log(currentDriverLocation)
    const updateOrderLocation = async (location) => {
        if (location && prevLocation) {
            console.log(location)
            const distance = calculateDistance(
                prevLocation?.lat,
                prevLocation?.lng,
                location.lat,
                location.lng,
            );
            console.log(distance)
            if (distance >= 1000) {
                console.log("You have moved 1000ft.");
                await updateDatabaseItem('Orders', orderID, 'driverLocation', prevLocation)
                setPrevLocation(location);
            }
        } else if (!prevLocation && location) {
            await updateDatabaseItem('Orders', orderID, 'driverLocation', location)
            setPrevLocation(location)
        } else if (!currentDriverLocation) {
            await updateDatabaseItem('Orders', orderID, 'driverLocation', prevLocation)

        }




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
        if (!orderTracking) {
            await updateDatabaseItem('Orders', orderID, 'status', 'on the way')
            navigator.geolocation.getCurrentPosition(p => setCurrentLocation([p.coords.latitude, p.coords.longitude]))
            //await updateOrderLocation({ lat: currentLocation[0], lng: currentLocation[1] })
            // if (currentDriverLocation?.length >= 2)
            setCurrentDriverLocation()
        }

    }

    useEffect(() => {
        setOrderTracking(orderStatus == 'on the way')
    }, [orderStatus])

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
                    prevLocation={prevLocation}
                />
                <OrderDetails order={order} />
                <div className=' w-full  lg:w-1/2  center gap-2 lg:absolute lg:top-0 lg:right-0'>
                    <Button onPress={StartEndDelivery} className={`${(orderStatus == 'on the way') ? 'bg-rose-700' : 'bg-blue-700'} p-4 text-xl font-bold text-white `}>{(orderStatus == 'on the way') ? 'End Delivery' : 'Start Order'}</Button>
                    {order.status == 'not started' && <Button className='p-4 text-xl font-bold text-white bg-red-700'>Cancel order</Button>}
                </div>

            </div>


        </div>
    );
}
