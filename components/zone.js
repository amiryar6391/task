'use client';


import { useDispatch } from "react-redux";
import {
    getCountriesFrom,
    getProvincesFrom,
  } from "@/redux/slices/from";


  import {
    getZone,
  } from "@/redux/slices/status";




export default function ZonePost({data}){

    const dispatch = useDispatch();


    const handleZone = (e) => {
        const selectZone = e.target.value;
        dispatch(getZone(selectZone))
        if(selectZone == "primary") {
            const privincesFromPrimary = data.filter(item => item.name === "primary")
            const uniqueprivincesFromPrimary = [... new Set(privincesFromPrimary.map(item => item.from_city.parent_city.name))]
            dispatch(getProvincesFrom(uniqueprivincesFromPrimary))
            
        } else {
            const countriesFrom = data.filter((item) => item.name === selectZone);
            const uniqueCountriesFrom = [
              ...new Set(countriesFrom.map((item) => item.from_city.country.name)),
            ];
            dispatch(getCountriesFrom(uniqueCountriesFrom));
          }
       
        }

      

    return(
       <form className=" w-full">
         <fieldset className=" border border-gray-300 rounded-md shadow-xl mb-5 p-4">
            <label className=" text-gray-700">نوع پست خود از نظر داخلی و بین المللی انتخاب کنید :</label>
            <select
                className=" mr-1 border border-black ml-10 rounded-lg"
                 onChange={handleZone}
                defaultValue={""}
            >
          <option value="" disabled hidden>
            انتخاب{" "}
          </option>
          <option value="primary">داخلی</option>
          <option value="foreign">بین المللی</option>
        </select>
        </fieldset>
       </form>

    )
}