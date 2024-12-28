import { getCountryTo} from "@/redux/slices/status";
import { getCitiesTo, getProvincesTo } from "@/redux/slices/to";
import { useEffect } from "react";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function ToPost({ data }) {
  const { zone, countryFrom, cityFrom, provinceFrom, countryTo } = useSelector(
    (store) => store.statusReducer
  );
  const { countriesTo, provincesTo, citiesTo } = useSelector(
    (store) => store.toReducer
  );
  const dispatch = useDispatch();

  const formRef = useRef(null)

  
 useEffect(() => {
    if (formRef.current) {
      formRef.current.reset();
      dispatch(getCountryTo(null));
    }
  }, [zone]);

  

  const handleCountryTo = (e) => {
    const selectCountryTo = e.target.value;
    dispatch(getCountryTo(selectCountryTo))
      const provinceTo = data.filter(
        (item) =>
          item.name === zone &&
          item.to_city.country.name === selectCountryTo &&
          item.from_city.country.name === countryFrom &&
          (item.from_city.parent_city?.name
            ? item.from_city.parent_city?.name == provinceFrom
            : item.from_city.name === provinceFrom) &&
          item.from_city.name === cityFrom
      );
      const uniqueProvinceTo = [
        ...new Set(
          provinceTo.map((item) =>
            item.to_city.parent_city?.name
              ? item.to_city.parent_city?.name
              : item.to_city.name
          )
        ),
      ];
      dispatch(getProvincesTo(uniqueProvinceTo));

    }
   
  

  const handleProvinceTo = (e) => {
    const selectProvinceTo = e.target.value;

    if(zone == "primary"){
      const citiesToPrimary = data.filter(item => item.name === zone && (item.to_city.parent_city?.name
        ? item.to_city.parent_city?.name === selectProvinceTo
        : item.to_city.name === selectProvinceTo) &&
      item.from_city.name === cityFrom)
      const uniqueCitiesToPrimary = [...new Set(citiesToPrimary.map(item => item.to_city.name))]
      dispatch(getCitiesTo(uniqueCitiesToPrimary))

    }else{
    
      const citiesTo = data.filter(
        (item) =>
          item.name === zone &&
          item.to_city.country.name === countryTo &&
          (item.to_city.parent_city?.name
            ? item.to_city.parent_city?.name === selectProvinceTo
            : item.to_city.name === selectProvinceTo) &&
          item.from_city.name === cityFrom
      );
      const uniqueCitiesTo = [
        ...new Set(citiesTo.map((item) => item.to_city.name)),
      ];
      dispatch(getCitiesTo(uniqueCitiesTo));
    }
    
  };

  return (
    <form className=" w-full" ref={formRef} onReset={() => console.log('form reset')}>
      <fieldset className=" border border-gray-300 rounded-md shadow-xl p-4 mt-5">
      <legend className=" font-extrabold"> به : </legend>
      <div>
      <label className=" text-gray-700">کشور : </label>
        {
          zone === "foreign" &&
          <select
            className=" mr-1 ml-10 border border-black rounded-lg w-40"
            onChange={handleCountryTo}
            defaultValue={""}
          >
            <option value="" disabled hidden>
              انتخاب{" "}
            </option>
            {countriesTo.map((item) => (
              <option value={item} key={item}>
                {item}
              </option>
            ))}
          </select>
        }
        <label className=" text-gray-700">استان : </label>
        <select
          className=" mr-1 ml-10 border border-black rounded-lg w-52"
          onChange={handleProvinceTo}
          defaultValue={""}
        >
          <option value="" disabled hidden>
            انتخاب{" "}
          </option>
          {provincesTo.map((item) => (
            <option value={item} key={item}>
              {item}
            </option>
          ))}
        </select>
        <label className=" text-gray-700">شهر : </label>
        <select
          className=" mr-1 ml-10 border border-black rounded-lg w-40"
          defaultValue={""}
        >
          <option value="" disabled hidden>
            انتخاب{" "}
          </option>
          {citiesTo.map((item) => (
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
