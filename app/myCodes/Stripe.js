import axios from 'axios'
import { addToDatabase, addToDoc } from './Database'
import { getRandTN } from './Util'
export const fetchProducts = async (category, setterfunction = null, limit, search) => {
  const { data } = await axios.post('/api/fetchProducts', {
    category: category ? category : undefined,
    limit: limit ? limit : 25,
    search: search

  },
    {
      headers: {
        "Content-Type": "application/json",
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache',
        'Expires': '0',
      },
    })
  if (setterfunction) setterfunction(data)
  return (data)
}

export const fetchAllProducts = async (setterfunction = null, limit) => {
  const { data } = await axios.post('/api/fetchAllProducts', {
    limit: limit ? limit : 25
  },
    {
      headers: {
        "Content-Type": "application/json",
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache',
        'Expires': '0',
      },
    })
  if (setterfunction) setterfunction(data)
  return (data)
}




export const fetchPricesFor = async (nameNoSpace, setterfunction) => {
  const { data } = await axios.post('/api/fetchPrices', {
    name: nameNoSpace
  },
    {
      headers: {
        "Content-Type": "application/json",
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache',
        'Expires': '0',
      },
    })
  if (setterfunction) setterfunction(data)
  return (data)
}


const cartID = getRandTN()

export const checkout = async (event, cart, userID, fullCart) => {
  event.preventDefault();
  addToDoc('Carts', cartID, { cartID: cartID, cart: fullCart })
  const { data } = await axios.post('/api/Checkout',
    {
      cart: cart[0],
      total: cart[1],
      UID: userID,
      cartID: cartID
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  window.location.assign(data)
}

export const checkoutMedical = async (formData) => {
  const { data } = await axios.post('/api/CheckOutMedical',
    {
      formData: formData
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  window.location.assign(data)
}