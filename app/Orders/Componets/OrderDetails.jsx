import React from 'react'
import { OrderItem } from './OrderItem'
import { Card, CardBody, CardHeader, Skeleton } from '@nextui-org/react'

const OrderDetails = ({ order }) => {
    const orderType = order.orderInfo?.orderType
    const orderID = order.id
    const orderStatus = order.status
    const orderTotal = Number(order.total)
    const orderItems = order.orderedItems || []

    return (
        <div className='center-col'>
            <h1 className='text-3xl border-b font-bold'>Order {orderID}</h1>
            {orderStatus == 'ready' ? <p className='text-lg'>Your order is {orderType == 'delivery' ? 'on the way' : 'ready to be picked up'}</p> : <p className='text-lg'>Your order is being prepared!</p>}
            <Skeleton isLoaded={order}>
                <Card className='bg-black-800 text-white w-auto h-auto'>
                    <CardHeader>
                        <h1 className='text-3xl font-bold text-center w-full'>Items</h1>
                        <h1 className='text-lg font-bold text-center w-full'>Total: ${orderTotal}</h1>
                    </CardHeader>
                    <CardBody className='grid lg:grid-cols-4 grid-cols-5  gap-4 p-4'>
                        {orderItems.map(item => {
                            return (
                                <OrderItem item={item} />
                            )
                        })}
                    </CardBody>
                </Card>
            </Skeleton>
        </div>
    )
}

export default OrderDetails