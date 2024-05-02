'use client'
import { Card, CardBody } from '@nextui-org/react'
import { APIProvider, Map, Marker, useMap, useMapsLibrary } from '@vis.gl/react-google-maps'
import { Contact } from 'lucide-react'
import React, { useEffect, useState } from 'react'

function page() {
    const [currentLocation, setCurrentLocation] = useState([])
    const order = {
        id: 4123434,
        type: 'delivery',    //pickup delivery
        status: 'preparing', //ready notReady
        driverLocationWhenComplete: [],
        items: [],
        Contact: { //can be UID if not guest
            name: 'john doe',
            location: '2255 springfield ave, Irvington NJ',
            email: 'guestemail.com',
            phone: '9999991234'

        }
    }
    useEffect(() => {

        navigator.geolocation.getCurrentPosition((v) => { setCurrentLocation([v.coords.latitude, v.coords.longitude]) })



    }, [])


    const Directions = () => {
        const map = useMap()
        const routesLibrary = useMapsLibrary('routes')
        const [directionsService, setDirectionsService] = useState()
        const [directionsRenderer, setDirectionsRenderer] = useState()
        const [routes, setRoutes] = useState([])
        const [routeIndex, setRouteIndex] = useState(0);
        const selected = routes[routeIndex];
        const leg = selected?.legs[0];
        useEffect(() => {
            if (!routesLibrary || !map) return;
            setDirectionsService(new routesLibrary.DirectionsService());
            setDirectionsRenderer(new routesLibrary.DirectionsRenderer({ map }));
        }, [routesLibrary, map]);

        useEffect(() => {
            if (!directionsService || !directionsRenderer) return;

            directionsService
                .route({
                    origin: '307 indiana St, union NJ',
                    destination: '80 augusta St, irvington nj',
                    travelMode: 'DRIVING',
                    provideRouteAlternatives: true,
                    avoidTolls: true,
                })
                .then(response => {
                    directionsRenderer.setDirections(response);
                    setRoutes(response.routes);
                });

            return () => directionsRenderer.setMap(null);
        }, [directionsService, directionsRenderer]);



    }


    return (
        <div className='bg-black center   h-screen   relative overflow-x-hidden'>


            <div className="flex flex-col lg:flex-row gap-2 w-full lg:p-4 p-2 lg:w-1/2 text-white">

                <Card className='mt-12 rounded-3xl h-96 lg:w-3/4 w-full overflow-hidden border-4 border-gray-400'>
                    <APIProvider apiKey={'AIzaSyDu0t5ZAFoF8oKGdoretlTZfmZ0XQXmgok'}>
                        <Map
                            className='h-full w-full bg-black'
                            defaultCenter={{ lat: 40.7292082, lng: -74.2184576 }}
                            defaultZoom={12}
                            gestureHandling={'greedy'}
                            disableDefaultUI={true}
                            styles={[
                                {
                                    "elementType": "geometry",
                                    "stylers": [
                                        {
                                            "color": "#212121"
                                        }
                                    ]
                                },
                                {
                                    "elementType": "labels.icon",
                                    "stylers": [
                                        {
                                            "visibility": "off"
                                        }
                                    ]
                                },
                                {
                                    "elementType": "labels.text.fill",
                                    "stylers": [
                                        {
                                            "color": "#757575"
                                        }
                                    ]
                                },
                                {
                                    "elementType": "labels.text.stroke",
                                    "stylers": [
                                        {
                                            "color": "#212121"
                                        }
                                    ]
                                },
                                {
                                    "featureType": "administrative",
                                    "elementType": "geometry",
                                    "stylers": [
                                        {
                                            "color": "#757575"
                                        }
                                    ]
                                },
                                {
                                    "featureType": "administrative.country",
                                    "elementType": "labels.text.fill",
                                    "stylers": [
                                        {
                                            "color": "#9e9e9e"
                                        }
                                    ]
                                },
                                {
                                    "featureType": "administrative.land_parcel",
                                    "stylers": [
                                        {
                                            "visibility": "off"
                                        }
                                    ]
                                },
                                {
                                    "featureType": "administrative.locality",
                                    "elementType": "labels.text.fill",
                                    "stylers": [
                                        {
                                            "color": "#bdbdbd"
                                        }
                                    ]
                                },
                                {
                                    "featureType": "poi",
                                    "elementType": "labels.text.fill",
                                    "stylers": [
                                        {
                                            "color": "#757575"
                                        }
                                    ]
                                },
                                {
                                    "featureType": "poi.park",
                                    "elementType": "geometry",
                                    "stylers": [
                                        {
                                            "color": "#181818"
                                        }
                                    ]
                                },
                                {
                                    "featureType": "poi.park",
                                    "elementType": "labels.text.fill",
                                    "stylers": [
                                        {
                                            "color": "#616161"
                                        }
                                    ]
                                },
                                {
                                    "featureType": "poi.park",
                                    "elementType": "labels.text.stroke",
                                    "stylers": [
                                        {
                                            "color": "#1b1b1b"
                                        }
                                    ]
                                },
                                {
                                    "featureType": "road",
                                    "elementType": "geometry.fill",
                                    "stylers": [
                                        {
                                            "color": "#2c2c2c"
                                        }
                                    ]
                                },
                                {
                                    "featureType": "road",
                                    "elementType": "labels.text.fill",
                                    "stylers": [
                                        {
                                            "color": "#8a8a8a"
                                        }
                                    ]
                                },
                                {
                                    "featureType": "road.arterial",
                                    "elementType": "geometry",
                                    "stylers": [
                                        {
                                            "color": "#373737"
                                        }
                                    ]
                                },
                                {
                                    "featureType": "road.highway",
                                    "elementType": "geometry",
                                    "stylers": [
                                        {
                                            "color": "#3c3c3c"
                                        }
                                    ]
                                },
                                {
                                    "featureType": "road.highway.controlled_access",
                                    "elementType": "geometry",
                                    "stylers": [
                                        {
                                            "color": "#4e4e4e"
                                        }
                                    ]
                                },
                                {
                                    "featureType": "road.local",
                                    "elementType": "labels.text.fill",
                                    "stylers": [
                                        {
                                            "color": "#616161"
                                        }
                                    ]
                                },
                                {
                                    "featureType": "transit",
                                    "stylers": [
                                        {
                                            "visibility": "off"
                                        }
                                    ]
                                },
                                {
                                    "featureType": "transit",
                                    "elementType": "labels.text.fill",
                                    "stylers": [
                                        {
                                            "color": "#757575"
                                        }
                                    ]
                                },
                                {
                                    "featureType": "water",
                                    "stylers": [
                                        {
                                            "weight": 1
                                        }
                                    ]
                                },
                                {
                                    "featureType": "water",
                                    "elementType": "geometry",
                                    "stylers": [
                                        {
                                            "color": "#000000"
                                        },
                                        {
                                            "weight": 1
                                        }
                                    ]
                                },
                                {
                                    "featureType": "water",
                                    "elementType": "labels.text.fill",
                                    "stylers": [
                                        {
                                            "color": "#3d3d3d"
                                        }
                                    ]
                                }
                            ]}
                        >
                            <Directions />
                        </Map>

                    </APIProvider>
                </Card>
                <div className='center-col'>
                    <h1 className='text-3xl border-b font-bold'>Order #0000000</h1>
                    {order.status == 'ready' ? <p className='text-lg'>Your order is {order.type == 'delivery' ? 'on the way' : 'ready to be pickedup'}</p> : <p className='text-lg'>Your order is being prepared!</p>}
                </div>
            </div>


        </div>
    )
}

export default page