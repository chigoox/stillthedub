export const createProduct = async () => {
    const [priceData, setPriceData] = useState({ for: productData?.productName?.replace(/\s/g, '') })
    const [productData, setProductData] = useState()
    const updateInfo = (event, setter) => {
        console.log(event.target.value, event.target.name)
        const { target } = event
        setter(oldState => ({ ...oldState, [target?.name]: target?.value }))
    }
    const [priceIDCount, setPriceIDCount] = useState(1)

    const updatePrice = (event, setter, index) => {
        const { target } = event
        setter(oldState => ({ ...oldState, ['price' + index]: { ...oldState['price' + index], [target?.name]: (index == 0 && productData?.price && target?.name == 'amount') ? productData.price : target.value } }))
    }


    if (priceIDCount < 1) setPriceIDCount(1)
    if (priceIDCount > 100) setPriceIDCount(100)


    if (priceData['price0']?.priceName &&
        priceData['price0']?.qty &&
        productData?.productName &&
        productData?.productDesc &&
        productData?.img &&
        productData?.price &&
        productData?.category
    ) {
        try {
            console.log(priceData)
            await createProduct(productData, priceData)

            setProductData({ productName: '', productDesc: '', productFeat: '', category: '', price: '', isNew: false, isBestSelling: false, })
            setPriceData({ price0: { priceName: '', qty: '', amount: '' } })
            setPriceIDCount(1)
            message.success('Item Created', 5)

        } catch (error) {
            console.log(error)
            message.error(error.message, 5)

        }
    } else {
        if (!productData?.productName) message.error('Missing product name', 5)
        if (!productData?.productDesc) message.error('Missing product description', 5)
        if (!productData?.img) message.error('Missing product images', 5)
        if (!productData?.price) message.error('Missing product price', 5)
        if (!productData?.category) message.error('Missing product category', 5)
        if (!priceData['price0']?.priceName) message.error('Missing variant name', 5)
        if (!priceData['price0']?.qty) message.error('Missing variant QTY', 5)
    }


    useEffect(() => { setPriceData(old => ({ ...old, for: productData?.productName?.replace(/\s/g, '') })) }, [productData])

    return null
}



export const updateBanner = (bannerData) => {
    if (bannerData.title) updateDatabaseItem('Admin', 'Banner', 'title', bannerData.title)
    if (bannerData.link) updateDatabaseItem('Admin', 'Banner', 'link', bannerData.link)
    if (bannerData.message) updateDatabaseItem('Admin', 'Banner', 'message', bannerData.message)


}