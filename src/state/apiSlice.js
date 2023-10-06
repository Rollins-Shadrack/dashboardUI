import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

const baseQuery = fetchBaseQuery({
    baseUrl:'https://globeflightapi.onrender.com',
    credentials: 'include',
});

export  const apiSlice = createApi({
    baseQuery,
    tagTypes:['User', 'Transactions', 'Products', 'Kpis','Services', "Departments", "Users","ExchangeRates","Plans", "Events","Leave"],
    endpoints:(builder) =>({
        
    })
})