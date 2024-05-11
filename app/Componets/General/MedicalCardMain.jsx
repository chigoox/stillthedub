'use client'
import { useAUTHListener } from '@/StateManager/AUTHListener';
import { useEffect, useState } from 'react';
import MedicalCard from './MedicalCard';

function MedicalCardMain() {
    const [openEmailCollect, setOpenEmailCollect] = useState(false)
    const user = useAUTHListener()
    console.log(user.email)
    useEffect(() => {
        if (true) {
            setTimeout(() => {
                setOpenEmailCollect(true)
            }, 6000);
        }


    }, [])

    return (
        <MedicalCard isopen5={openEmailCollect} setOpen={setOpenEmailCollect} />
    )
}

export default MedicalCardMain