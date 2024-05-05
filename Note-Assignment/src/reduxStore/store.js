import { configureStore } from '@reduxjs/toolkit'
import openReducer from './slice'
import dataReducer from './dataSlice'

export const store = configureStore({
    reducer: {
        open: openReducer,
        data: dataReducer,  
    },
})