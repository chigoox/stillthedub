import { Card } from '@nextui-org/react'
import Link from 'next/link'
import React from 'react'

function YelloLineHustleLink() {
    return (
        <Link href={'/'} className='fixed z-[99] bottom-4 right-4'>
            <Card className='rounded-full bg-black border-4 border-yellow-500 h-24 w-24'>

                <img className='w-full h-full object-cover' src="/Images/YLH.jpeg" alt="Logo YLH" />


            </Card>
        </Link>
    )
}

export default YelloLineHustleLink