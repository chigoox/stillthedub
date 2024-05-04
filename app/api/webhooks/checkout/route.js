import { orderNumberPrefix } from "@/app/META";
import { addToDoc, fetchDocument, fetchInOrder, updateDatabaseItem } from "@/app/myCodes/Database";
import Cors from "micro-cors";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

const stripe = require("stripe")(process.env.STRIPE_PRIVATE);

const cors = Cors({
  allowMethods: ["POST", "HEAD"],
});

const secret = process.env.STRIPE_WEBHOOK_KEY || "";

export async function POST(request) {
  try {
    const body = await request.text();
    const signature = headers().get("stripe-signature");
    const event = stripe.webhooks.constructEvent(body, signature, secret);

    if (event.type === "checkout.session.completed") {
      const { uid, cart, total, cartID } = event.data.object.metadata
      const { orderID } = await fetchDocument('Admin', 'Orders')
      const { ShippingInfo } = await fetchDocument('User', uid)

      const CART = await (fetchInOrder('Carts', 'cartID')) //Object.values(JSON.parse(fullCart))
      const CurrentOrder = Object.values(CART.cart)

      //const cart = CurrentOrder?.lineItems ? CurrentOrder?.lineItems : {}
      const addArray = (array) => {
        const mainArray = Array.isArray(array) ? array : Object.values(array ? array : {})
        const sum = mainArray.reduce((partialSum, a) => partialSum + a, 0)
        return sum
      }

      const getArrayToAddQTY = async () => {
        const total = CurrentOrder.map((orderInfo) => {
          return orderInfo.Qty
        })
        return total
      }
      const getArrayToAddPrice = async () => {
        const total = CurrentOrder.map((orderInfo) => {
          return orderInfo.price
        })
        return total
      }

      const getArrayToAddImages = async () => {
        const total = CurrentOrder.map((orderInfo) => {
          return orderInfo.images[0]
        })
        return total
      }

      const arrayQTY = await getArrayToAddQTY()
      const arrayPrice = await getArrayToAddPrice()
      const arrayImages = await getArrayToAddImages()
      const orderQTY = addArray(arrayQTY)
      const orderPrice = addArray(arrayPrice)

      const order = {
        [`${orderNumberPrefix}-${orderID}`]: {
          orderInfo: ShippingInfo,
          orderedItems: CurrentOrder,//CurrentOrder.lineItems,
          id: `${orderNumberPrefix}-${orderID}`,
          qty: orderQTY,
          total: orderPrice,
          images: arrayImages,
          user: uid,
          status: 'No started',
          driverLocationWhenComplete: [],
        }
      }

      await addToDoc('Orders', orderID, order)

      const { orders } = uid ? await fetchDocument('User', uid) : { orders: {} }

      if (Object.keys(orders).includes(`${orderNumberPrefix}-${orderID}`)) {

        updateDatabaseItem('Admin', 'Orders', 'orderID', orderID + 1)
      }




    }

    return NextResponse.json({ result: event, ok: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        message: "something went wrong",
        ok: false,
      },
      { status: 500 }
    );
  }
}