'use client'
import { Button, Input } from '@nextui-org/react'
import { Jost } from 'next/font/google'
import Link from 'next/link'
import { useState } from 'react'
import { AiFillFacebook, AiFillInstagram, AiFillTwitterSquare, AiFillYoutube } from 'react-icons/ai'
import { siteName } from '../META'
import { collectAndSendEmail } from './General/MedicalCard'
import { Mail, User } from 'lucide-react'
import { message } from 'antd'

const jost = Jost({
    weight: '400',
    subsets: ['latin'],
})
function Footer() {
    const [Email, setEmail] = useState('')
    const [name, setName] = useState('')
    const date = new Date()

    const clear = () => {
        setEmail('')
        setName('')
        message.success('You signed up to our mailing list')
        //TODO::SEND EMAIL FOR SIGNNING UP
    }

    return (
        <div className=' w-full bg-black-800 text-white'>
            <div className='flex flex-wrap  justify-between'>
                <div className='p-2 fadeInRight  md:w-full lg:w-fit'>
                    <Link href={"/"} className='my-1 font-bold text-2xl'><h1 className={jost.className}>{siteName}</h1></Link>

                </div>

            </div>

            <div className='center gap-4 p-2'>
                <div className="border p-2 h-64 w-[7rem] md:w-96">
                    <img className="h-full w-full object-cover rounded-lg" src="https://lh3.googleusercontent.com/p/AF1QipM0frAOvzcFzqoktRlYM2BP_OB5mRGEXYOTI7zr=s1360-w1360-h1020" alt="" />
                </div>
                <div className='fadeInRight overflow-hidden w-3/4 md:w-[25%]'>
                    <div className='p-2 h-fit center flex-col'>
                        <h1 className='m-1 font-bold text-2xl'>Newsletter</h1>
                        <h1 className='m-1 text-center'>Be the first to hear
                            the latest news from {siteName}, and much more!
                        </h1>
                        <Input value={Email} onValueChange={(text) => setEmail(text)} label={'Email'} startContent={<Mail />} placement={'inside'} className=' m-auto text-black  trans p-2 focus:scale-110 hover:scale-105' type="email" />
                        <Input value={name} onValueChange={(text) => setName(text)} label={'Full Name'} startContent={<User />} placement={'inside'} className='s m-auto text-black  trans p-2 focus:scale-110 hover:scale-105' type="text" />


                        <h1 className='mt-4 text-center'>By subscribing you agree to our privacy policy</h1>
                        <Button onPress={() => { collectAndSendEmail(Email, name); clear() }} className='h-12 w-32 p-2 bg-black text-white trans-slow hover:bg-black hover:scale-110 my-8'>Subscribe</Button>
                    </div>
                </div>

            </div>
            <div className='bg-black text-white   h-12 between'>
                <div>
                    © {date.getFullYear()} {siteName}, Inc.
                    Terms
                    Privacy
                </div>
                <div className="center gap-4   w-fit">
                    <button className="trans hover:scale-105 center"><AiFillTwitterSquare size={32} /></button>
                    <button className="trans hover:scale-105 center"><AiFillFacebook size={32} /></button>
                    <button className="trans hover:scale-105 center"><AiFillInstagram size={32} /></button>
                    <button className="trans hover:scale-105 center"><AiFillYoutube size={32} /></button>
                </div>

            </div>
        </div>
    )
}

export default Footer


/* 


<h1 className='my-1 '>Need to reach me?</h1>
                    <h1 className='my-1 '>+555-555-5555</h1>
                    <h1 className='my-1 '>void.void@gmail.com</h1>
                    
*/