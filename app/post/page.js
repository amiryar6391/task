"use client";

import { useEffect, useState } from "react"


export default function Post(){

    const [postZone , setPostZone] = useState([])

    const [zone , setZone] = useState("")
    const [country , setCountry] = useState("")
    const [countryTo , setCountryTo] = useState("")
    const [city , setCity] = useState("")
    const [province , setProvince] = useState("")
    const [countryFrom, setCountryFrom] = useState([])
    const [provinceFrom , setProvinceFrom] = useState([])
    const [cityFrom , setCityFrom] = useState([])
    const [countriesTo, setCountriesTo] = useState([])
    const [provinceTo, setProvinceTo] = useState([])
    const [cityTo , setCityTo] = useState([])



    const getPostZone = async() =>{
        const res= await fetch('http://localhost:8000/postzone')
        const data = await res.json()
        setPostZone(data)
    }

    useEffect(()=>{
        getPostZone()
    },[])

    //get zone

    const handleZone = (e) =>{
        const selectZone = e.target.value
         setZone(selectZone)
         const countriesInfo=postZone.filter(item => item.name === selectZone)
         const uniqueCountries = [... new Set(countriesInfo.map(item => item.from_city.country.name))] 
         setCountryFrom(uniqueCountries)
    }

///get country from

    const handleCountryFrom = (e) =>{
        const selectCountry = e.target.value
        setCountry(selectCountry)
        const provinvesInfo = postZone.filter(item => item.name === zone && item.from_city.country.name === selectCountry) 
        const uniqueProvince = [... new Set(provinvesInfo.map(item => item.from_city.parent_city?.name ? item.from_city.parent_city.name : item.from_city.name))]
        const uniqueCountry = [... new Set(provinvesInfo.map(item => item.to_city.country.name))]
        setProvinceFrom(uniqueProvince)
        setCountriesTo(uniqueCountry)
    }

// get province from
    const handleProvince = (e) =>{
        const selectProvince = e.target.value
        setProvince(selectProvince)
        const citesInfo = postZone.filter(item => item.name === zone && item.from_city.country.name === country && item.from_city.parent_city?.name ?  item.from_city.parent_city?.name == selectProvince : item.from_city.name == selectProvince )
        const uniqueCity = [... new Set(citesInfo.map(item => item.from_city.name))]
        setCityFrom(uniqueCity)
    }

    const handleCountryTo = (e) => {
        const selectCountryTo = e.target.value
        setCountryTo(selectCountryTo)
        const provinceInfoTo = postZone.filter(item => item.name === zone && item.to_city.country.name === selectCountryTo && item.from_city.country.name === country)
        const uniqueProvinceTo = [... new Set(provinceInfoTo.map(item => item.to_city.parent_city?.name ? item.to_city.parent_city?.name : item.to_city.name))]
        setProvinceTo(uniqueProvinceTo) 
    }




    const handleProvinceTo = (e) => {
        const selectProvinceTo = e.target.value
        const citiesInfoTo = postZone.filter(item => item.name === zone && item.to_city.country.name === countryTo && (item.to_city.parent_city?.name ? item.to_city.parent_city?.name === selectProvinceTo : item.to_city.name === selectProvinceTo)  && item.from_city.name === city)
       console.log(citiesInfoTo);
       
        const uniqueCityTo = [... new Set(citiesInfoTo.map(item => item.to_city.name))]
        setCityTo(uniqueCityTo)
    }
  

    

    return(
       <div className=" flex justify-center mt-28 p-5">
         <form className=" w-full">
            <fieldset className=" border border-gray-300 rounded-md shadow-xl p-4">
                <legend className=" font-extrabold">از : </legend>
                <div>
                <label  className=" text-gray-700">انتخاب نوع پست  : </label>
                <select className=" mr-1 border border-black ml-10 rounded-lg" onChange={handleZone} defaultValue={""}>
                    <option value="" disabled hidden>انتخاب </option>
                    <option value="primary">داخلی</option>
                    <option value="foreign">بین المللی</option>
                </select>
                <label className=" text-gray-700" >کشور : </label>
                <select className=" mr-1 border border-black ml-10 rounded-lg w-40" onChange={handleCountryFrom} defaultValue={""}>
                <option value="" disabled hidden>انتخاب </option>
                    {
                        countryFrom.map((item) => (
                            <option value={item} key={item}>{item}</option>
                        ))
                    }
                    
                </select>
                <label className=" text-gray-700" > استان : </label>
                <select className=" mr-1 border border-black ml-10 rounded-lg w-40" onChange={handleProvince} defaultValue={""}>
                <option value="" disabled hidden>انتخاب </option>
                {
                    provinceFrom.map((item) => (
                        <option value={item} key={item}>{item}</option>
                    ))

                }



                </select>
                <label className=" text-gray-700" > شهر : </label>
                <select className=" mr-1 border border-black ml-10 rounded-lg w-40" onChange={(e) => setCity(e.target.value)}  defaultValue={""}>
                <option value="" disabled hidden>انتخاب </option>
                {
                    cityFrom.map((item) => (
                        <option value={item} key={item}>{item}</option>
                    ))

                }



                </select>
                </div>
                <div className=" mt-3">
                
                </div>
            </fieldset>
            <fieldset className=" border border-gray-300 rounded-md shadow-xl p-4 mt-5">
                <legend className=" font-extrabold"> به : </legend>
                <div>
                    <label className=" text-gray-700" >کشور : </label>
                    <select className=" mr-1 ml-10 border border-black rounded-lg w-40" onChange={handleCountryTo} defaultValue={""}>
                    <option value="" disabled hidden>انتخاب </option>
                    {
                        countriesTo.map((item , index) => (
                            <option value={item} key={index}>{item}</option>
                        ))
                    }
                    </select>
                    <label className=" text-gray-700" >استان : </label>
                    <select className=" mr-1 ml-10 border border-black rounded-lg w-40" onChange={handleProvinceTo} defaultValue={""}>
                    <option value="" disabled hidden>انتخاب </option>
                    {
                        provinceTo.map((item , index) => (
                            <option value={item} key={index}>{item}</option>
                        ))
                    }
                    </select>
                    <label className=" text-gray-700" >شهر  : </label>
                    <select className=" mr-1 ml-10 border border-black rounded-lg w-40" defaultValue={""}>
                    <option value="" disabled hidden>انتخاب </option>
                    {
                        cityTo.map((item , index) => (
                            <option value={item} key={index}>{item}</option>
                        ))
                    }
                    </select>
                </div>
            </fieldset>
        </form>
       </div>
    )
}


