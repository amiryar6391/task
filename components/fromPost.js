  'use client';
  
  
  
  import {
  getCitiesFrom,
  getProvincesFrom,
} from "@/redux/slices/from";
import {
  getCityFrom,
  getCountryFrom,
  getProvinceFrom,
  getProvinceTo,
} from "@/redux/slices/status";
import { getCitiesTo, getCountriesTo, getProvincesTo } from "@/redux/slices/to";
import { useRef } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function FromPost({ data }) {
  const { countriesFromSlice , provincesFromSlice , citiesFromSlice } = useSelector(
    (store) => store.fromReducer
  );
  const { zone, countryFrom, provinceFrom } = useSelector(
    (store) => store.statusReducer
  );
  const dispatch = useDispatch();

  const formRef = useRef(null)
  const cityRef = useRef(null)
  const provinceRef = useRef(null)

  useEffect(() => {
    if (formRef.current) {
      formRef.current.reset();
      dispatch(getCountryFrom(null));
      dispatch(getProvinceFrom(null));
      dispatch(getCityFrom(null));
    }
  }, [zone]);



  const handleCountryFrom = (e) => {
    const selectCountry = e.target.value;
    dispatch(getCountryFrom(selectCountry));
    if( provinceRef.current && cityRef.current){
      provinceRef.current.value = ""
      cityRef.current.value = ""
    }
    
    const provincesFrom = data.filter(
      (item) =>
        item.name === zone && item.from_city.country.name === selectCountry
    );
    const uniqueProvinceFrom = [
      ...new Set(
        provincesFrom.map((item) =>
          item.from_city.parent_city?.name
            ? item.from_city.parent_city.name
            : item.from_city.name
        )
      ),
    ];
    dispatch(getProvincesFrom(uniqueProvinceFrom));
  };
 
  



  const handleProvinceFrom = (e) => {
    const selectProvince = e.target.value;
    dispatch(getProvinceFrom(selectProvince));
    if(cityRef.current){
      cityRef.current.value = ""
    }
    if(zone == "primary"){
      const citiesFromPrimary = data.filter(item => item.name === "primary" && item.from_city.parent_city.name === selectProvince)
      const uniqueCitiesFromPrimary = [... new Set(citiesFromPrimary.map(item => item.from_city.name))]
      dispatch(getCitiesFrom(uniqueCitiesFromPrimary))
    }else{
      const citiesFrom = data.filter((item) =>
        item.name === zone &&
        item.from_city.country.name === countryFrom &&
        item.from_city.parent_city?.name
          ? item.from_city.parent_city?.name === selectProvince
          : item.from_city.name === selectProvince
      );
      const uniqueCitiesFrom = [
        ...new Set(citiesFrom.map((item) => item.from_city.name)),
      ];
      dispatch(getCitiesFrom(uniqueCitiesFrom));
    }
    
    
  };




  const handleCityFrom = (e) => {
    const selectCity = e.target.value;
    dispatch(getCityFrom(selectCity));
    if(zone === "primary"){
      const provincesToPrimary = data.filter(item => item.name === zone &&  (item.from_city.parent_city?.name
        ? item.from_city.parent_city?.name == provinceFrom
        : item.from_city.name === provinceFrom) &&
      item.from_city.name === selectCity )
      const uniqueProvinceToPrimary = [... new Set(provincesToPrimary.map(item => item.to_city.parent_city?.name
        ? item.to_city.parent_city?.name
        : item.to_city.name ))]
        dispatch(getProvincesTo(uniqueProvinceToPrimary))
      }else{

        const countriesTo = data.filter(
          (item) =>
            item.name === zone &&
            item.from_city.country.name === countryFrom &&
            (item.from_city.parent_city?.name
              ? item.from_city.parent_city?.name === provinceFrom
              : item.from_city.name === provinceFrom) &&
            item.from_city.name === selectCity
        );
        const uniqueCountriesFrom = [
          ...new Set(countriesTo.map((item) => item.to_city.country.name)),
        ];
        dispatch(getCountriesTo(uniqueCountriesFrom));
      }
    
  };

 



  return (

    <form ref={formRef} onReset={() => console.log('form reset')} className=" w-full">
    <fieldset className=" border border-gray-300 rounded-md shadow-xl p-4">
      <legend className=" font-extrabold">از : </legend>
      <div>
      <label className=" text-gray-700">کشور : </label>
        {
          zone === "foreign" &&
          <select
          className=" mr-1 border border-black ml-10 rounded-lg w-40"
          onChange={handleCountryFrom}
          defaultValue={""}
        >
          <option value="" disabled hidden>
            انتخاب{" "}
          </option>
          {countriesFromSlice.map((item) => (
            <option value={item} key={item}>
              {item}
            </option>
          ))}
        </select> 
        }
        <label className=" text-gray-700"> استان : </label>
        <select
          className=" mr-1 border border-black ml-10 rounded-lg w-52"
          onChange={handleProvinceFrom}
          defaultValue={""}
          ref={provinceRef}
        >
          <option value="" disabled hidden>
            انتخاب{" "}
          </option>
          {provincesFromSlice.map((item) => (
            <option value={item} key={item}>
              {item}
            </option>
          ))}
        </select>
        <label className=" text-gray-700"> شهر : </label>
        <select
          className=" mr-1 border border-black ml-10 rounded-lg w-40"
          onChange={handleCityFrom}
          defaultValue={""}
          ref={cityRef}

        >
          <option value="" disabled hidden>
            انتخاب{" "}
          </option>
          {citiesFromSlice.map((item) => (
            <option value={item} key={item}>
              {item}
            </option>
          ))}
        </select>
       </div>
    </fieldset>
    </form>
  );
}
