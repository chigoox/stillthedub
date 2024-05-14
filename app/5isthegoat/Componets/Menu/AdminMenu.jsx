import React from 'react'
import AdminMenuItem from './AdminMenuItem'

export const menu = ['Home', { name: 'Orders', menus: ['Shipping Lables', 'Abandoned Checkouts'] }, { name: 'Products', menus: ['Collections', 'Inventory', 'Gift cards'] }, { name: 'Customers', menus: ['Segments'] }, 'Content', 'Discount']
export const AdminMenu = ({ setSelectedMenu, selectedMenu }) => {
    return (
        <div className={`Navigator w-[22rem] z-10 px-2 lg:w-64 lg:relative absolute trans top-0 left-0 border-r bg-white h-screen`}>
            {menu.map((item) => {
                return (
                    <AdminMenuItem setSelectedMenu={setSelectedMenu} selectedMenu={selectedMenu} menuItem={item} />
                )
            })}
        </div>
    )
}
