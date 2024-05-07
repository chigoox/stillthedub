import { getRand } from "@/app/myCodes/Util"

export const OrderItem = ({ item }) => {
    return (
        <div key={item.name + getRand(9999)}>
            <div className='bg-white m-auto text-black center border-2 w-12 h-12 overflow-hidden rounded-full relative'>
                <h1 className='absolute h-full w-full text-2xl center text-white bg-opacity-50 bg-black'>{item.Qty}</h1>
                <img className='h-full w-full object-cover' src={item.images[0]} alt="" />
            </div>
            <h1 className='bg-opacity-25 text-xs text-center'>{item.name}</h1>
        </div>
    )
}