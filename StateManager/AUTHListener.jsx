'use client'
import app, { AUTH } from '@/Firebase'
import { useGuest } from '@/app/Hooks/useGuest'
import { fetchDocument, updateDatabaseItem } from '@/app/myCodes/Database'
import { addEmailToList, addUIDToList } from '@/app/myCodes/DatabaseUtils'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'


function AUTHListener({ add = false, set, protectedPage }) {
    const { push } = useRouter()

    useEffect(() => {
        const auth = AUTH
        onAuthStateChanged(auth, (user) => {
            if (user) {
                if (set) set(user)
                if (add) addUIDToList(user.uid)
                if (add) addEmailToList(user.email)
            } else {
                // User is signed out
                if (set) set()
                if (protectedPage) push('/')
            }
        });
    }, [])
    return (
        <></>
    )
}

export function useAUTHListener(add = false, set, protectedPage) {
    const { push } = useRouter()
    const [user, setUser] = useState({})
    const auth = getAuth(app)

    const GID = useGuest()

    useEffect(() => {
        const auth = AUTH
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                if (set) set(user)
                if (add) addUIDToList(user.uid)
                if (add) addEmailToList(user.email)
                setUser(user)
                console.log(user.uid)
                await fetchDocument('User', user.uid).then((userDATA) => {
                    setTimeout(async () => {
                        if (!userDATA.ACCOUNTSTATUS)
                            await updateDatabaseItem('User', user.uid, 'ACCOUNTSTATUS', 'USER')
                    }, 1000);



                }).catch((e) => {
                    console.log(e.message)

                })


            } else {
                // User is signed out
                if (set) set()
                if (protectedPage) push('/')
                //initNoUser()
                await fetchDocument('User', GID).then((userDATA) => {
                    if (userDATA?.ShippingInfo?.email) {
                        setUser({ gid: GID, email: userDATA?.ShippingInfo?.email })
                    } else {
                        setUser({ gid: GID })
                    }




                }).catch((e) => {
                    setUser({ gid: GID })

                })


            }
        });
    }, [])
    return user

}

export default AUTHListener