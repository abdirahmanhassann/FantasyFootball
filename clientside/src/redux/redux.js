import { configureStore, createSlice } from "@reduxjs/toolkit";
import storage from 'redux-persist/lib/storage';
import {
    persistStore,   persistReducer,
    FLUSH,          REHYDRATE,
    PAUSE,          PERSIST,
    PURGE,          REGISTER,
  } from 'redux-persist';
import { combineReducers } from "@reduxjs/toolkit";


const jwtslice=createSlice(
    {
        name:'jwt',
        initialState:false,
reducers:{
    jwt :(state,action)=>{
        return {...state, jwt: action.payload};
    },
   
  
}
    }
)

const refreshslice=createSlice(
    {
        name:'refresh',
        initialState:false,
reducers:{
    refresh :(state,action)=>{
        return {...state, refresh: action.payload};
    },
   
  
}
    }
)
const leagueslice=createSlice(
    {
        name:'league',
        initialState:false,
reducers:{
    league :(state,action)=>{
        return {...state, league: action.payload};
    },
   
  
}
    }
)

const persistConfig={
    key:"root",
    version:1,
    storage,
};
const reducer= combineReducers({
    jwtstatus:jwtslice.reducer,
    refreshstatus:refreshslice.reducer,
    leaguestatus:leagueslice.reducer

})
const persistedReducer=persistReducer(persistConfig,reducer);

export const {jwt}=jwtslice.actions;
export const {refresh}=refreshslice.actions;
export const {league}=leagueslice.actions;
const store=configureStore({
    reducer:{ 
               reducer:persistedReducer,
      }
      ,  middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
          },
        }),

}) 


export  let persistor= persistStore(store)

export default store;
