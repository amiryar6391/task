import { createSlice } from "@reduxjs/toolkit";



export const toSlice = createSlice({
    name : 'to',
    initialState :{ countriesTo:[] , provincesTo:[] , citiesTo:[] },
    reducers :{
        getCountriesTo : ( state , action) => {

            state.countriesTo=action.payload
        },
        getProvincesTo : ( state , action) => {

            state.provincesTo = action.payload
        },
        getCitiesTo : ( state , action ) => {
            state.citiesTo=action.payload
        }
    }

})

export const { getCountriesTo , getProvincesTo , getCitiesTo } = toSlice.actions

export default toSlice.reducer