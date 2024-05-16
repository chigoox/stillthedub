'use client'
import { siteName, siteTag } from "@/app/META";
import { addEmailToList } from "@/app/myCodes/DatabaseUtils";
import { checkoutMedical } from "@/app/myCodes/Stripe";
import { Button, DateInput, Input, Modal, ModalBody, ModalContent, ModalFooter, useDisclosure } from "@nextui-org/react";
import Image from "next/image";
import { useState } from 'react';


export const collectAndSendEmail = (email, name, setOpen) => {
    addEmailToList(name, email)
    //function to send email code
    if (setOpen) setOpen(false)

}



const IMG = 'https://images.unsplash.com/photo-1590682751946-a65099676151?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'

function MedicalCard({ isopen5, setOpen }) {
    const [formData, setFormData] = useState({})
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const filledForm = Object.values(formData).map(d => d?.length >= 3).length < 4
    return (
        <Modal
            closeButton={<></>}
            className="border-gray-700 border-2"
            isOpen={isopen5}
            placement={'center'}
            onOpenChange={onOpenChange}
            size={'2xl'}
            classNames={'h-fit'}
        >
            <ModalContent className="h-[30rem] md:h-[35rem] bg-black text-green-600 ">
                {(onClose) => (
                    <>
                        <ModalBody className="relative flex ">
                            <div className="self-end h-auto  center ">
                                <div className=" absolute center-col p-2 gap-1 lg:gap-4 w-1/2 h-auto right-0 top-0 text-center">
                                    <div>
                                        <h1 className="lg:text-5xl font-bold">{siteName}</h1>
                                        <h1 className="font-light text-xl">{siteTag}</h1>
                                    </div>

                                    <h1 className="font-semibold text-2xl text-center">Get your medical marijuana card</h1>
                                    <h1 className="font-extrabold text-3xl md:text-5xl text-center">Order Now</h1>
                                    <h1 className="text-sm font-light ">After payment, we will send you the credentials to obtain your card from the state by mail or in</h1>

                                    <div className="h-auto w-full center-col gap-1 lg:overflow-hidden overflow-y-scroll">
                                        <Input
                                            onValueChange={(text) => setFormData(o => ({ ...o, name: text }))}
                                            className="text-center h-10"
                                            placeholder=""
                                            placement={'inside'}
                                            label={'full name'}
                                            type="text"
                                            value={formData.name}
                                        />

                                        <Input
                                            onValueChange={(text) => setFormData(o => ({ ...o, email: text }))}
                                            className="text-center h-10"
                                            placeholder=""
                                            placement={'inside'}
                                            label={'email'}
                                            type="email"
                                            value={formData.email}
                                        />

                                        <div className="flex gap-1 w-full h-auto ">
                                            <DateInput
                                                onChange={(date) => setFormData(o => ({ ...o, dob: date }))}
                                                value={formData.dob}
                                                className="h-10"
                                                label={'D.O.B'}
                                                labelPlacement="inside"
                                            />
                                            <Input
                                                onValueChange={(text) => setFormData(o => ({ ...o, phone: text }))}
                                                className="text-center h-10"
                                                placeholder=""
                                                placement={'inside'}
                                                label={'phone'}
                                                type="tel"
                                                value={formData.phone}
                                            />

                                        </div>


                                    </div>

                                    <div className="center-col gap-1 mt-1">
                                        <Button isDisabled={filledForm} className="bg-black-800 hover:bg-blue-700 text-white w-3/4" onPress={() => { checkoutMedical(formData) }}>
                                            BUY
                                        </Button>
                                        <Button onPress={() => {
                                            setOpen(false)
                                        }} color="danger" variant="light" >
                                            No Thanks
                                        </Button>
                                    </div>
                                </div>

                            </div>


                        </ModalBody>
                        <ModalFooter className="mb-12">

                        </ModalFooter>
                        <div className="h-full top-0 absolute w-1/2 overflow-hidden">
                            <Image fill objectFit="cover" src={IMG} />
                        </div>
                    </>
                )}
            </ModalContent>
        </Modal>
    )
}

export default MedicalCard


