import {combineReducers, configureStore, createSlice} from "@reduxjs/toolkit"
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";


const tokenSlice = createSlice({
    name: "token",
    initialState: "",
    reducers:{
        setToken:(state, action)=>{
            return action.payload
        },
        clearToken:(state)=>{
            return  ""
        }
    }
})
export const { setToken, clearToken } = tokenSlice.actions

const userIdSlice = createSlice({
    name: "userId",
    initialState: "",
    reducers:{
        setUserId:(state, action)=>{
            return action.payload
        },
        clearUserId:(state)=>{
            return ""
        }
    }
})
export const { setUserId, clearUserId } = userIdSlice.actions

const userSlice = createSlice({
    name: "user",
    initialState: <{ [key: string]: string } | null>null,
    reducers:{
        setUserData:(state, action)=>{
            return action.payload
        },
        updateUserData:(state:{ [key: string]: string } | null, action)=>{
            let property:string = action.payload.property
            let value:any = action.payload.value
            if (state){
                state[property] = value
            }
        },
        clearUserData:(state)=>{
            return null
        }
    }
})
export const { setUserData, updateUserData, clearUserData } = userSlice.actions

const persistConfig = {
    key: "root",
    storage,
};

const rootReducer = combineReducers({ 
    token: tokenSlice.reducer,
    userId: userIdSlice.reducer,
    user: userSlice.reducer
  })

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
            },
        }),
})

export const persistor = persistStore(store);