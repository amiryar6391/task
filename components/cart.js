import Image from "next/image";


export default function Cart({namefood , imagefood , restaurant , ingredients , price }){
    return(
        <div className=" w-96 mx-auto shadow-lg overflow-hidden rounded-md mt-3">
        <div className=" relative w-96 h-80 ">
          <Image src={imagefood} alt="image cart" fill/>
        </div>
       <div className=" p-2">
       <p className=" text-gray-700 font-bold mb-2">Name Food : <span className=" text-gray-500">{namefood}</span></p>
        <p className=" text-gray-700 font-bold mb-2">Restaurant : <span className=" text-gray-500">{restaurant}</span></p>
        <p className=" text-gray-700 font-bold mb-2">Ingredients : <span className=" text-gray-500">{ingredients}</span></p>
        <p className=" text-gray-700 font-bold mb-2">Price : {price.toLocaleString('fa-IR')} تومان</p>
       </div>

      </div>
    )
}