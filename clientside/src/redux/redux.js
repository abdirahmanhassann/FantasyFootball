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

const persistConfig={
    key:"root",
    version:1,
    storage,
};
const reducer= combineReducers({
    jwtstatus:jwtslice.reducer,

})
const persistedReducer=persistReducer(persistConfig,reducer);

export const {jwt}=jwtslice.actions;

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
