import React, { useEffect, useRef, useState } from 'react'
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Card, CardHeader, CardBody, Input, Textarea, Switch, Checkbox, Select, SelectItem } from "@nextui-org/react";
import { Upload } from 'antd';
import { Uploader } from './Uploader';
import Masonry from 'masonry-layout';
import { createArray } from '@/app/myCodes/Util';
import dynamic from "next/dynamic";

const TextEditor = dynamic(() => import("./BundledEditor"), {
    ssr: false,
});

export const ProductAddEdit = ({ openType }) => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    useEffect(() => {
        if (openType == "openNew") onOpen()
        if (openType == "openEdit") onOpen()


    }, [openType])

    useEffect(() => {
        var grid = document.querySelector('.grid');
        var msnry = new Masonry(grid, {
            // options...
            itemSelector: '.grid-item',
            columnWidth: 200
        })
    }, [])


    return (
        <>
            <Modal className='h-[80%]' placement='auto' size='5xl' isOpen={isOpen} isDismissable={false} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">{openType == 'openNew' ? 'Add product' : 'Edit product'}</ModalHeader>
                            <ModalBody className='overflow-y-scroll hidescroll '>
                                <div className='grid gap-2 md:grid-cols-3 grid-cols-1  p-2 hidescroll'>

                                    <Card className='grid-item col-span-2'>
                                        <CardBody className='flex TITLE-DESCRIPTION'>
                                            <div className='p-2 h-full'>
                                                <h1 className='font-bold'>title</h1>
                                                <Input size='sm' placeholder='Product Name' className='h-12' />
                                                <br />
                                                <h1 className='font-bold'>description</h1>
                                                <TextEditor />
                                            </div>
                                            <div className='w-1/4'>

                                            </div>

                                        </CardBody>
                                    </Card>

                                    <Card className='h-12 ACTIVE-OR-DRAFT grid-item'>
                                        <CardBody className='T center overflow-hidden'>
                                            <Switch>Draft/Active</Switch>
                                        </CardBody>
                                    </Card>

                                    <Card className='UPLOADER col-span-2 grid-item'>
                                        <CardBody className='p-4 h-auto'>
                                            <div>
                                                <h1 className='font-bold'>Media</h1>
                                                <Uploader />
                                            </div>
                                        </CardBody>
                                    </Card>



                                    <Card className='grid-item md:bottom-[22rem] PRICING'>
                                        <CardBody className=''>
                                            <h1 className='font-bold'>Pricing</h1>

                                            <div className='p-2 flex gap-4'>
                                                <div>
                                                    <h1 className='text-sm'>Price</h1>
                                                    <Input size='xs' placeholder='' className='h-10' />
                                                </div>
                                                <div>
                                                    <h1 className='text-sm'>Compare-at price</h1>
                                                    <Input size='xs' placeholder='' className='h-10' />
                                                </div>
                                            </div>
                                            <Checkbox className='mb-2'>Charge tax on this product</Checkbox>
                                            <div className='between gap-2'>
                                                <div>
                                                    <h1 className='text-sm'>Cost per item</h1>
                                                    <Input size='xs' placeholder='' className='h-10' />
                                                </div>
                                                <div>
                                                    <h1 className='text-sm'>Profit</h1>
                                                    <Input size='xs' placeholder='--' className='h-12' />
                                                </div>
                                                <div>
                                                    <h1 className='text-sm'>Margin</h1>
                                                    <Input size='xs' placeholder='--' className='h-12' />
                                                </div>

                                            </div>

                                        </CardBody>
                                    </Card>

                                    <Card className='h-auto ACTIVE-OR-DRAFT grid-item col-span-2'>
                                        <CardBody className='overflow-hidden'>
                                            <h1 className='font-bold'>Inventory</h1>
                                            <Checkbox className='mb-2 text-sm  relative left-4'>Track Iventory</Checkbox>

                                            <h1 className='font-bold border-b mb-2'>Quantity</h1>
                                            <div className='between w-full'>
                                                <h1>Count</h1>
                                                <Input className='w-24 h-12' size='sm' />
                                            </div>
                                            <Checkbox className='mb-2 '>Continue selling when out of stock</Checkbox>
                                            <h1 className='relative left-7 bottom-4 text-sm w-3/4'>can complete sales when available inventory reaches zero and below.</h1>

                                        </CardBody>
                                    </Card>

                                    <Card className='PRODUCT-ORG relative md:bottom-[22rem] col-span-1 grid-item'>
                                        <CardBody className='p-4 h-auto'>
                                            <div>
                                                <h1 className='font-bold'>Product organization</h1>
                                                <div>
                                                    <h1>Category</h1>
                                                    <Select>

                                                    </Select>
                                                    <h1>Collection</h1>
                                                    <Select>

                                                    </Select>
                                                    <h1>Tags</h1>
                                                    <Select>

                                                    </Select>

                                                </div>


                                            </div>
                                        </CardBody>
                                    </Card>

                                    <Card className='h-auto WEIGHT md:bot tom-[16rem] grid-item col-span-2'>
                                        <CardBody className=''>
                                            <h1 className='font-bold'>Shipping</h1>
                                            <Checkbox>This is a physical product</Checkbox>

                                            <h1 className="mt-2">Weight</h1>
                                            <div className="center w-fit gap-1">
                                                <Input className='w-24' />
                                                <Select size='xs' className='w-205'>
                                                    <SelectItem>lb</SelectItem>
                                                    <SelectItem>oz</SelectItem>
                                                    <SelectItem>kg</SelectItem>
                                                    <SelectItem>g</SelectItem>
                                                </Select>
                                            </div>
                                        </CardBody>
                                    </Card>
                                    <Card className='h-96 ACTIVE-OR-DRAFT md:bot tom-[10rem] grid-item col-span-2'>
                                        <CardBody className='overflow-hidden'>
                                            <h1 className='font-bold'>Variants</h1>
                                            <VariavntPanel />
                                        </CardBody>
                                    </Card>
                                </div>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Close
                                </Button>
                                <Button color="primary" onPress={onClose}>
                                    Action
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal >
        </>
    )
}



