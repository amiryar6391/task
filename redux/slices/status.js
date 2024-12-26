

import { createSlice } from "@reduxjs/toolkit";



export const statusSlice = createSlice({
    name : 'status',
    initialState :{ zone : "" , countryFrom : "" , provinceFrom : "" , cityFrom : "" , countryTo : "" , provinceTo : ""},
    reducers :{
        getZone : ( state , action) => {
            
            state.zone = action.payload
        },
        getCountryFrom : ( state , action) => {

            state.countryFrom = action.payload
        },
        getProvinceFrom : ( state , action ) => {
            
            state.provinceFrom = action.payload
        },
        getCityFrom : ( state , action ) => {
            state.cityFrom = action.payload
        },
        getCountryTo : ( state , action ) => {
            state.countryTo = action.payload
        }
    }

})

export const { getZone , getCountryFrom , getProvinceFrom , getCityFrom , getCountryTo , getProvinceTo } = statusSlice.actions

export default statusSlice.reducer