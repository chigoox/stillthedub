import { createArray } from '@/app/myCodes/Util'
import { Button } from '@nextui-org/react'
import React from 'react'
import { AiFillPlusSquare } from 'react-icons/ai'
import { ProductAddEdit } from '../Support/ProductAddEdit'

export const AdminProduct = () => {
    return (
        <div>


            <ProductAddEdit openType={'openNew'} />


            <Button className='ADD-NEW-BUTTON h-6 mb-10  w-fit p-2 bg-white rounded min-w-0'><AiFillPlusSquare color='blue' size={24} /></Button>
            <div className='TITLE-ROW grid gap-4 border-b grid-cols-3 text-gray-600'>
                {['Product', 'Status', 'Inventory'].map(item => (<div>{item}</div>))}
            </div>
            {createArray(4).map(item => (
                <div className='grid grid-cols-3 mt-2'>
                    <div className='PRODUCT flex items-center gap-2'>
                        <img className='rounded-full object-cover h-14 w-14' src="https://plus.unsplash.com/premium_photo-1677249227771-43a86c13eb76?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
                        <p>name</p>
                    </div>
                    <div className='STATUS h-full w-fit center'>
                        <div className={`rounded-full h-8 w-14 text-white ${true ? 'bg-green-600' : 'bg-gray-500'} center trans`}>{true ? 'Active' : 'Draft'}</div>
                    </div>
                    <div className='INVENTOR h-full w-24 center '>
                        <div className={` h-8  center trans`}>9000 in stock</div>
                    </div>
                </div>
            ))}


        </div >
    )
}