export const VariavntPanel = () => {
    const [variantCount, setVariantCount] = useState({ variant0: { name: '', value: {}, valueCount: 1 } })
    console.log(variantCount)




    return (
        <div className='h-full'>
            {Object.keys(variantCount).map((item, index) => {
                const currentCount = variantCount[item].valueCount || 1
                const valuesCount = Object.keys(variantCount[item].value).length || 0
                const arrayOfAllOptions = Object.values(Object.values(variantCount[item].value))
                const valueInLastPosition = Object.values(variantCount[item].value)[currentCount - 1]
                const countEqValue = (currentCount == valuesCount)
                console.log(valuesCount)
                console.log(currentCount)
                console.log(valueInLastPosition)
                console.log(currentCount == valuesCount)


                useEffect(() => {
                    if (valueInLastPosition && countEqValue)
                        console.log('first')
                    setVariantCount(old => { return { ...old, [`variant${index}`]: { ...old[`variant${index}`], valueCount: old[`variant${index}`].valueCount + 1 } } })
                }, [valueInLastPosition])

                return (
                    <div className='h-full p-2 overflow-y-scroll hidescroll  rounded-lg w-40 shadow border-dotted border-2'>
                        <h1>Option name</h1>
                        <Input onValueChange={(value) => { setVariantCount(old => { return { ...old, [`variant${index}`]: { name: value, value: old[`variant${index}`].value, valueCount: old[`variant${index}`].valueCount } } }) }} size='sm' />
                        <h1>Option values</h1>
                        <div className=' center-col gap-4 '>
                            {
                                createArray(variantCount[item].valueCount).map((item, indexi) => {
                                    return (
                                        <div>
                                            <h1>Variant option {indexi}</h1>
                                            <Input onValueChange={(value) => { setVariantCount(old => { return { ...old, [`variant${index}`]: { name: old[`variant${index}`].name, valueCount: old[`variant${index}`].valueCount, value: { ...old[`variant${index}`].value, [`option${indexi}`]: value } } } }) }} size='sm' />
                                        </div>

                                    )
                                })}
                        </div>
                        <button onClick={() => { }} ></button>
                    </div>
                )
            })}

        </div>
    )
}