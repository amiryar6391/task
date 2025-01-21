import { createSlice } from "@reduxjs/toolkit";



export const toSlice = createSlice({
    name : 'to',
    initialState :{ countriesTo:[] , provincesTo:[] , citiesTo:[] , message:[] },
    reducers :{
        getCountriesTo : ( state , action) => {

            state.countriesTo=action.payload
        },
        getProvincesTo : ( state , action) => {

            state.provincesTo = action.payload
        },
        getCitiesTo : ( state , action ) => {
            state.citiesTo=action.payload
        },
        getmessage:( state , {payload} ) => {
            state.message.push(payload)

        }
    }

})

export const { getCountriesTo , getProvincesTo , getCitiesTo , getmessage } = toSlice.actions

export default toSlice.reducer