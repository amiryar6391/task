const { configureStore } = require("@reduxjs/toolkit");
import toReducer from './slices/to'
import fromReducer from './slices/from'
import statusReducer from './slices/status'






const store = configureStore({

    reducer : {
        
        toReducer,
        fromReducer,
        statusReducer
        
    }
})



export default store