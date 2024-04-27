
import ShopProductlist from '../Componets/HomePage/ShopProductlist'
import { createArray } from '../myCodes/Util'


function Shop() {
    return (
        <div className='flex min-h-screen flex-col bg-black'>
            <div className='relative mt-24 center gap-4 lg:hover:scale-110 trans'>
                {createArray(4).map(i => {
                    return (<div key={i} className='h-12 w-12 bg-white rounded-full'>

                    </div>)
                })}
            </div>


        </div>
    )
}


export default Shop