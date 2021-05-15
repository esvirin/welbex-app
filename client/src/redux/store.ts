import {applyMiddleware, combineReducers, compose, createStore} from 'redux'
import dataReducer from './dataReducer'
import thunkMiddleWare from 'redux-thunk'

 const rootReducer = combineReducers({
    dataReducer
})
// state typing

export type appStateType = ReturnType<typeof rootReducer>

type PropertiesTypes<T> = T extends {[key:string]: infer U} ? U : never
export type  InferActionsTypes<T extends {[key:string]: (...args: any[]) => any}> = ReturnType<PropertiesTypes<T>>

// @ts-ignore for dev-dependence
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(thunkMiddleWare)
));


export default store
