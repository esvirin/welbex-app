import {appStateType, InferActionsTypes} from "./store";
import {ThunkAction} from "redux-thunk";
import itemsApi from "../api/itemsApi";


// -------------------- TYPING -------------------------
export type ItemType = {
    id: number
    date: string
    title: string
    quantity: number
    distance: number
}
type InitialStateType = {
    items: Array<ItemType>
    isFetching: boolean
    error: null | string
}

export type ItemDataField = {
    column: string
    condition: string
    meaning: string
}

// ------------------------ INITIAL STATE ----------------------
const initialState = {
    items: [] as Array<ItemType>,
    isFetching: false,
    error: null
}

// ------------------------ REDUCER ----------------------

function Data(state: InitialStateType = initialState, action: allActionTypes): InitialStateType {
    switch (action.type) {
        case 'dataReducer/SET_ITEMS':
            return {
                ...state,
                items: action.items
            }
        case 'dataReducer/SET_FETCHING':
            return {
                ...state,
                isFetching: action.fetching
            }
        case 'dataReducer/SET_ERROR':
            return {
                ...state,
                error: action.error
            }
        default:
            return {...state}
    }
}


// ---------------------- ACTIONS ------------------------------------
type allActionTypes = InferActionsTypes<typeof actions>
const actions = {
    setItems: (items: Array<ItemType>) => ({type: 'dataReducer/SET_ITEMS', items} as const),
    setFetching: (fetching: boolean) => ({type: 'dataReducer/SET_FETCHING', fetching} as const),
    setError: (error: string) => ({type: 'dataReducer/SET_ERROR', error} as const)
}


// -------------------   THUNK CREATORS   -------------------------
// all types of actions for typing reducer
type ThunkType = ThunkAction<void, appStateType, unknown, allActionTypes>
export const getItems = (): ThunkType => {
    return async (dispatch) => {
            dispatch(actions.setFetching(true))
        try {
            const newData = await itemsApi.getItems()
            dispatch(actions.setItems(newData))
            dispatch(actions.setFetching(false))
        } catch (e) {
            dispatch(actions.setError(e.message))
            dispatch(actions.setFetching(false))
        }
    }
}

export const sortItems = (itemDataField: ItemDataField): ThunkType => {
    return async (dispatch) => {
            dispatch(actions.setFetching(true))
        try {
            const newData = await itemsApi.sortItems(itemDataField)
            dispatch(actions.setItems(newData))
            dispatch(actions.setFetching(false))
        } catch (e) {
            dispatch(actions.setError(e.message))
            dispatch(actions.setFetching(false))
        }
    }
}


export default Data