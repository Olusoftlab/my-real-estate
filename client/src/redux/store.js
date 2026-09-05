import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storageModule from "redux-persist/lib/storage";
import userReducer from "./user/userSlice.js";


const storage=storageModule.default ?? storageModule

const rootReducer=combineReducers({user:userReducer});

const persistConfig={

   key:"root",
   version:1,
   storage

}

const persistedReducer=persistReducer(persistConfig, rootReducer)


export const store=configureStore({
   
     reducer:persistedReducer,
     middleware:(getDefaultMiddleware)=>getDefaultMiddleware({
        
         serializableCheck:false
         
     })

})

export const persistor=persistStore(store);