
import { Button, Card, Input, Link } from "@nextui-org/react";
import { Mail } from "lucide-react";
import ProductsList from "./Shop/Componets/ProductsList";
import { createArray } from "./myCodes/Util";
import MedicalCardMain from "./Componets/General/MedicalCardMain";
import Footer from "./Componets/Footer";
//import ProductView from '../Support/ProductView';


function Home() {






  return (
    <div className='bg-black   h-screen   relative overflow-x-hidden'>

      <MedicalCardMain />

      <div className="top-16 mb-40 relative">
        <section className="grid grid-cols-12 gap-4 p-4 w-full lg:w-3/4  m-auto">
          <Link href="/Shop" className="col-span-12">
            <Card className=" hover:scale-[1.03] w-full trans-slow group bg-transparent  h-64 overflow-hidden rounded-3xl relative">
              <h1 className="font-bold text-white z-30 absolute lg:group-hover:text-4xl trans-slow left-4 bottom-4 text-3xl">Shop The Dub</h1>
              <img className="w-full z-10 h-full object-cover" src="https://images.unsplash.com/photo-1487452066049-a710f7296400?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
            </Card>
          </Link>

          <Link href="/Shop" className="col-span-6 hover:scale-[1.03] trans-slow overflow-hidden relative  h-40 rounded-3xl">
            <h1 className="font-bold center h-full w-full lg:hover:text-4xl trans-slow bg-black bg-opacity-40 text-white absolute text-2xl text-center  lg:text-3xl">Shop Convincence</h1>
            <img className="w-full  h-full object-cover" src="https://images.unsplash.com/photo-1614735241165-6756e1df61ab?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />

          </Link>

          <div className="col-span-6 hover:scale-[1.03] trans-slow overflow-hidden relative  h-40 rounded-3xl">
            <h1 className="font-bold center h-full w-full lg:hover:text-4xl trans-slow bg-black bg-opacity-40 text-white absolute text-2xl  lg:text-3xl">Shop Tabaco</h1>
            <img className="w-full z-10 h-full object-cover" src="https://www.smchealth.org/sites/main/files/imagecache/lightbox/main-images/flavored_tobacco_image.jpg" alt="" />

          </div>

        </section>

        <h1 className="border-b text-white text-3xl m-4 md:text-center">Featurd Items</h1>
        <section className=" overflow-x-scroll hidescroll lg:w-3/4 m-auto text-white relative mt-10 font-bold text-3xl">
          <ProductsList search={'isNew'} category={'true'} list={true} limit={6} />
        </section>

        <section className="m-auto mt-20  mb-12 lg:w-[90%]">
          <div className="flex overflow-hidden  lg:h-96 h-[60rem] lg:flex-row flex-col gap-4 p-4  ">
            <div className="lg:w-3/4 m-auto">
              <h1 className="center font-extrabold text-2xl  text-white">Showcase</h1>
              <video autoPlay muted playsInline className="h-80 w-full object-cover aspect-video shadow  rounded-lg" src="/videos/NavVideo.mp4"></video>

            </div>
            <div className="m-auto lg:w-1/3  w-full lg:h-full h-96 relative trans top-14 lg:top-0 border-2 rounded-lg">
              <h1 className="my-2 font-bold text-lg text-center text-white">Commnts</h1>
              <div className="grid grid-cols-1 p-2 gap-2 overflow-y-scroll hidescroll h-[80%] m-auto w-[90%] border-y ">
                {createArray(3).map(i => {
                  return (
                    <div className="center gap-2">
                      <div className="h-12 w-12 bg-white rounded-full">

                      </div>
                      <div className="w-64 text-white h-auto bg-black  p-2">
                        <h1 className="font-bold text-lg">name</h1>
                        <h1>
                          showing neither believe he present.
                          Deal sigh up in shew away w
                          hen.
                        </h1>

                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          <div className="text-white relative bottom-[34rem]  h-38 overflow-y-scroll hidescroll md:bottom-[32rem] trans w-3/4 m-auto lg:bottom-0">
            <h1 className="font-bold text-lg">Title</h1>
            <h1>
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
            </h1>
          </div>

        </section>

        <Footer />

      </div>






    </div>
  )
}

export default Home
