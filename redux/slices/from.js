import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


export const fetchPostZone = createAsyncThunk('postzone/fetchPostZoneStatus' ,
    async ( arg , {rejectWithValue}) => {
        try{
            const res = await fetch('http://localhost:8000/postzone')
            const postzone = res.json()
            return postzone

        }catch(error){
            return rejectWithValue('دریافت با خطا مواجه شد!')
        }
    }
)



export const fromSlice = createSlice({
    name : 'from',
    initialState :{data:[] , provincesFromSlice : []  , citiesFromSlice : [] , countriesFromSlice : [] },
    reducers : {
        getCountriesFrom : ( state , action) => {
         
        state.countriesFromSlice = action.payload
            
        },
        getProvincesFrom : ( state , action) => {
            
            state.provincesFromSlice = action.payload
        },
        getCitiesFrom : ( state , action ) => {
            
            state.citiesFromSlice = action.payload
        }
    },
    extraReducers : (builder) => {
        builder.addCase ( fetchPostZone.fulfilled , (state , action) => {
            state.data = action.payload
            state.loading = false
        })
        builder.addCase ( fetchPostZone.pending , (state , action) => {
            state.loading = true
        })
        builder.addCase ( fetchPostZone.rejected , (state , action) => {
            state.errormessage = action.payload
            state.loading = false
        })


    }

})

export const { getCountriesFrom , getProvincesFrom , getCitiesFrom } = fromSlice.actions

export default fromSlice.reducer